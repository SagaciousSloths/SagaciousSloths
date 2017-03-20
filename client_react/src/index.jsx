import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './components/Answer.jsx';
import $ from 'jquery';

var dummy = ['Kay', 'Albito', 'url']

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
      firstname: '',
      lastname: '',
      deck: '',
      pictureUrl: 'http://i.imgur.com/EAju0FG.jpg'
		};
		this.isReady = this.isReady.bind(this);
    this.getAllStudents = this.getAllStudents.bind(this);
	}

  getAllStudents() {
  	$.ajax({
    	url: '/quiz',
      method: 'GET',
      success: function(data) {
        var student = data[0];
        console.log(student);

        this.setState({
          firstname: student.firstname,
          lastname: student.lastname,
          deck: student.deck,
          pictureUrl: student.pictureUrl
        })
      }.bind(this),
      error: function(err) {
      	console.error('error', err);
      }
    });
  }

  getAllScores() {
    $.ajax({
      url: '/dashboard',
      method: 'GET',
      success: function(data) {
        console.log('data', data);
      },
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
      }
      ,
      error: function() {
        console.error('error');
      }
    })
  }

	isReady() {
		this.setState({
			ready: true
		});

    this.getAllStudents();
    this.getAllScores();
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
						<Answer
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            />
					)}
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Quiz />, document.getElementById('root')
);

