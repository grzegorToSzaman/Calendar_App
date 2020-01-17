import React, { Component } from 'react';
import WelcomeWindow from "./WelcomeWindow";
import Game from "./Game";
import GameOver from "./GameOver";

class App extends Component {
    state = {
        score: 0,
        welcomeWindow: true,
        countingWindow: false,
        appWindow: false,
        gameOver: false,
        userName: 'GallAnonim',
        bestScores: [],

    };

    readyToGame = () => {
        this.setState({
            welcomeWindow: false,
            appWindow: true,
            gameOver: false

        })
    };
    gameOver = () => {
        this.setState({
            welcomeWindow: false,
            appWindow: false,
            gameOver: true
        })
    };
    setScore = (score) => {
        this.setState({score: score})
    };
    changeName = name => {
        this.setState({userName: name})
    };
    changeBestScores = (scores) => {
        this.setState({bestScores: scores})
    };
    render() {
        return (
          <div className="App">
              {this.state.welcomeWindow && <WelcomeWindow close={this.readyToGame} userName={this.changeName}/>}
              {this.state.appWindow && <Game gameover={this.gameOver} score={this.setScore} userName={this.state.userName} highScores={this.changeBestScores}/>}
              {this.state.gameOver && <GameOver score={this.state.score} ready={this.readyToGame} bestScores={this.state.bestScores}/>}
          </div>
        )
    }
}

export default App;
