import React, { Component } from "react";

import Movies from "./services/Movies";
import styled from "styled-components";
import Series from "./services/Series";

class App extends Component {
  state = {
    filmes: [],
    series: []
  };

  componentDidMount() {
    this.getMovies();
    this.getSeries();
  }

  getMovies = async () => {
    const response = await Movies.get();

    const posterFilmes = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
      };
    });

    this.setState({
      filmes: posterFilmes
    });
  };

  getSeries = async () => {
    const response = await Series.get();
    console.log(response.data.results);

    const posterSeries = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
      };
    });

    this.setState({
      series: posterSeries
    });
  };

  render() {
    return (
      <div>
        <h1>HomeFlix</h1>
        <h2>Filmes</h2>
        {this.state.filmes.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <img src={item.poster_path} alt={item.title} />
            <p>{item.overview}</p>
          </div>
        ))}
        <h2>Series</h2>
        {this.state.series.map((item) => (
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

export default App;
