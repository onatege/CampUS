namespace CampUS.Core.Abstracts
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
        void Commit();
    }
}
