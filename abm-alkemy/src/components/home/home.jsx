import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getAbm } from "../../actions/indexActions";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbm("Rob"));
  }, []);

  const abm = useSelector((state) => state.abm);

  return (
    <div>
      
      <div className="App">
        <ul>
          <h3>Últimos 10 movimientos</h3>
          {abm?.map((abm) => {
            return (
              <div class="container">
                <li key={abm.id}>
                  <p> Concepto: {abm.concept}</p>
                  <p>Monto: $ {abm.amount}</p>
                  <p> Fecha: {abm.date}</p>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
