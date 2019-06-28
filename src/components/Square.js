import React from 'react';

const square = (props) => (
	<div className="Square" onClick={() => props.handleClick(props.row, props.col)}>
		{props.cases[props.value] !== null ? (
			<div style={{ backgroundImage: `url(${props.cases[props.value]})` }} />
		) : (
			<div />
		)}
	</div>
);

export default square;
