import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getAbm } from "../../actions/indexActions";
import { Link } from 'react-router-dom';
import './home.css'
import PresentacionalPreview from '../presentacional-preview/presentacional-preview'


function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAbm({user:user}));
  }, []);

  const abm = useSelector((state) => state.abm);

  return (
    <div>
      
      <div className="App">
        <ul>
          <h3>Últimos 10 movimientos</h3>
          <button class="toLog"><Link to="/create"> Create new ABM </Link></button>
          {abm?.map((abm) => {
            return (
              <PresentacionalPreview
              concept={abm.concept}
              amount={abm.amount}
              date={abm.date}
              type={abm.type}
            />
            );
          })}
        </ul>
        <button class="toLog"><Link to="/create"> Create new ABM </Link></button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
