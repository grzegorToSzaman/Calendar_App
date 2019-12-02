import React, {Component} from 'react';
import './App.scss';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Flash from 'react-reveal/Flash';
import Pulse from 'react-reveal/Pulse';
import Jump from 'react-reveal/Jump';



class WelcomeWindow extends Component {
    keyDown = e => {
        e.key === 'Enter' && this.props.close()
    };
    componentDidMount() {
        this.input.focus();
        document.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }
    changeName = (e) => {
        this.props.userName(e.target.value)
    };

    render() {
        return(
            <div className='welcome'>
                <Zoom top delay={0}><h1>HELLO!</h1></Zoom>
                <Zoom delay={200} top><h2>Are You ready for some math?</h2></Zoom>
                <Zoom top delay={300}><h4>Your name:</h4></Zoom>
                <Zoom delay={450} top><input onChange={this.changeName} ref={element => this.input = element} defaultValue='GallAnonim'/></Zoom>
                <Zoom delay={600} top><button onClick={this.props.close}>YES!</button></Zoom>
            </div>
        )
    }
}

class Test extends Component {
    render() {
        return(
            <div>
                {this.props.bestScore.map(player => {
                    return(
                        <div className='high-scores' key={player.id}>{player.name} {player.score}</div>
                    )
                })}
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
                    <h2>Your score: {this.props.score}</h2>
                </Jump>
                {this.props.bestScores.length === 0 ? null : <Test bestScore={this.props.bestScores}/>}
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
        return (
            <div style={{textAlign: 'center'}}>
                <input
                    type="number"
                    autoComplete='off'
                    className='answer'
                    name='answer'
                    value={this.props.zeroInput}
                    onChange={this.handleChange}
                    ref={element => this.input = element}
                    onKeyDown={this.handleEnter}
                />
            </div>
        )
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
        b: 0,
        bestScores: []
    };
    componentDidMount() {
        this.startInterval();
        this.randomNumber();
        const apiURL = 'http://localhost:3010/bestScores/';
        fetch(apiURL)
            .then(r => r.json())
            .then(r => {
                this.setState({bestScores: r});
            })
            .catch(err => {
                console.warn(err);
            })
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
            }, () => {
                this.setState({level: Math.ceil(this.state.score / 5)});
            });


            this.startInterval();
            this.randomNumber();


        } else {
            this.props.score(this.state.score);
            this.props.gameover();

            this.state.bestScores.length !== 0 && this.checkScore()


        }
    };
    checkScore = () => {
        let bestScores = [...this.state.bestScores];
        const userScore = this.state.score;
        const userName = this.props.userName;
        const apiURL = 'http://localhost:3010/bestScores/';
        const newFetch = (number) => {

            fetch(apiURL + number, {
                headers:{
                    "Content-Type": "application/json"
                },
                method:"PUT",
                body:JSON.stringify({name: userName, score: userScore})
            }).then(r=>{
                console.log(r)
            }).catch(err=>{
                console.warn(err)
            })
        };

        if (this.state.bestScores.length === 0) {
            return null
        } else {
            if (userScore > bestScores[0].score) {
                bestScores[0].score = userScore;
                bestScores[0].name = userName;
                newFetch(1);
            } else if (userScore > bestScores[1].score) {
                bestScores[1].score = userScore;
                bestScores[1].name = userName;
                newFetch(2);
            } else if (userScore > bestScores[2].score) {
                bestScores[2].score = userScore;
                bestScores[2].name = userName;
                newFetch(3);
            }else{
                console.log("spadaj na drzewo")
            }
            this.props.highScores(this.state.bestScores);
        }

    };
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return(
            <div className='game'>
                <ProgressBar width={this.state.width}/>
                <Operation a={this.state.a} b={this.state.b}/>
                <Answer answer={this.changeAnswer} zeroInput={this.state.answer} enter={this.checkAnswer}/>
                <Info score={this.state.score} level={this.state.level}/>
            </div>
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