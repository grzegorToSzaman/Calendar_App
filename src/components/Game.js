import React, {Component} from 'react';
import ProgressBar from "./ProgressBar";
import Operation from "./Operation";
import Answer from "./Answer";
import Info from "./Info";

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
        this.randomNumber();

        this.startInterval();

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
                this.setState({level: Math.ceil(this.state.score / 5)}, () => {
                    this.randomNumber();
                });
            });


            this.startInterval();



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

export default Game;
