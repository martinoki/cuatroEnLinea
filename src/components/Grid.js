import React from 'react';
import BoardGrid from './BoardGrid';
import '../App.css';

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.wrapper = React.createRef();
	}
	render() {
		return (
			<div ref={this.wrapper} className="Wrapper">
				<BoardGrid cases={this.props.cases} handleClick={this.props.handleClick} board={this.props.board} />
			</div>
		);
	}
}
