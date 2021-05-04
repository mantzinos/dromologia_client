import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Fail from "./components/Fail";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/fail" component={Fail} />
          <Route exact path="/main/:name" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
