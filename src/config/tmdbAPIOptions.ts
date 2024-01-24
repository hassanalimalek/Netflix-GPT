export const getTmdbAPIOptions = (method: string) => {
  return {
    method: 'GET' || method,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGZkYzg3M2ZhZmI3NmFkNDg1ZjFkMDQzYjM4YzFmZCIsInN1YiI6IjY1YWZkZTkyYmQ1ODhiMDEwYjVlMmQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GkhhB-envshEG2Qzr-4UyUZlAJrHGskLdBK1aRrYzoM',
    },
  };
};
