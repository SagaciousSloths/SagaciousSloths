import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './components/Answer.jsx';
import $ from 'jquery';
import axios from 'axios';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
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
    // this.getFirstStudent = this.getFirstStudent.bind(this);
    this.loadQuiz = this.loadQuiz.bind(this);
    this.moveBackToReady = this.moveBackToReady.bind(this);
    this.renderNextStudent = this.renderNextStudent.bind(this);
    this.saveUserAnswer = this.saveUserAnswer.bind(this);
    // this.changePageToQuiz = this.changePageToQuiz.bind(this);
  }

  componentDidMount () {
    var _this = this;
    // this.getFirstStudent();
    axios.get('/dashboard')
    .then(function (response) {
      var cohortList = Object.keys(response.data).sort();
      _this.setState({
        cohortList: cohortList
      });
    });
  }

  // getFirstStudent() {
  //   $.ajax({
  //     url: '/quiz',
  //     method: 'GET',
  //     success: function(data) {
  //       this.setState({
  //         firstname: data[0].firstname,
  //         lastname: data[0].lastname,
  //         deck: data[0].deck,
  //         pictureUrl: data[0].pictureUrl
  //       });
  //     }.bind(this),
  //     error: function(err) {
  //       console.error('error', err);
  //     }
  //   });
  // }

  saveUserAnswer(event, answer) {
    event.preventDefault();
    // console.log('JG;', string);
    var _this = this;
    $.ajax({
      url: '/api/card',
      method: 'POST',
      contentType: 'html/text',
      // contentType: 'application/json',
      // dataType: 'json', 
      data: answer,
      success: function() {
        console.log('success');
        // save string value 
      },
      error: function() {
        console.error('error');
      }
    });
    var counter = this.state.counter + 1;
    _this.setState({
      counter: counter
    });
    this.moveBackToReady();
    this.renderNextStudent();
  }

 // {id: ‘id of card quizzed on received from server in GET /quiz', quizResult: ‘gotit/almost/nope’}

  loadQuiz(event) {
    // var _this = this;
    console.log('loading quiz for cohort:', event.target.innerHTML);
    $.ajax({
      url: '/quiz',
      method: 'GET',
      data: {deck: event.target.innerHTML},
      success: function(cards) {
        console.log('loadState, cards:', cards);
        this.setState({cards: cards});
        this.setState({counter: 0});
        
        this.setState({
          page: 'quiz'
        });
        
        // this.setState({
        //   firstname: cards[this.state.counter].firstname,
        //   lastname: cards[this.state.counter].lastname,
        //   deck: cards[this.state.counter].deck,
        //   pictureUrl: cards[this.state.counter].pictureUrl
        // });
      }.bind(this),
      error: function(err) {
        console.error('error loading quiz', err);
      }
    });
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
        });
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
    });
  }


  render() {
    return (
      <div> 
      {this.state.page === 'dashboard' ? (
        <div>
          {this.state.cohortList.map((cohort, index) => {
            return (
              <button key={index} onClick={(cohort) => { this.loadQuiz(cohort); }} className="cohortButton">{cohort}</button>
            );
          })}
        </div>
      ) : (
        <div id="quiz">
          <div>
            <img className="profilePic" src={this.state.cards[this.state.counter].pictureUrl}/>
          </div>
          <br />
          <div>
            {!this.state.ready ? (
                <button onClick={this.isReady} className="readyButton">
                  Ready?
                </button>
              ) : (
                <Answer 
                  firstname={this.state.cards[this.state.counter].firstname} 
                  lastname={this.state.cards[this.state.counter].lastname}
                  saveUserAnswer={this.saveUserAnswer}
                /> 
              )
            }
          </div>
        </div>
      )}  
      </div>
    );
  }
}

ReactDOM.render(
  <Quiz />, document.getElementById('root')
);