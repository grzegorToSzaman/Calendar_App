import React, {Component} from 'react';
import './App.scss';

class WelcomeWindow extends Component {
    render() {
        return(
            <div className='welcome'>
                <h1>HELLO!</h1>
                <h2>Are You ready for some maths?</h2>
                <button onClick={this.props.close}>YES!</button>
            </div>
        )
    }
}

class GameOver extends Component {
    refresh = () => {
        window.location.reload();
    };
    render() {
        return <div className='game-over'><h1>GAME OVER</h1><h1>HA!</h1><h1>HA!</h1><h1>HA!</h1><button onClick={this.refresh}>AGAIN!</button></div>
    }
}

class ProgressBar extends Component {
    render() {
        const spanStyle = {
            width: this.props.width + '%'
        };
        return(
            <div className='bar'>
                <span id="progress-bar" style={spanStyle}/>
            </div>
        )
    }
}

class Operation extends Component {
    render() {
        return (
            <div className='operation'>
                {this.props.a} + {this.props.b}
            </div>
        )
    }
}

class Answer extends Component {
    handleChange = (e) => {
        this.props.answer(e.target.value);
    };
    componentDidMount() {
        this.input.focus();
    }
    render() {
        return <input type="text" className='answer' name='answer' value={this.props.zeroInput} onChange={this.handleChange} ref={element => this.input = element}/>
    }
}

class Info extends Component {

    render() {
        return (
            <div className='score'>
                <h1>Score: {this.props.score}</h1>
                <h1>Level: {this.props.level}</h1>
            </div>
        )
    }
}
class Game extends Component {
    state = {
        score: 0,
        level: 1,
        answer: '',
        correctAnswer: '',
        width: 0,
        a: 0,
        b: 0
    };
    componentDidMount() {
        this.startInterval();
        this.randomNumber();
    }
    randomNumber = () => {
        let c = Math.round(Math.random()*(this.state.level * 10));
        let d = Math.round(Math.random()*(this.state.level * 10));
        this.setState({
            a: c,
            b: d
        });
        this.changeCorrectAnswer(c+d);
    };
    startInterval = () => {

        this.setState({
            width: 100,
        });
        this.intervalID = setInterval( () =>{
            if(this.state.width > 0) {
                this.setState({width: this.state.width - 1})
            } else {
                clearInterval(this.intervalID);
                this.checkAnswer();
            }
        },30)
    };
    changeAnswer = answer => {
        this.setState({answer: answer})
    };
    changeCorrectAnswer = result => {
        this.setState({correctAnswer: result})
    };
    checkAnswer = () => {
        if (this.state.answer == this.state.correctAnswer) {

            this.setState({
                score: this.state.score + 1,
                answer: ''
            });

            if (this.state.score === 0) {
                this.setState({level: 0});
            } else {
                this.setState({level: Math.ceil(this.state.score / 5)});
            }

            this.startInterval();
            this.randomNumber();


        } else {
            this.props.gameover()
        }
    };
    render() {
        return(
            <>
                <ProgressBar width={this.state.width}/>
                <Operation a={this.state.a} b={this.state.b}/>
                <Answer answer={this.changeAnswer} zeroInput={this.state.answer}/>
                <Info score={this.state.score} level={this.state.level}/>
            </>
        )
    }
}

class App extends Component {
    state = {
        welcomeWindow: true,
        countingWindow: false,
        appWindow: false,
        gameOver: false,

    };

    readyToGame = () => {
        this.setState({
            welcomeWindow: false,
            appWindow: true

        })
    };
    gameOver = () => {
        this.setState({
            welcomeWindow: false,
            appWindow: false,
            gameOver: true
        })
    };
    render() {
        return (
          <div className="App">
              {this.state.welcomeWindow && <WelcomeWindow close={this.readyToGame}/>}
              {this.state.appWindow && <Game gameover={this.gameOver}/>}
              {this.state.gameOver && <GameOver />}
          </div>
        )
    }
}

export default App;