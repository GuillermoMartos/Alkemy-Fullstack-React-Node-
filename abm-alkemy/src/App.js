import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LogForm from "./components/log-form/log-form";
import Home from "./components/home/home";

function App() {
  document.title=`ABM Alkemy 🧮`
  
  return (
    
    <BrowserRouter>
    
    
    <div className="App">
     <h1>Welcome</h1>
     <h1>🧮🖩 Alkemy ABM 🖩🧮</h1>
            <log-form></log-form>
       
    </div>
      
      <Route exact path="/" component={LogForm} />
      <Route exact path="/home" component={Home} />
      
    </BrowserRouter>
    
  );
}

export default App;
