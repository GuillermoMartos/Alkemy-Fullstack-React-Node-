import { BrowserRouter, Route } from "react-router-dom";
import LogForm from "./components/log-form/log-form";
import Home from "./components/home/home";
import AbmForm from "./components/abm-form/abm-form";
import SignUpForm from "./components/sign-up-form/sign-up-form.jsx";
import { useSelector } from "react-redux";
import Nav from "./components/nav/nav";
import Editor from "./components/editor/editor";

function App() {
  document.title = `ABM Alkemy 🧮`;
  const user = useSelector((state) => state.user);
  if(!user){
    return(
      <BrowserRouter>
      <div class="App">
        <a name="top"></a>
        <div class="blocks">
          <LogForm></LogForm>
          <SignUpForm></SignUpForm>
        </div>
      </div>
   </BrowserRouter>
    )
  }
  else return (
      <BrowserRouter>
      
      
      <Nav></Nav>
      {/* <Route exact path="/" component={LogForm} />
      <Route exact path="/" component={SignUpForm} /> */}
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={AbmForm} />
      <Route exact path="/edit/:id" component={Editor} />
    </BrowserRouter>
  );
}

export default App;
