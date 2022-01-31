import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getAbm, filterAbmByType, filterAbmByCategory } from "../../actions/indexActions";
import { Link } from "react-router-dom";
import "./home.css";
import Paginado from "../paginado/paginado";
import CardAbm from "../card-abm/card-abm";
import Balance from "../balance/balance";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const balance = useSelector((state) => state.balance);
  const [cat_array] = useState(["Alimentación","Vivienda","Transporte","Salud y autocuidado","Entretenimiento y diversión","Vestuario","Educación","Comunicaciones"]);


  //SECTOR PAGINADO
  const abms = useSelector((state) => state.abm);
  const [currentPage, setcurrentPage] = useState(1);
  const [abmPerPage] = useState(10);
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

  //TYPE FILTER
  const handleFilterCategory = (e) => {
    dispatch(filterAbmByCategory(e.target.value));
  };

  return (
    <div class="body-home">
      <Balance win={balance.in} spent={balance.out}></Balance>
      <div>
    
            
          <div class="header">

              <Link to="/create">
            <button class="toLog">
                <h4 class="txt-btn">Create new ABM</h4>{" "}
            </button>
              </Link>
            <div>
              <h4 class="filter-cont">Type ABMs</h4>
              <select class="filter" onChange={(e) => handleFilterType(e)}>
                <option disabled selected>
                  Filter by Type
                </option>
                <option value="in">In</option>
                <option value="out">Out</option>
                <option value="quit-filter">Quit Filter</option>
              </select>
            </div>
            <div>
              <h4 class="filter-cont">Category ABMs</h4>
              <select class="filter" onChange={(e) => handleFilterCategory(e)}>
                <option disabled selected>
                  Filter by Category
                </option>
                {cat_array && cat_array.map(cat=>{
                   return <option value={cat}>{cat}</option>
                })}
                 <option value="quit-filter">Quit Filter</option>
              </select>
            </div>
          </div>
          <h3 class="text">Últimos 10 movimientos</h3>
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
