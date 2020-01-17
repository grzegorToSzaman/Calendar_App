import React, { Component } from "react";

class HighScores extends Component {
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

export default HighScores;
