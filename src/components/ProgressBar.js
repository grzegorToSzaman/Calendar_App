import React, { Component } from "react";

class ProgressBar extends Component {
    render() {
        const spanStyle = {
            width: this.props.width + '%',
            borderRadius: '15px'
        };
        return(
            <div className='bar'>
                <span id="progress-bar" style={spanStyle}/>
            </div>
        )
    }
}

export default ProgressBar;
