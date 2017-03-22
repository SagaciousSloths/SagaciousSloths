import React from 'react';

const Answer = (props) => (
	<div>
		<h3 className="studentName">
			{props.firstname} {props.lastname}
		</h3>
		<div>
			<p className="answerCorrect">Did you answer correctly?</p>
			<div className="buttonContainer">
				<button className="gotItButton" onClick={ (event) => {props.saveUserAnswer(event, 'got it')} }>Yes!</button>
				<button className="almostButton" onClick={ (event) => {props.saveUserAnswer(event, 'almost')} }>Meh</button>
				<button className="nopeButton" onClick={ (event) => {props.saveUserAnswer(event, 'nope')} }>Nope</button>
			</div>
		</div>
	</div>
);

export default Answer;
