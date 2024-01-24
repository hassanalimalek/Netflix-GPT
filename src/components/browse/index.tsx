import { useSelector } from 'react-redux';
import useFetch from '../../services/useFetch';
import { setMainHeaderMovieTrailer, setMovies } from '../../store/moviesSlice';
import { Header } from '../header';
import Hero from '../hero';
import MovieList from '../movieList';

export const Browse = () => {
  const nowPlayingMovies = useSelector(
    (state: any) => state.movies.nowPlayingMovies
  );
  const popularMovies = useSelector((state: any) => state.movies.popularMovies);
  const topRatedMovies = useSelector(
    (state: any) => state.movies.topRatedMovies
  );
  const upcomingMovies = useSelector(
    (state: any) => state.movies.upcomingMovies
  );

  const mainHeaderMovie = nowPlayingMovies?.[0];
  const headerMovieId = mainHeaderMovie?.id;
  console.log('mainHeaderMovie -->', mainHeaderMovie);

  // Fetching main header movie trailer
  useFetch(
    `https://api.themoviedb.org/3/movie/${
      headerMovieId || 0
    }/videos?language=en-US`,
    setMainHeaderMovieTrailer,
    null,
    'results'
  );
  // Fetching upcoming movies
  useFetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    setMovies,
    'upcomingMovies',
    'results'
  );
  // Fetching now playing movies
  useFetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    setMovies,
    'nowPlayingMovies',
    'results'
  );
  // Fetching popular movies
  useFetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    setMovies,
    'popularMovies',
    'results'
  );
  // Fetching top rated movies
  useFetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    setMovies,
    'topRatedMovies',
    'results'
  );

  return (
    <div>
      <Header />
      <div>
        <Hero mainHeaderMovieData={mainHeaderMovie} />
      </div>
      <div className=' bg-gray-950'>
        <div className='-mt-52 relative z-20 pl-4 text-white '>
          <MovieList title='Upcoming Movies' movieData={upcomingMovies} />
          <MovieList title='Now Playing' movieData={nowPlayingMovies} />
          <MovieList title='Popular Movies' movieData={popularMovies} />
          <MovieList title='Top Rated' movieData={topRatedMovies} />
        </div>
      </div>
    </div>
  );
};
