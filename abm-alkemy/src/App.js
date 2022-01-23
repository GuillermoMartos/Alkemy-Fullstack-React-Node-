import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogForm from "./components/log-form/log-form";
import Home from "./components/home/home";
import AbmForm from "./components/abm-form/abm-form";
import SignUpForm from "./components/sign-up-form/sign-up-form.jsx";

function App() {
  document.title = `ABM Alkemy 🧮`;

  return (
    <BrowserRouter>
      <div class="App">
        <a name="top"></a>
        <div class="blocks">
          <LogForm></LogForm>
          <SignUpForm></SignUpForm>
        </div>
      </div>

      {/* <Route exact path="/" component={LogForm} />
      <Route exact path="/" component={SignUpForm} /> */}
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={AbmForm} />
    </BrowserRouter>
  );
}

export default App;
