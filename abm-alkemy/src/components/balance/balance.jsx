import { React, useState } from "react";
import './balance.css'

function Balance({ win, spent }) {
  if(win && win.length >=2){
    win=win.reduce((a, b) => a + b)
  }
  if(spent && spent.length >=2){
    spent=spent.reduce((a, b) => a + b)
  }
  return (
    <div class="bal-container">
      <h1 class="text">🧮🖩 Balance 🖩🧮</h1>
      {/* {win && win.length >= 2 ? (
        <h4>In: $ {win.reduce((a, b) => a + b)}</h4>
      ) : (
        <h4>In: $ {win}</h4>
      )}

      {spent && spent.length >= 2 ? (
        <h4>Out: $ {spent.reduce((a, b) => a + b)}</h4>
      ) : (
        <h4>Out: $ {spent}</h4>
      )} */}
      <h4 class="text">In: $ {win.toFixed(2)}</h4>
      <h4 class="text">Out: $ {spent.toFixed(2)}</h4>
      <h3 class="text">Total: $ {(win-spent).toFixed(2)}</h3>

    </div>
  );
}

export default Balance;
