import React from 'react';
import MovieCard from '@/components/movieCard';

import { TMDB_IMAGE_BASE_URL } from '@/config/constants';

interface MovieListProps {
  title: string;
  movieData: any[];
}

const MovieList: React.FC<MovieListProps> = ({ title, movieData }) => {
  return (
    <div className='px-2 py-6'>
      <h2 className='text-3xl mb-4'>{title}</h2>
      <div className='flex overflow-x-scroll '>
        <div className='flex '>
          {movieData &&
            movieData.map((item) => {
              return (
                <MovieCard
                  imageUrl={`${TMDB_IMAGE_BASE_URL + item.poster_path}`}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
