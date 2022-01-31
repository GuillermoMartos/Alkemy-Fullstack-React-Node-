import "./log-form.css";
import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {setUser} from '../../actions/indexActions';
import { useHistory } from "react-router-dom";

function LogForm() {
  var [log, setLog] = useState({
    user: "",
    password: "",
  });
  const dispatch=useDispatch();
  const history=useHistory();

  function handleChange(e) {
    const value = e.target.value;
    setLog({
      ...log,
      [e.target.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await axios({
      method: "POST",
      url: "http://localhost:3001/log-in",
      data: log
    }).then((m)=>{
      if (m.data===null) return alert(`no user "${log.user}" founded or pass incorrect, try again please`)
      dispatch(setUser(m.data.name))
      return history.push("/home")
      }
      );
  }

  return (
    <div class="nav">
         
        <img
          class="logo"
          alt="logo"
          src="https://s3-symbol-logo.tradingview.com/abm-industries--600.png"
          width="62px"
        />
     
      <div className="Log">
        <h2>  Alkemy ABM 🧮</h2>
        <form class="form" onSubmit={handleSubmit}>
          <label>
            <h4>Mail</h4>
          </label>

          <input
            class="input"
            name="user"
            value={log.user}
            id="myInput"
            onChange={(e) => handleChange(e)}
            required
            autoComplete="off"
          />

          <label>
            <h4>Password</h4>
          </label>

          <input
            class="input"
            name="password"
            value={log.password}
            onChange={(e) => handleChange(e)}
            required
            autoComplete="off"
          />
          <button class="hola" type="submit">
            <h4 class="landingPage__button_text">LOG IN</h4>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogForm;
