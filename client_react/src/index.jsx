import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './components/Answer.jsx';
import $ from 'jquery';
import axios from 'axios';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      ready: false,
      firstname: '',
      lastname: '',
      deck: '',
      pictureUrl: '',
      page: 'dashboard',
      cohortList: []
    };
    this.isReady = this.isReady.bind(this);
    this.getFirstStudent = this.getFirstStudent.bind(this);
    this.moveBackToReady = this.moveBackToReady.bind(this);
    this.renderNextStudent = this.renderNextStudent.bind(this);
    this.saveUserAnswer = this.saveUserAnswer.bind(this);
    this.changePageToQuiz = this.changePageToQuiz.bind(this);
  }

  componentDidMount () {
    var _this = this;
    this.getFirstStudent();
    axios.get('/dashboard')
    .then(function (response) {
      var cohortList = Object.keys(response.data).sort();
      // finalize sorting function .sort();
      _this.setState({
        cohortList: cohortList
      });
    })
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
    var _this = this;
    // commenting out ajax for functionality check
    // $.ajax({
    //   url: '/quiz',
    //   method: 'POST',
    //   contentType: 'application/json',
    //   success: function() {
    //     console.log('success');
    //   },
    //   error: function() {
    //     console.error('error');
    //   }
    // });
    var counter = this.state.counter + 1;
    _this.setState({
      counter: counter
    })
    this.moveBackToReady();
    this.renderNextStudent();
  }

  renderNextStudent() {
    console.log(this.state.counter);
    $.ajax({
      url: '/quiz',
      method: 'GET',
      success: function(data) {
        console.log(this);
        this.setState({
          firstname: data[this.state.counter].firstname,
          lastname: data[this.state.counter].lastname,
          deck: data[this.state.counter].deck,
          pictureUrl: data[this.state.counter].pictureUrl
        })
        console.log(this);
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

  changePageToQuiz() {
    this.setState({
      page: 'quiz'
    })
  } 

  render() {
    return (
      <div> 
      {this.state.page === 'dashboard' ? (
        <div>
          {this.state.cohortList.map((cohort, index) => {
            return (
              <button key={index} onClick={this.changePageToQuiz} className="cohortButton">{cohort}</button>
            )
          })}
        </div>
      ) : (
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
              )
            }
          </div>
        </div>
      )}  
      </div>
    )
  }
}

ReactDOM.render(
  <Quiz />, document.getElementById('root')
);