import React from "react";
import "./card-abm.css";
import {deleteAbmAction } from "../../actions/indexActions";
import {useDispatch} from 'react-redux'

function CardAbm({ concept, amount, date, type, id }) {
  const dispatch = useDispatch();
  //CARDS ACTIONS: DELETE Y EDIT
  const deleteAbm = function (id) {
    deleteAbmAction(id);
  };
  const editAbm = function (id) {

  };

  return (
    <div class="container-card">
      <div class="card">
        {!concept ? null : <h2>Concept: {concept}</h2>}

        {!amount ? null : <h2>Amount: $ {amount}</h2>}

        {!date ? null : <h4>Date: {date}</h4>}

        {!type ? null : <h3>Type: {type}</h3>}
        <div class="actions">
          <button class="btn-del" onClick={() => deleteAbm(id)}>
            DELETE
          </button>
          <button class="btn-del" onClick={() => editAbm(id)}>
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAbm;
