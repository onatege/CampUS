namespace CampUS.Caching.Abstracts
{
	public interface ICacheService
	{
		Task<byte[]> GetAsync(string key);
		Task<T> GetAsync<T>(string key);
		Task SetAsync(string key, object value, TimeSpan slidingExpiration, TimeSpan absoluteExpiration);
		Task RefreshAsync(string key);
        Task<bool> AnyAsync(string key);
		Task RemoveAsync(string key);
	}
}
