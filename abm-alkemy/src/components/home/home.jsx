import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getAbm, filterAbmByType } from "../../actions/indexActions";
import { Link } from "react-router-dom";
import "./home.css";
import Paginado from "../paginado/paginado";
import CardAbm from "../card-abm/card-abm";
import Balance from "../balance/balance";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const balance = useSelector((state) => state.balance);

  //SECTOR PAGINADO
  const abms = useSelector((state) => state.abm);
  const [currentPage, setcurrentPage] = useState(1);
  const [abmPerPage, setabmPerPage] = useState(10);
  const indexOfLastAbmToShow = currentPage * abmPerPage;
  const indexOfFirstToShow = indexOfLastAbmToShow - abmPerPage;
  const currentAbmsToShow = abms?.slice(
    indexOfFirstToShow,
    indexOfLastAbmToShow
  );
  const paginado = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAbm({ user: user }));
  }, []);


  //TYPE FILTER
  const handleFilterType = (e) => {
    dispatch(filterAbmByType(e.target.value));
  };

  return (
    <div>
      <Balance win={balance.in} spent={balance.out}></Balance>
      <div>
        <ul>
          <div class="header">
            <h3>Últimos 10 movimientos</h3>

              <Link to="/create">
            <button class="toLog">
                <h4 class="txt-btn">Create new ABM</h4>{" "}
            </button>
              </Link>
            <div>
              <h4 class="filter-cont">Filter ABMs</h4>
              <select class="filter" onChange={(e) => handleFilterType(e)}>
                <option disabled selected>
                  Filter by Type
                </option>
                <option value="in">in</option>
                <option value="out">out</option>
              </select>
            </div>
          </div>
          {currentAbmsToShow?.map((abm) => {
            return (
              <CardAbm
                concept={abm.concept}
                amount={abm.amount}
                date={abm.date.slice(0,10)}
                type={abm.type}
                id={abm.id}
                category={abm.category}
              />
            );
          })}
        </ul>
        <div class="foot">
            <Link to="/create">
          <button class="toLog">
              <h4 class="txt-btn">Create new ABM</h4>{" "}
          </button>
            </Link>
          <Paginado
            contentsPerPage={abmPerPage}
            allAbms={abms?.length}
            paginado={paginado}
          ></Paginado>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
