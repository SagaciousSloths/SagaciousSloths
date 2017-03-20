import React from 'react';

const Answer = (props) => (
	<div>
		<h3 className="studentName">
			{props.firstname} {props.lastname}
		</h3>
		<div>
			<button className="gotItButton">Got it!</button>
			<button className="almostButton">Almost</button>
			<button className="nopeButton">Nope!</button>
		</div>
	</div>
);

export default Answer;