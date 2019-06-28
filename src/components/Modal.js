import React from "react";
import "./Modal.css";

const Modal = props => (
  <div className="modal">
    <div className="container">
      {props.winner ? (
        <div>
          <div>Fin del juego! <br/>Ganador:</div>
          <img alt="winner" className="image" src={props.winner} />
        </div>
      ) : (
        <div>
          <div>Fin del juego, sin ganadores =(</div>
        </div>
      )}
      <div>
          <br/>
        <button className="button" onClick={props.resetGame}>
          Reiniciar Juego
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
