import React from 'react';

const Answer = (props) => (
	<div>
		<h3 className="studentName">
			{props.firstname} {props.lastname}
		</h3>
		<div>
			<button onClick={props.saveUserAnswer} className="gotItButton">Got it!</button>
			<button onClick={props.saveUserAnswer} className="almostButton">Almost</button>
			<button onClick={props.saveUserAnswer} className="nopeButton">Nope!</button>
		</div>
	</div>
);

export default Answer;