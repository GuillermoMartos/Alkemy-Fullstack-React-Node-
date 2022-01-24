import React from "react";
import "./presentacional-preview.css";

function PresentacionalPreview({ concept, amount, date, type }) {
  return (
    <div class="container-card">
      <div class="card">
        {!concept ? null : <h2>Concept: {concept}</h2>}

        {!amount ? null : <h2>Amount: $ {amount}</h2>}

        {!date ? null : <h4>Date: {date}</h4>}

        {!type ? null : <h3>Type: {type}</h3>}
      </div>
    </div>
  );
}

export default PresentacionalPreview;
