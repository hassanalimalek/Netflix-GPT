import React from 'react';
import { useSelector } from 'react-redux';

import { FaPlay } from 'react-icons/fa';
import { IoPlay, IoInformationCircleOutline } from 'react-icons/io5';

export default function Hero({ mainHeaderMovieData }) {
  const mainHeaderMovieTrailerData = useSelector(
    (state: any) => state.movies.mainHeaderMovieTrailerData
  );
  console.log('mainHeaderMovieData -->', mainHeaderMovieData);
  console.log('mainHeaderMovieTrailerData -->', mainHeaderMovieTrailerData);
  if (!mainHeaderMovieData) return null;
  return (
    <div>
      <div className='absolute top-[0%] pt-[20%] px-12 text-white   bg-gradient-to-r from-black w-screen aspect-video'>
        <div className='ml-10'>
          <h1 className='text-5xl mb-4 font-bold'>
            {mainHeaderMovieData?.title}
          </h1>
          <p className='mb-6 w-2/6'>{mainHeaderMovieData?.overview}</p>
          <div className='flex gap-3 '>
            <button className='text-black flex gap-2 justify-center px-6 py-2 rounded-md border bg-[#FEFEFE]'>
              <IoPlay className='text-2xl' />
              <span className='font-medium'>Play</span>
            </button>
            <button className='flex gap-2 justify-center px-6 py-2 rounded-md  text-white bg-[#776A64]'>
              <IoInformationCircleOutline className='text-2xl' />
              <span className='font-medium'>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div className=''>
        <iframe
          className='w-screen aspect-video  '
          src={`https://www.youtube.com/embed/${mainHeaderMovieTrailerData?.key}?autoplay=1&controls=0&mute=1&loop=1`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          //   allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
