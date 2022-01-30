import React from "react";
import "./card-abm.css";
import {deleteAbmAction } from "../../actions/indexActions";
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function CardAbm({ concept, amount, date, type, id, category }) {
  const dispatch = useDispatch();
  //CARDS ACTIONS: DELETE Y EDIT
  const deleteAbm = function (id) {
    dispatch(deleteAbmAction(id));
  };
  const editAbm = function (id) {

  };

  return (
    <div class="container-card">
      <div class="card">
        {!concept ? null : <h2>Concept: {concept}</h2>}

        {!amount ? null : <h2>Amount: $ {amount}</h2>}

        {!date ? null : <h4>Date: {date}</h4>}

        {!category ? null : <h4>Category: {category}</h4>}

        {!type ? null : <h3>Type: {type}</h3>}
        <div class="actions">
          <button class="btn-del" onClick={() => deleteAbm(id)}>
            DELETE
          </button>
          
          <Link to={`/edit/${id}`}>
          <button class="btn-del" onClick={() => editAbm(id)}>
            EDIT
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardAbm;
