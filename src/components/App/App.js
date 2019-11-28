import React, {Component} from 'react';
import './App.scss';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Flash from 'react-reveal/Flash';
import Pulse from 'react-reveal/Pulse';
import Jump from 'react-reveal/Jump';
import Rotate from 'react-reveal/Rotate';
import Reveal from 'react-reveal/Reveal';


class WelcomeWindow extends Component {
    keyDown = e => {
        e.key === 'Enter' && this.props.close()
    };
    componentDidMount() {
        document.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    render() {
        return(
            <div className='welcome'>
                <Zoom top delay={0}><h1>HELLO!</h1></Zoom>
                <Zoom delay={300} top><h2>Are You ready for some math?</h2></Zoom>
                <Zoom delay={600} top><button onClick={this.props.close}>YES!</button></Zoom>
            </div>
        )
    }
}

class GameOver extends Component {
    keyDown = e => {
        e.key === 'Enter' && this.refresh();
    };
    componentDidMount() {
        document.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown)
    }
    refresh = () => {
        this.props.ready();
    };
    render() {
        return (
            <div className='game-over'>
                <Flash>
                    <h1>GAME OVER</h1>
                </Flash>
                <Jump delay={1000}>
                    <h1>Your score: {this.props.score}</h1>
                </Jump>
                <Pulse delay={2000} count={3}>
                    <button onClick={this.refresh}>AGAIN!</button>
                </Pulse>
            </div>
        )
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
    handleEnter = e => {
        e.key === 'Enter' && this.props.enter();
    };
    componentDidMount() {
        this.input.focus();
    }
    render() {
        return <input
            type="number"
            autoComplete='off'
            className='answer'
            name='answer'
            value={this.props.zeroInput}
            onChange={this.handleChange}
            ref={element => this.input = element}
            onKeyDown={this.handleEnter}
        />
    }
}

class Info extends Component {

    render() {
        return (
             <div className='score'>
                 <Fade right duration={1500}>
                 <h1>Score: {this.props.score}</h1>
                 <h1>Level: {this.props.level}</h1>
                 </Fade>
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

            clearInterval(this.intervalID);

            this.setState({
                score: this.state.score + 1,
                answer: ''
            });

            if (this.state.score === 0) {
                this.setState({level: 1});
            } else {
                this.setState({level: Math.ceil(this.state.score / 5)});
            }

            this.startInterval();
            this.randomNumber();


        } else {
            this.props.score(this.state.score);
            this.props.gameover()
        }
    };
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return(
            <>
                <ProgressBar width={this.state.width}/>
                <Operation a={this.state.a} b={this.state.b}/>
                <Answer answer={this.changeAnswer} zeroInput={this.state.answer} enter={this.checkAnswer}/>
                <Info score={this.state.score} level={this.state.level}/>
            </>
        )
    }
}

class App extends Component {
    state = {
        score: 0,
        welcomeWindow: true,
        countingWindow: false,
        appWindow: false,
        gameOver: false,

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
    render() {
        return (
          <div className="App">
              {this.state.welcomeWindow && <WelcomeWindow close={this.readyToGame}/>}
              {this.state.appWindow && <Game gameover={this.gameOver} score={this.setScore}/>}
              {this.state.gameOver && <GameOver score={this.state.score} ready={this.readyToGame}/>}
          </div>
        )
    }
}

export default App;