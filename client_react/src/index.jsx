import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './components/Answer.jsx';

// var dummy = ['Kay', 'Albito', 'url']

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
		};
		this.isReady = this.isReady.bind(this);
	}
  
  getAllStudents() {
  	$.ajax({
    	url: '/quiz',
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
	}

	render() {
		return (
			<div id="quiz">
				<div className="profilePic"> 
					<p>user profile pic {dummy[2]}</p>
				</div>
				<br />
				<div>
					{!this.state.ready ? (
						<button onClick={this.isReady} className="readyButton">
							Ready?
						</button>
					) : (
						<Answer dummy={dummy}/>
					)}
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Quiz />, document.getElementById('root')
);

