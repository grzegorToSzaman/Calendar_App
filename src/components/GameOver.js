import React, { Component } from "react";
import HighScores from "./HighScores";
import Flash from "react-reveal/Flash";
import Jump from "react-reveal/Jump";
import Pulse from "react-reveal/Pulse";

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
                {this.props.bestScores.length === 0 ? null : <HighScores bestScore={this.props.bestScores}/>}
                <Pulse delay={2000} count={3}>
                    <button onClick={this.refresh}>AGAIN!</button>
                </Pulse>
            </div>
        )
    }
}

export default GameOver;
