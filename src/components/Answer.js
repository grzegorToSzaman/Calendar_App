import React, { Component } from "react";

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

export default Answer;
