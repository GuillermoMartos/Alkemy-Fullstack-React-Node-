import { React, useState, useEffect } from "react";
import PresentacionalPreview from "../presentacional-preview/presentacional-preview";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./editor.css";

function Editor() {
  const { id } = useParams();
  const history = useHistory()

  useEffect(async () => {
    await axios("http://localhost:3001/get-edit", {
      method: "post",
      data: { id: id },
    }).then((res) => {
      var { concept, amount, date, type, category } = res.data;
      setField({
        concept,
        amount,
        date: date.slice(0, 10),
        type,
        user: user,
        category,
        id:id,
        temp:concept
      });
    });
  }, []);

  const user = useSelector((state) => state.user);

  const [field, setField] = useState({
    user: user,
    concept: "",
    amount: "",
    date: "",
    type: "",
    user: user,
    category: "",
  });
  const [cat_array] = useState([
    "Alimentación",
    "Vivienda",
    "Transporte",
    "Salud y autocuidado",
    "Entretenimiento y diversión",
    "Vestuario",
    "Educación",
    "Comunicaciones",
  ]);
  const [amountError, setAmountError] = useState("");
  const [uploading, setuploading] = useState(false);
  const regDec = /^[0-9]\d*(\.\d+)?$/;

  const handleSubmit = function (e) {
    e.preventDefault();
    if (field.type === "") return alert("please set Type (in/out)");
    const isValid = submitValidator(field.amount);
    if (isValid) {
      setuploading(true);
      axios({
        method: "POST",
        url: "http://localhost:3001/set-edit",
        data: field,
      }).then((res) => {
        
        if (res.statusText === "OK") {
          setuploading(false);
          alert(
            `${user ? user : ""}
            ABM changes correctly set to your register 
                    :)
            Redirecting to home...
            `
          );
        }
      });
    }
    history.push("/home")
  };

  function submitValidator(value) {
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
    <div class="parent-container">
      <div class="create">
        {field && field.temp ?
        <h3 class="register-title">🧮 Edit Register "{field.temp}" 🧮</h3>:
        <h3 class="register-title">🧮 Edit Register 🧮</h3>
        }
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
          {!amountError ? null : <span>{amountError}</span>}

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
            <label>Category</label>
            <select
              name="category"
              value={field.category}
              onChange={handleChange}
            >
              <option selected>Select type</option>
              {cat_array &&
                cat_array?.map((cat) => {
                  return <option value={cat}>{cat}</option>;
                })}
            </select>
          </div>

          {!uploading && (
            <button class="submit-btn" type="submit">
              CHANGE my selected ABM register!
            </button>
          )}
          {uploading && (
            <button class="charge-btn" disabled>
              CHANGING selected ABM register...
            </button>
          )}
        </form>
        <h3 class="text-abm">
          <Link to="/home">Back to Home 🧮</Link>
        </h3>
      </div>

      <div class="create">
        <p class="text-abm">PREVIEW</p>
        <PresentacionalPreview
          concept={field.concept}
          amount={field.amount}
          date={field.date}
          type={field.type}
          category={field.category}
        />
      </div>
    </div>
  );
}

export default Editor;
