import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/indexActions";
import { useHistory } from "react-router-dom";
import "./sign-up-form.css";
import axios from "axios";

function SignUpForm() {
  const dispatch = useDispatch();
  let history = useHistory();
  var [data, setData] = useState({
    name: "",
    password: "",
    repeatPass: ""
  });

  const [errors, setErrors] = useState({});
  const [habilitado, setHabilitado] = useState(false);

  useEffect(() => {
    setErrors(inputValidate(data));
  }, [data]);

  const inputValidate = (data) => {
    const errors = {};
   
    if (!data.name) {
      errors.name = "Full Name is required!";
      setHabilitado(false);
    }
    if (!data.password) {
      errors.password = "Password is required!";
      setHabilitado(false);
    }
    if (data.password !== data.repeatPass) {
      errors.repeatPass = "Passwords do not match!";
      setHabilitado(false);
    } 
    else setHabilitado(true);

    return errors;
  };

  function handleChange(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (data.password === data.repeatPass) {
      
      await axios({
        method: "GET",
        url: "http://localhost:3001/sign-up",
        data: data
      }).then((m)=>{
        dispatch(setUser(m.name))
        return history.push("/home")
        }
        );
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
              className="fullname"
              type="text"
              placeholder="Full Name..."
              required
              name="name"
              value={data.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && (
              <div className="register__err">
                <strong>{errors.name}</strong>
              </div>
            )}

            <input
              className="password"
              type="password"
              placeholder="Password"
              required
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            {errors.password && (
              <div className="register__err">
                <strong>{errors.password}</strong>
              </div>
            )}
            <input
              className="repeatPass"
              type="password"
              placeholder="Repeat your Password"
              required
              name="repeatPass"
              value={data.repeatPass}
              onChange={(e) => handleChange(e)}
            />
            {errors.repeatPass && (
              <div className="register__err">
                <strong>{errors.repeatPass}</strong>
              </div>
            )}
        
            <button
              type="submit"
              disabled={!habilitado}
              onClick={(e) => handleSubmit(e)}
              className="creator_btn"
            >
              SIGN UP
            </button>
          </form>
        </div>

        <div className="imgContainer">
          <img
            src="https://www.sneakerlost.es/hs-fs/hubfs/2019/WEB%20NUEVA/LANDING-CAC/calculadora-cacLO.png?width=380&height=268&name=calculadora-cacLO.png"
            alt="ABM Logo"
            width="90%"
          />
          <p className="parrafo">
            <p>
              ABM App makes it  <br />
              easier...
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
