using Elasticsearch.Net;
using Nest;

namespace CampUS.Extensions
{
    public static class ElasticSearchExtension
    {

        public static void AddElastic(this IServiceCollection services, IConfiguration configuration)
        {

            var pool = new SingleNodeConnectionPool(new Uri(configuration.GetSection("ElasticConfiguration")["Uri"]!));
            var settings = new ConnectionSettings(pool);
            var client = new ElasticClient(settings);
            services.AddSingleton(client);
        }
    }
}