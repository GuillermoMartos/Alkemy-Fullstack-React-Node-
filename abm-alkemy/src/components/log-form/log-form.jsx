import "./log-form.css";
import React, { useState } from "react";

function LogForm() {

  var [log, setLog] = useState({
    email: "",
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
    alert(log.email + log.password)
  }

  return (
    <div className="Log">
      <h2>Log In</h2>
      <form className="form-child" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <h4>Email</h4>
          </label>
        </div>
        <input
          className="landingPage__input"
          type="email"
          name="email"
          value={log.email}
          id="myInput"
          onChange={(e) => handleChange(e)}
          required
          autoComplete="off"
        />
        <div className="form-group">
          <label>
            <h4>Password</h4>
          </label>
        </div>
        <input
          className="landingPage__input"
          type="password"
          name="password"
          value={log.password}
          onChange={(e) => handleChange(e)}
          required
          autoComplete="off"
        />
        <button className="landingPage__button_login" type="submit">
          <h4 className="landingPage__button_text">LOG IN</h4>
        </button>
      </form>
    </div>
  );
}

export default LogForm;
