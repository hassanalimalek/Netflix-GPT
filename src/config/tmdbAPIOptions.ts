export const getTmdbAPIOptions = (method: string) => {
  return {
    method: 'GET' || method,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API}`,
    },
  };
};
