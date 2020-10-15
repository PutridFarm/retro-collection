import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import logo from './logo.svg';
import * as serviceWorker from './serviceWorker';
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Games from "./Games";
import Home from "./Home";
import About from "./About";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {consoleList: []};
    this.fetchConsoleList = this.fetchConsoleList.bind(this);
  }

  componentDidMount(){
    this.fetchConsoleList();
  }

  fetchConsoleList() {
    fetch('/consoles')
     .then(response => {
       return response.json()
     })
     .then(data => {
       this.setState({ consoleList: data.consoles});
     })
     .catch(error=>{
       console.log(error)
     })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Retro-Collection</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <ul className="nav">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/games">Games</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/games" render={() => <Games consoleList={this.state.consoleList}/>}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
