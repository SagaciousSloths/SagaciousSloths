import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './components/Answer.jsx';
import Menubar from './components/Menubar.jsx';
import $ from 'jquery';
import axios from 'axios';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      counter: 0,
      ready: false,
      page: 'dashboard',
      cohortList: [],
      cohortStats: {}
    };
    this.isReady = this.isReady.bind(this);
    this.loadQuiz = this.loadQuiz.bind(this);
    this.loadDashboard = this.loadDashboard.bind(this);
    this.moveBackToReady = this.moveBackToReady.bind(this);
    this.renderNextStudent = this.renderNextStudent.bind(this);
    this.saveUserAnswer = this.saveUserAnswer.bind(this);
    this.renderStats = this.renderStats.bind(this);
  }

  componentDidMount () {
    this.loadDashboard();
  }

  loadDashboard () {
    var _this = this;
    axios.get('/dashboard')
    .then(function (response) {
      var cohortList = Object.keys(response.data).sort();
      _this.setState({
        cohortList: cohortList,
        cohortStats: response.data
      });
      _this.setState({
        page: 'dashboard'
      });
      console.log(_this.state.cohortStats);
    });
  }

  // { SF73: { red: 1, orange: 4, green: 5 },
  //   SF72: { red: 0, orange: 1, green: 2 } }


  renderStats() {

  }


  saveUserAnswer(event, answer) {
    event.preventDefault();
    let cardId = this.state.cards[this.state.counter].id;


    console.log('React: sending to server the answer:', answer, 'for cardID:', cardId);

    var counter = this.state.counter + 1;

    console.log('counter:', counter, '  cards length:', this.state.cards.length);

    if (counter < this.state.cards.length) {
      this.setState({
        counter: counter,
        ready: false,
      });
    }
    var _this = this;

    $.ajax({
      url: '/api/card',
      method: 'POST',

      contentType: 'application/json',

      data: JSON.stringify({ cardId: cardId, answer: answer}),
      success: function() {
        console.log('ajax success updating card');

        console.log('counter:', counter, 'cards.length:', _this.state.cards.length);
        if (counter >= _this.state.cards.length ) {
          _this.loadDashboard();  // load the dashboard
        }

      },
      error: function(err) {
        console.error('error in saveUserAnswer:', err);
      }
    });


  }

  loadQuiz(event) {
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
      <Menubar items={['Dashboard', 'Log Out']} loadDashboard={this.loadDashboard}/>
      {this.state.page === 'dashboard' ? (
        <div className="cohortButtonContainer">
          {this.state.cohortList.map((cohort, index) => {
            var _cohort = cohort;
            return (
              <div className="cohortStatContainer">
                <div>
                  <button key={index} onClick={(cohort) => { this.loadQuiz(cohort); }} className="cohortButton">
                    {cohort}
                  </button>
                  <div className="statBox">
                    <span className="redStat">{this.state.cohortStats[cohort].red}</span>
                    <span className="orangeStat">{this.state.cohortStats[cohort].orange}</span>
                    <span className="greenStat">{this.state.cohortStats[cohort].green}</span>
                  </div>
                </div>


              </div>
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
                  Show me the answer
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