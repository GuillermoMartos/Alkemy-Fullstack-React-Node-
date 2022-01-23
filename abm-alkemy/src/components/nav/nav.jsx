import "./nav.css";
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div class="nav">
      <Link style={{ textDecoration: 'none' }}  to="/home">
        <img
          class="logo"
          alt="logo"
          src="https://logodix.com/logo/1996489.jpg"
          width="90px"
        />
      </Link>

      <div className="Log">
        <Link style={{ textDecoration: 'none' }} class="link" to="/home">
          <h2> 🧮 Alkemy ABM 🧮</h2>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
