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
    if (isValid && field.type) {
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
      <div class="create">
        <form onSubmit={handleSubmit}>
          <div class="form-input">
            <label>Concept (*) </label>
            <input
              placeholder="add new concept..."
              name="concept"
              value={field.concept}
              required
              onChange={handleChange}
            />
          </div>

          <div class="form-input">
            <label>Amount (*) </label>
            <div class="in-line">
              <p>$</p>
              <input
                placeholder="add amount here..."
                name="amount"
                value={field.amount}
                required
                onChange={handleChange}
              />
            </div>
          </div>
          {!amountError ? null : (
            <span>{amountError}</span>
          )}

          <div class="form-input">
            <label>Date (*)</label>
            <input
              type="date"
              value={field.date}
              name="date"
              required
              onChange={handleChange}
            />
          </div>

          <div class="form-input">
            <label>Type (*)</label>
            <select required name="type" value={field.type} onChange={handleChange}>
              <option disabled>
                Select type
              </option>
              <option selected>in</option>
              <option>out</option>
            </select>
          </div>

          {/* 
          <div>
            <label>URL Image Loader &#128194;</label>
            <input
              placeholder="paste your URL recipe image here..."
              name="image"
              value={campos.image}
              onChange={handleChange}
            />
          </div>
          {!errorURL ? null : <span>{errorURL}</span>} */}

          {!uploading && (
            <button type="submit">
              SUBMIT my new ABM register!
            </button>
          )}
          {uploading && (
            <button disabled>
              ADDING my new ABM register...
            </button>
          )}
        </form>
        <h3>
          <Link to="/home">Back to Home 🧮</Link>
        </h3>
      </div>

      <div class="create">
        <p>CREATED PREVIEW</p>
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
