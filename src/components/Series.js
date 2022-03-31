import React from "react";
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
background-color: black;
display: flex;
justify-content: space-between;
padding: 1rem;
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
  margin: 0.8rem;
  border-right: 3px solid black;
  border-left: 3px solid black;
  background-color: #080808;
`

const CardTitle = styled.h2`
  height: 5vw;
  text-align: center;
`

const CardImg = styled.img`
  width: 80%;
`

const CardTxt = styled.p`
  width: 20vw;
  padding: 1rem;
`

const ShowsApi = axios.create({
  baseURL: `https://api.themoviedb.org/3/tv/popular?api_key=47f538f678247df472183587247835bc&language=en-US&page=1`
});

export default class Shows extends React.Component {
    state = {
      shows: [],
      filterItem: []
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
        shows: posterShows,
        filterItem: posterShows
      });
    };


    handleChange = (event) =>{
      const {shows} = this.state
      if(event.target.value === ""){
        this.setState({
          filterItem: shows
        })
        return
      }

      const filterItemConvert = shows.filter((item) =>{
        if(item.name.toLowerCase().includes(event.target.value.toLowerCase())){
          return true
        }
        return false
      })

      this.setState({
        filterItem: filterItemConvert
      })
    }
    

    render() {
      return (
        <section>
        <GlobalStyle/>
          <Header>
          <h2>Shows</h2>
          <Ipt 
          placeholder="Busca"
          onChange={this.handleChange} />
          </Header>
          <Container>
          {this.state.filterItem.map((item) => (
            <Card>
              <CardTitle>{item.name}</CardTitle>
              <CardImg src={item.poster_path} alt={item.name} />
              <CardTxt>{item.overview.substring(0, 150)}</CardTxt>
            </Card>
          ))}
          </Container>
        </section>
      );
    }
  }
  