import React from 'react';

interface MovieCardProps {
  imageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl }) => {
  return (
    <div className='w-48 pr-4'>
      <img src={imageUrl} alt='Movie Poster' className='' />
    </div>
  );
};

export default MovieCard;
