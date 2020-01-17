import React, { Component } from "react";
import Fade from "react-reveal/Fade";

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

export default Info;
