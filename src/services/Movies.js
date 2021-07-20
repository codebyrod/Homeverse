import axios from "axios";

const Movies = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=47f538f678247df472183587247835bc&language=en-US&page=1`
});

export default Movies;
