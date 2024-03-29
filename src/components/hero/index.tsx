import { useSelector } from 'react-redux';
import { IoPlay, IoInformationCircleOutline } from 'react-icons/io5';

export default function Hero({ mainHeaderMovieData }) {
  const mainHeaderMovieTrailerData = useSelector(
    (state: any) => state.movies.mainHeaderMovieTrailerData
  );

  return (
    <div>
      <div className='absolute top-[5%] md:top-0 pt-[20%] px-12 text-white   bg-gradient-to-r from-black w-screen aspect-video'>
        <div className='ml-2 md:ml-10'>
          <h1 className='text-3xl md:text-5xl mb-4 font-bold'>
            {mainHeaderMovieData?.title}
          </h1>
          <p className='hidden lg:block mb-6 text-lg w-2/6'>
            {mainHeaderMovieData?.overview}
          </p>
          <div className='flex gap-3 '>
            <button className='text-black flex items-center justify-center  gap-2  px-6 py-2 rounded-md border transition-all bg-[#FEFEFE] hover:bg-[#d8d8d8]'>
              <IoPlay className='text-xl md:text-2xl' />
              <span className='font-medium text-md'>Play</span>
            </button>
            <button className='flex gap-2 items-center justify-center px-6 py-2 rounded-md  text-white  transition-all bg-[#776A64] hover:bg-[#736b67]'>
              <IoInformationCircleOutline className='text-xl md:text-2xl' />
              <span className='font-medium'>Info</span>
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
