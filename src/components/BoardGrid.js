import React from 'react';
import Square from './Square';

const boardGrid = (props) => (
	<div className="BoardGrid">
		{props.board.map((row, rowIndex) => {
			return (
				<div key={rowIndex} className="SquareRow">
					{row.map((square, colIndex) => {
						return (
							<Square
								key={[ rowIndex, colIndex ]}
								cases={props.cases}
								value={square}
								row={rowIndex}
								col={colIndex}
								handleClick={props.handleClick}
							/>
						);
					})}
				</div>
			);
		})}
	</div>
);

export default boardGrid;
