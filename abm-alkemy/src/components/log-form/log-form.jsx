import "./log-form.css";
import React, { useState } from "react";

function LogForm() {
  var [log, setLog] = useState({
    user: "",
    password: "",
  });

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
      method: "GET",
      url: "http://localhost:3001/log-in",
      data: data
    }).then((m)=>{
      dispatch(setUser(m.name))
      return history.push("/home")
      }
      );
  }

  return (
    <div class="nav">
         
        <img
          class="logo"
          alt="logo"
          src="https://logodix.com/logo/1996489.jpg"
          width="90px"
        />
     
      <div className="Log">
        <h2> 🧮 Alkemy ABM 🧮</h2>
        <form class="form" onSubmit={handleSubmit}>
          <label>
            <h4>User</h4>
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
          <button class="btn_sub" type="submit">
            <h4 class="landingPage__button_text">LOG IN</h4>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogForm;
