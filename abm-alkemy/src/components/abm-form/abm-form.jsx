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
    user: user
  });
  const [cat_array] = useState(["Alimentación","Vivienda","Transporte","Salud y autocuidado","Entretenimiento y diversión","Vestuario","Educación","Comunicaciones"]);
  const [amountError, setAmountError] = useState("");
  const [uploading, setuploading] = useState(false);
  const regDec = /^[0-9]\d*(\.\d+)?$/;
  


  const handleSubmit = function (e) {
    e.preventDefault();
    if(field.type==="") return alert("please set Type (in/out)")
    const isValid = submitValidator(field.amount);
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
          user:user,
          category: ""
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

  function submitValidator(value){
    if (!regDec.test(value)) {
      setAmountError(
        "Amount must be decimals/intgers (i.e., 76.4, 12, 99.9...)"
      );
      return false;
    }
  
  setAmountError("");
  return true;
  }

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
      <div class="create">
      <h3 class="register-title">🧮🖩 New Register 🖩🧮</h3>
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
            <select name="type" value={field.type} onChange={handleChange}>
              <option selected>
                Select type
              </option>
              <option value="in">in</option>
              <option value="out">out</option>
            </select>
          </div>
          
          <div class="form-input">
            <label>Category</label>
            <select name="category" value={field.category} onChange={handleChange}>
              <option selected>
                Select type
              </option>
              {cat_array && cat_array?.map(cat=>{
                 return <option value={cat}>{cat}</option>
              })}
            </select>
          </div>

          {!uploading && (
            <button class="submit-btn" type="submit">
              SUBMIT my new ABM register!
            </button>
          )}
          {uploading && (
            <button class="charge-btn" disabled>
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
