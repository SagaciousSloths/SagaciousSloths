import React from 'react';

const Answer = (props) => (
	<div>
		<h3 className="studentName">
			{props.firstname} {props.lastname}
		</h3>
		<div>
			<button className="gotItButton" onClick={ (event) => {props.saveUserAnswer(event, 'got it')} }>Got it!</button>
			<button className="almostButton" onClick={ (event) => {props.saveUserAnswer(event, 'almost')} }>Almost</button>
			<button className="nopeButton" onClick={ (event) => {props.saveUserAnswer(event, 'nope')} }>Nope</button>
		</div>
	</div>
);

export default Answer;
