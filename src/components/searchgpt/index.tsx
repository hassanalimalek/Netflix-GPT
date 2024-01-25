import { getTmdbAPIOptions } from '@/config/tmdbAPIOptions';
import { chatCompletion } from '@/services/openApi';
import { useRef, useState } from 'react';
import ListingGrid from '../listingGrid';
import MovieCard from '../movieCard';
import { TMDB_IMAGE_BASE_URL } from '@/config/constants';

const fetchTmdbMovieSuggestion = async (query: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    getTmdbAPIOptions('GET')
  );
  const data = await response.json();
  return data;
};

const SearchGPT = () => {
  const searchQueryRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [moviesData, setMoviesData] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = searchQueryRef.current?.value;
    if (searchQuery) {
      try {
        setLoading(true);
        setErrorMessage(null);
        // Making a call to openAI API
        const result = await chatCompletion(searchQuery);

        if (result != 'null') {
          const moviesArr = result?.split(',');
          // Making a call to TMDB API
          const moviesResponsePromises = moviesArr?.map((item) => {
            return fetchTmdbMovieSuggestion(item);
          });
          // Resolving all promises
          if (moviesResponsePromises) {
            const finalResult = await Promise.all(moviesResponsePromises);
            const filteredResult = finalResult.map((item) => {
              return item.results[0];
            });
            setMoviesData(filteredResult);
          }
        } else {
          throw new Error('Sorry unable to suggest on your query');
        }
      } catch (e: any) {
        setErrorMessage(e?.message);
        setMoviesData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='mt-8'>
      <div className='bg-gray-950  p-4  m-auto  mx-4   md:m-auto  md:w-3/6 mb-8 md:mb-8 text-white rounded-md'>
        {/* Search  */}
        <form onSubmit={handleSearch} className='m-auto  flex justify-center'>
          <input
            type='text'
            ref={searchQueryRef}
            placeholder='Search for GPT Suggestions'
            className=' rounded-md py-2 px-4 w-[70%] mr-4 text-black'
          />
          <button
            type='submit'
            className='bg-red-500 text-white rounded-md py-2 px-4'
          >
            Search
          </button>
        </form>
      </div>
      <div className='bg-black '>
        <div
          className={`${
            loading || moviesData.length ? 'p-8 ' : 'p-0'
          } w-[90%] max-w-8xl m-auto `}
        >
          {errorMessage ? (
            <p className='text-red-500 text-xl text-center p-8 '>
              {errorMessage}
            </p>
          ) : (
            <ListingGrid
              loading={loading}
              items={moviesData}
              loadingSekeletonItems={12}
              renderItem={(item) => {
                return (
                  <MovieCard
                    imageUrl={`${TMDB_IMAGE_BASE_URL + item.poster_path}`}
                  />
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchGPT;
