import React, { Component } from "react";
import Zoom from "react-reveal/Zoom";

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

export default WelcomeWindow;
