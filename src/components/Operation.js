import React, { Component } from "react";

class Operation extends Component {
    render() {
        return (
            <div className='operation'>
                {this.props.a} + {this.props.b}
            </div>
        )
    }
}

export default Operation;
