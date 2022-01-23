import { React, useState } from "react";
import PresentacionalPreview from "../presentacional-preview/presentacional-preview";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./abm-form.css";

function ABM_Form() {
  const user = useSelector((state) => state.user);

  const [field, setField] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "",
    user: user,
  });
  const [amountError, setAmountError] = useState("");
  const [uploading, setuploading] = useState(false);
  const regDec = /^[0-9]\d*(\.\d+)?$/;
  


  const handleSubmit = function (e) {
    e.preventDefault();
    const isValid = validator(field.amount);
    if (isValid) {
      setuploading(true);
      axios({
        method: "POST",
        url: "http://localhost:3001/create",
        data: field,
      }).then((res) => {
        setField({
          concept: "",
          amount: "",
          date: "",
          type: "",
        });

        if (res.statusText === "OK") {
          setuploading(false);
          alert(
            `${user ? user : ""}
            ABM added to your register :)
            `
          );
        }
      });
    }
  };

  function validator(name, value) {
    if (name === "amount") {
      if (!regDec.test(value)) {
        setAmountError(
          "Amount must be decimals/intgers (i.e., 76.4, 12, 99.9...)"
        );
        return false;
      }
    }
    setAmountError("");
    return true;
  }

  const handleChange = function (e) {
    validator(e.target.name, e.target.value);
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h3>🧮🖩 New Register 🖩🧮</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="labelForm">Concept (*) </label>
            <input
              placeholder="add new concept..."
              name="concept"
              value={field.concept}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="labelForm">Amount (*) </label>
            <div class="in-line">
              <p>$</p>
              <textarea
                placeholder="add amount here..."
                name="amount"
                value={field.amount}
                required
                onChange={handleChange}
              />
            </div>
          </div>
          {!amountError ? null : (
            <span className="errorForm">{amountError}</span>
          )}

          <div>
            <label className="labelForm">Date (*)</label>
            <input
              type="date"
              value={field.date}
              name="date"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="labelForm">Type (*)</label>
            <select required name="type" value={field.type} onChange={handleChange}>
              <option disabled selected>
                Select type
              </option>
              <option>in</option>
              <option>out</option>
            </select>
          </div>

          {/* 
          <div>
            <label className="labelForm">URL Image Loader &#128194;</label>
            <input
              placeholder="paste your URL recipe image here..."
              name="image"
              value={campos.image}
              onChange={handleChange}
            />
          </div>
          {!errorURL ? null : <span className="errorForm">{errorURL}</span>} */}

          {!uploading && (
            <button className="button" type="submit">
              SUBMIT my new ABM register!
            </button>
          )}
          {uploading && (
            <button className="button" disabled>
              ADDING my new ABM register...
            </button>
          )}
        </form>
        <h3 className="back">
          <Link to="/home">Back to Home 🧮</Link>
        </h3>
      </div>

      <div className="divRecetasShow">
        <p className="preview">CREATED PREVIEW</p>
        <PresentacionalPreview
          concept={field.concept}
          amount={field.amount}
          date={field.date}
          type={field.type}
        />
      </div>
    </div>
  );
}

export default ABM_Form;
