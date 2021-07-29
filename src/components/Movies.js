
 // imports
import React, { Component } from 'react'
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  list-style: none;
  font-family: 'Baloo Chettan 2', cursive;
  color: #ffff;
}
`
const Header = styled.div`
width: 97vw;
display: flex;
justify-content: space-between;
padding: 1rem 1rem 1rem 3rem;
`
const Title = styled.h1`

`

const Ipt = styled.input`
width: 30vw;
height: 2.2vw;
color: black;
`

const Container = styled.div`
background-color: #101010;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`

const Card = styled.div`
  width: 22vw;
  height: 40vw; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 3px solid black;
  border-left: 3px solid black;
  background-color: #080808;
  margin: 0.8rem; 
`

const CardTitle = styled.h2`
  height: 4vw;
  text-align: center;
`

const CardImg = styled.img`
  width: 80%;
`

const CardTxt = styled.p`
  width: 20vw;
  padding: 1rem;
`

//url da Api
const MoviesApi = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=47f538f678247df472183587247835bc&language=en-US&page=1`
});

//criando class component
class Movies extends Component  {
    state = {
      movies: [],
      filterItem: []
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
        movies: posterFilmes,
        filterItem: posterFilmes
      });
    };

    handleChange = (event) => {

      const { movies } = this.state
      if(event.target.value === ""){
        this.setState({
          filterItem: movies
        })
        return;
      }

      const filterItemConvert = movies.filter((item) => {
        if(item.title.toLowerCase().includes(event.target.value.toLowerCase())){
        return true;
        }
        return false;
      })
      
      this.setState({
        filterItem: filterItemConvert
      })
    }
  
    render() {
      return (
        
          <section>
          <GlobalStyle />
          <Header>
            <Title>Filmes</Title>
            <Ipt 
            onChange={this.handleChange} 
            type="text" 
            placeholder="Busca" 
             />
          </Header>
        <Container>
          {this.state.filterItem.map((item, id) => (
            <Card key={id}>
              <CardTitle>{item.title}</CardTitle>
              <CardImg src={item.poster_path} alt={item.title} />
              <CardTxt>{item.overview.substring(0, 150)}</CardTxt>
            </Card>
          ))}
        </Container>
        </section>

      );
    }
  }

  export default Movies;