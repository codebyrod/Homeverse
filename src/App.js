import React, { Component } from "react";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Home from "./components/Home"
import styled, {createGlobalStyle} from "styled-components";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Header = styled.div`
background-color: black;
`

const Container = styled.div`
display: flex;
`

const Title = styled.h1`
width: 30vw;
padding: 1rem;
`

const BoxList = styled.nav`
width: 60vw;
display: flex;
justify-content: flex-end;
`

const List = styled.ul`
width: 15vw;
display: flex;
height: 5vw;
justify-content: space-between;
align-items: center;
`

const Item = styled.li`
font-size: 1.5rem;

`



class App extends Component{
  render(){
    return(
    <Router>
      <Header>
        <Container>
        <Title>
          <Link to="/">Homeverse </Link></Title>
        <BoxList>
          <List>
            <Item>
              <Link to="/movies">Filmes</Link>
            </Item>
            <Item>
              <Link to="/series">Séries</Link>
            </Item>
          </List>
        </BoxList>
        </Container>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Header>
    </Router>
    )
  }
}

export default App;

