import axios from "axios";

const Series = axios.create({
  baseURL: `https://api.themoviedb.org/3/tv/popular?api_key=47f538f678247df472183587247835bc&language=en-US&page=1`
});

export default Series;
