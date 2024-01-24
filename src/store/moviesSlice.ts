import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const moviesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      //   console.log('setmovies action', action);
      return { ...state, ...action.payload };
    },
    setMainHeaderMovieTrailer: (state, action) => {
      const movieTrailers = action.payload.filter(
        (movie) => movie.type === 'Trailer'
      );
      const updateData =
        movieTrailers.length > 0 ? movieTrailers[0] : movieTrailers;
      return { ...state, mainHeaderMovieTrailerData: updateData };
    },
    clearMovies: () => {
      return {};
    },
  },
});

export const { setMovies, clearMovies, setMainHeaderMovieTrailer } =
  moviesSlice.actions;

export default moviesSlice.reducer;
