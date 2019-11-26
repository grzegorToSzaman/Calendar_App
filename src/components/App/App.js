import React, {Component} from 'react';
import './App.scss';

class ProgressBar extends Component {
    state = {
        width: 100
    };
    componentDidMount() {
        this.intervalID = setInterval( () =>{
            if(this.state.width > 0) {
                this.setState({width: this.state.width - 1})
            } else {
                clearInterval(this.intervalID)
            }
        },50)
    }
    componentWillUnmount() {
        clearInterval(this.intervalID)
    }
    render() {
        const spanStyle = {
            width: this.state.width + '%'
        };
        return(
            <div className='bar'>
                <span id="progress-bar" style={spanStyle} />
            </div>
        )
    }
}

class Operation extends Component {
    render() {
        let a = Math.round(Math.random()*20);
        let b = Math.round(Math.random()*20);
        return (
            <div className='operation'>
                {a}, {b}
            </div>
        )
    }
}

class Answer extends Component {
    state = {
        answer: ''
    };
    handleChange = (e) => {
        this.setState({answer: e.target.value})
    };
    render() {
        return <input type="text" className='answer' value={this.state.answer} name='answer' onChange={this.handleChange}/>
    }
}

class Info extends Component {
    state = {
        score: 0,
        level: 1
    };
    render() {
        return (
            <div className='score'>
                <h1>Score: {this.state.score}</h1>
                <h1>Level: {this.state.level}</h1>
            </div>
        )
    }
}

class App extends Component {
  render() {
      return (
          <div className="App">
              <ProgressBar />
              <Operation />
              <Answer />
              <Info />
          </div>
      )
  }
}

export default App;
