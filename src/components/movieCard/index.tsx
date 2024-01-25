import React from 'react';

interface MovieCardProps {
  imageUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl }) => {
  return (
    <div className='w-32 lg:w-40 m-auto'>
      <img src={imageUrl} alt='Movie Poster' className='' />
    </div>
  );
};

export default MovieCard;
