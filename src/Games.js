import React, {Component} from "react";
import './css/games.css';
import {
  Route,
  NavLink
} from "react-router-dom";
import Content from './components/Content';

class Games extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <ul className="gamesNav">
          {
            this.props.consoleList.map(item => {
                const path = "/games/" + item.id.toLowerCase();
                return(
                <li><NavLink exact to={path}>{item.name}</NavLink></li>
              )
            })
          }
        </ul>
        {
          this.props.consoleList.map(item => {
              const path = "/games/" + item.id.toLowerCase();
              return(
              <Route path={path} render={() => <Content consoleId={item.id.toLowerCase()} consoleList={this.props.consoleList}/>}/>
            )
          })
        }
        <Route exact path="/games">
          <p>Select a console to see a list of games! </p>
        </Route>
     </React.Fragment>
    );
  }
}

export default Games;
