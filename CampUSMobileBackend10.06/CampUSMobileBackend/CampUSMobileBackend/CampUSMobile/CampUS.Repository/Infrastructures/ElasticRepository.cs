using System.Collections.Immutable;
using CampUS.Core.Abstracts;
using CampUS.Core.Interfaces;
using CampUS.Core.Models;
using Nest;

namespace CampUS.Repository.Infrastructures
{
    public class ElasticRepository : IElasticRepository
    {

        private readonly ElasticClient _elasticClient;

        private const string indexName = "posts";
        public ElasticRepository(ElasticClient elasticClient)
        {
            this._elasticClient = elasticClient;
        }
        public async Task<Post> SaveAsync(Post entity)
        {
            var result = await _elasticClient.IndexAsync(entity, x => x.Index("posts"));
            if (!result.IsValid) return default(Post);
            entity.Id = Convert.ToInt16(result.Id);
            return entity;
        }

        public async Task<ImmutableList<Post>> GetAllAsync()
        {
            var result = await _elasticClient.SearchAsync<Post>(s => s.Index(indexName).Query(q => q.MatchAll()));
            foreach (var hit in result.Hits) hit.Source.Id = Convert.ToInt16(hit.Id);
            return result.Documents.ToImmutableList();
        }

        public async Task<Post?> GetByIdAsync(string id)
        {
            var response = await _elasticClient.GetAsync<Post>(id, x => x.Index(indexName));
            if (!response.IsValid)
            {
                return null;
            }
            response.Source.Id = Convert.ToInt16(response.Id);
            return response.Source;
        }

        public async Task<ImmutableList<Post>> SearchByKeywordAsync(string keyword)
        {
            var result = await _elasticClient.SearchAsync<Post>(s => s
                .Index(indexName)
                .Query(q => q
                    .QueryString(qs => qs
                        .Fields(f => f
                            .Field(p => p.Content))
                        .Query(keyword)
                    )
                )
            );

            if (!result.IsValid)
            {
                // Hata durumunda boş bir liste dönebilirsiniz veya farklı bir hata yönetimi yapabilirsiniz.
                return ImmutableList<Post>.Empty;
            }

            foreach (var hit in result.Hits)
            {
                hit.Source.Id = Convert.ToInt16(hit.Id);
            }

            return result.Documents.ToImmutableList();
        }



    }
}