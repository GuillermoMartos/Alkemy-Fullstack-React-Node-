import "./nav.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/indexActions";
import { useHistory } from "react-router-dom";

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUser(""));
    return history.push("/");
  }
  return (
    <div class="nav">
      <Link style={{ textDecoration: "none" }} to="/home">
        <img
          class="logo"
          alt="logo"
          src="https://s3-symbol-logo.tradingview.com/abm-industries--600.png"
          width="62px"
        />
      </Link>

      <div className="Log">
        <Link style={{ textDecoration: "none" }} class="link" to="/home">
          <h2> 🧮 Alkemy ABM 🧮</h2>
        </Link>
      <form class="form" onSubmit={handleSubmit}>
        <button class="btn_sub" type="submit">
          <h4 class="landingPage__button_text">LOG OUT</h4>
        </button>
      </form>
      </div>
    </div>
  );
}

export default Nav;
