import React, { Component, useEffect , useState} from "react";
import {GameForm} from './GameForm';
import {GameFormEdit} from './GameFormEdit';
import ListView from './ListView';

class Content extends Component{

  constructor(props) {
    super(props);
    this.state = {currentItem: {}, currentPrice: 0.0, consoleList:props.consoleList};
    this.updateContent = this.updateContent.bind(this);
  }

  updateContent (item) {
    this.setState({currentItem: item});
    this.fetchPrice(item);
    console.log("item was clicked: " + item.title);
  }

 //"/games/" + item.consoleId.toLowerCase() + "/current-price?game=" + item.title
  fetchPrice = (item) => {
   fetch('/games/snes/current-price?game=' + item.title)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({ currentPrice: data.price});
    })
    .catch(error=>{
      console.log(error)
    })
  }

  render(){
    return (
      <React.Fragment>
        <div className="menu">
          <GameMenu consoleId={this.props.consoleId} onClickEvent={this.updateContent} consoleList={this.state.consoleList}/>
        </div>
        <div className="games-content">
          <h1>
            {this.state.currentItem.title}
          </h1>
          <div>
            {this.state.currentItem.text}
            <GameFormEdit gameContext={this.state.currentItem} consoleList={this.state.consoleList}/>
            {this.state.currentPrice}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function CurrentPrice(props)
{
  const [currentPrice, setCurrentPrice] = useState([]);
  const gameTitle = props.game.title

  console.log("CurrentPrice gameTitle = " + gameTitle);
  console.log("CurrentPrice consoleId = " + props.game.consoleId);


  return (<div></div>);
}

function GameMenu (props){
  const [gamesList, setGames] = useState([]);
  const consoleId = (props.consoleId);
  useEffect(() => {
    fetch("/games/" + consoleId).then(response =>
      response.json().then(data => {
        setGames(data.games);
      })
    )
    .catch(error=>{
      console.log(error)
    });
  }, []);

  console.log("ConsoleId = " + consoleId);
  console.log(gamesList);

  return (
    <ListView
        header="Collection"
        items= {gamesList}
        button=<GameForm consoleContext={consoleId} consoleList={props.consoleList}/>
        onClickEvent={props.onClickEvent}
    />
  );
}

export default Content;
