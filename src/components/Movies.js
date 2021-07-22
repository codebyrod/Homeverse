
 // imports
import React, { Component } from 'react'
import axios from "axios";

//url da Api
const MoviesApi = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=47f538f678247df472183587247835bc&language=en-US&page=1`
});

//criando class component
class Movies extends Component  {
    state = {
      movies: []
    };
  
    //invoca imediatamente após um component ser montado
    componentDidMount() {
      this.getMovies();
    }
  
    //função que pega os dados da api
    getMovies = async () => {
      const response = await MoviesApi.get();
      console.log("Filmes:", response.data.results)
  
      //função que usa spread pra juntar arrays, no caso estamos juntando os dados com o link inicial das imagens para retornar o link completo dos poster
      const posterFilmes = response.data.results.map((item) => {
        return {
          ...item,
          poster_path: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        };
      });
      
      //aqui estamos atualizando o estado, uma vez que o estado anterior não tinha o link dos poster completos e estamos atualizando para a função que fizemos ali em cima
      this.setState({
        movies: posterFilmes
      });
    };
  
    render() {
      return (
        <section>
          <div>
            <h2>Filmes</h2>
          </div>
        <div>
          {this.state.movies.map((item, id) => (
            <div key={id}>
              <h2>{item.title}</h2>
              <img src={item.poster_path} alt={item.title} />
              <p>{item.overview}</p>
            </div>
          ))}
        </div>
        </section>
      );
    }
  }

  export default Movies;