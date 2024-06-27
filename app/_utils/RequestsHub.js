const { default: axiosClient } = require("./axiosClient");

const getHomePageMovies = (cancelToken) => axiosClient.get("/trending/movie/day?language=en-US&page=1", { cancelToken });
const getMobileHomePageMovies = (cancelToken, page) => axiosClient.get(`/trending/movie/day?language=en-US&page=${page}`, { cancelToken });
const getBrowseResult = (cancelToken, inp, page) => axiosClient.get(`/search/movie?query=${inp}&include_adult=false&language=en-US&page=${page}`, { cancelToken });
const goToApproveSessinId = () => axiosClient.get("/authentication/token/new");
const checkRatedMovies = (page, sessionId) => axiosClient.get(`/account/21012830/rated/movies?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc`);
const postNewRate = (movieId, sessionId, inp) =>
  axiosClient.post(
    `/movie/${movieId}/rating`,
    {
      value: inp,
    },
    {
      params: { session_id: sessionId },
    }
  );
const getListedMovies = (type, sessionId, page) =>
  axiosClient.get(`/account/21012830/${type}/movies`, {
    params: {
      api_key: "2c8cbe1d27ca2b0b671b01827a6fabf6",
      session_id: sessionId,
      page,
    },
  });
const postFavMovie = (movieId, isFav, sessionId) =>
  axiosClient.post(
    `/account/21012830/favorite`,
    {
      media_type: "movie",
      media_id: movieId,
      favorite: !isFav,
    },
    {
      params: {
        api_key: `2c8cbe1d27ca2b0b671b01827a6fabf6`,
        session_id: sessionId,
      },
    }
  );
const postWatchMovie = (movieId, isWatch, sessionId) =>
  axiosClient.post(
    `/account/21012830/watchlist`,
    {
      media_type: "movie",
      media_id: movieId,
      watchlist: !isWatch,
    },
    {
      params: {
        api_key: `2c8cbe1d27ca2b0b671b01827a6fabf6`,
        session_id: sessionId,
      },
    }
  );
const getMovieCredits = (movieId) => axiosClient.get(`/movie/${movieId}/credits?language=en-US`);
const getMovieContent = (cancelToken, movieId) => axiosClient.get(`/movie/${movieId}?language=en-US`, { cancelToken });
const getMovieReco = (cancelToken, movieId, page) => axiosClient.get(`/movie/${movieId}/recommendations?language=en-US&page=${page}`, { cancelToken });
const getMovieTrailr = (cancelToken, movieId) => axiosClient.get(`/movie/${movieId}/videos?api_key=2c8cbe1d27ca2b0b671b01827a6fabf6`, { cancelToken });
export default {
  getHomePageMovies,
  getMobileHomePageMovies,
  getBrowseResult,
  goToApproveSessinId,
  checkRatedMovies,
  postNewRate,
  getListedMovies,
  postFavMovie,
  postWatchMovie,
  getMovieCredits,
  getMovieContent,
  getMovieReco,
  getMovieTrailr,
};
