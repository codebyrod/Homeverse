import React, {Compo} from "react";
import axios from "axios";

const ShowsApi = axios.create({
  baseURL: `https://api.themoviedb.org/3/tv/popular?api_key=47f538f678247df472183587247835bc&language=en-US&page=1`
});

export default class Shows extends React.Component {
    state = {
      shows: []
    };
  
    componentDidMount() {
      this.getShows();
    }

  
    getShows = async () => {
      const response = await ShowsApi.get();
  
      const posterShows = response.data.results.map((item) => {
        return {
          ...item,
          poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        };
      });
  
      this.setState({
        shows: posterShows
      });
    };
  
    render() {
      return (
        <div>
          <h2>Shows</h2>
          {this.state.shows.map((item) => (
            <div>
              <h2>{item.name}</h2>
              <img src={item.poster_path} alt={item.name} />
              <p>{item.overview}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  