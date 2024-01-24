import { useSelector } from 'react-redux';
import useFetch from '../../services/useFetch';
import { setMainHeaderMovieTrailer, setMovies } from '../../store/moviesSlice';
import { Header } from '../header';
import Hero from '../hero';
import MovieList from '../movieList';

export const Browse = () => {
  const movies = useSelector((state: any) => state.movies);
  const nowPlayingMovies = useSelector(
    (state: any) => state.movies.nowPlayingMovies // Update state type
  );
  console.log('nowPlayingMovies -->,', nowPlayingMovies);

  //   console.log('movies -->', movies);
  //   console.log(' mainHeaderMovieTrailerData -->', mainHeaderMovieTrailerData);
  //   console.log('nowPlayingMovies -->', nowPlayingMovies?.[0]?.id);
  const headerMovieId = nowPlayingMovies?.[0]?.id; //   console.log('headerMovieId -->', headerMovieId);
  const mainHeaderMovie = nowPlayingMovies?.[0];
  console.log('mainHeaderMovie -->', mainHeaderMovie);

  useFetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    setMovies,
    'nowPlayingMovies',
    'results'
  );
  useFetch(
    `https://api.themoviedb.org/3/movie/${headerMovieId}/videos?language=en-US`,
    setMainHeaderMovieTrailer,
    null,
    'results'
  );

  return (
    <div>
      <Header />
      <div>
        <Hero mainHeaderMovieData={mainHeaderMovie} />
      </div>
      <div className=' bg-black'>
        <div className='-mt-52 relative z-20 pl-4 text-white '>
          <MovieList title='Now Playing' movieData={nowPlayingMovies} />
          <MovieList title='Trending Movies' movieData={nowPlayingMovies} />
          <MovieList title='Now Playing' movieData={nowPlayingMovies} />
        </div>
      </div>
    </div>
  );
};
