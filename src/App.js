import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Topo from './components/Topo.js';
import Home from './components/Home.js';
import Catalogo from './components/Catalogo.js';
import NotFound from './components/NotFound.js';
import Rodape from './components/Rodape.js';
import Frontend from './components/Frontend.js';
import Programacao from './components/Programacao.js';
import Design from './components/Design.js';
import Livro from './components/Livro.js';

import axios from "axios";

//import "./../src/index.css"; teste

class App extends Component {
  state = {
    livros: [],
  };
  async componentDidMount() {
    try {
      const { data: livros } = await axios.get("/api/todosOsLivros.json");
      this.setState({ livros });
    } catch (error) {
      console.log(error);
      document
        .querySelectorAll(".principal")[0]
        .insertAdjacentHTML(
          "beforeend",
          "<p class='erro'>Mensagem de erro</p>"
        );
    }
  }
  render() {
    return (
      <Router>
        <Topo />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home livros={this.state.livros} />}
          />
          <Route
            exact
            path="/frontend"
            render={() => <Frontend livros={this.state.livros} />}
          />
          <Route
            exact
            path="/programacao"
            render={() => <Programacao livros={this.state.livros} />}
          />
          <Route
            exact
            path="/design"
            render={() => <Design livros={this.state.livros} />}
          />
          <Route
            exact
            path="/catalogo"
            render={() => <Catalogo livros={this.state.livros} />}
          />
          <Route
            path="/livro/:livroSlug"
            render={(props) => {
              const livro = this.state.livros.find(
                (livro) => livro.slug === props.match.params.livroSlug
              );
              if (livro) return <Livro livro={livro} />;
              else return <NotFound />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
        <Rodape />
      </Router>
    );
  }
}

export default App;
