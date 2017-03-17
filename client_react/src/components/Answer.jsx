import React from 'react';

const Answer = (props) => (
	<div>
		<div>
			{props.dummy[0]} {props.dummy[1]}
		</div>
		<div>
			<button>Got it!</button>
			<button>Almost</button>
			<button>Nope!</button>
		</div>
	</div>
);

export default Answer;