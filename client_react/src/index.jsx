import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './components/Answer.jsx';
import $ from 'jquery';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      ready: false,
      firstname: '',
      lastname: '',
      deck: '',
      pictureUrl: ''
    };
    this.isReady = this.isReady.bind(this);
    this.getFirstStudent = this.getFirstStudent.bind(this);
    this.moveBackToReady = this.moveBackToReady.bind(this);
    this.renderNextStudent = this.renderNextStudent.bind(this);
    this.saveUserAnswer = this.saveUserAnswer.bind(this);
  }

  componentDidMount () {
   this.getFirstStudent(); 
  }

  getFirstStudent() {
    $.ajax({
      url: '/quiz',
      method: 'GET',
      success: function(data) {
        this.setState({
          firstname: data[0].firstname,
          lastname: data[0].lastname,
          deck: data[0].deck,
          pictureUrl: data[0].pictureUrl
        })
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }
    });
  }

  saveUserAnswer() {
    $.ajax({
      url: '/quiz',
      method: 'POST',
      contentType: 'application/json',
      success: function() {
        console.log('success');
      },
      error: function() {
        console.error('error');
      }
    });
    this.state.counter++;
    this.moveBackToReady();
    this.renderNextStudent();
  }

  renderNextStudent() {
    $.ajax({
      url: '/quiz',
      method: 'GET',
      success: function(data) {
        this.setState({
          firstname: data[this.state.counter].firstname,
          lastname: data[this.state.counter].lastname,
          deck: data[this.state.counter].deck,
          pictureUrl: data[this.state.counter].pictureUrl
        })
      }.bind(this),
      error: function(err) {
        console.error('error', err);
      }
    });
  }

  isReady() {
    this.setState({
      ready: true
    });
  }

  moveBackToReady() {
    this.setState({
      ready: false
    })
  }


  render() {
    return (
      <div id="quiz">
        <div>
          <img className="profilePic" src={this.state.pictureUrl}/>
        </div>
        <br />
        <div>
          {!this.state.ready ? (
            <button onClick={this.isReady} className="readyButton">
              Ready?
            </button>
          ) : (
            <Answer firstname={this.state.firstname} lastname={this.state.lastname} saveUserAnswer={this.saveUserAnswer} />
          )}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Quiz />, document.getElementById('root')
);