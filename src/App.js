import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Fail from "./components/Fail";
import Main from "./components/Main";
import Settings from "./components/Settings";
import Adddriver from "./components/Adddriver";
import Failpass from "./components/Failpass";
import Failnotexist from "./components/Failnotexist";
import Updatedriver from "./components/Updatedriver";
import Deletedriver from "./components/Deletedriver";
import Adddestination from "./components/Adddestination";
import Updatedestination from "./components/Updatedestination";
import Deletedestination from "./components/Deletedestination";
import Addvehicle from "./components/Addvehicle";
import Updatevehicle from "./components/Updatevehicle";
import Deletevehicle from "./components/Deletevehicle";
import Updateuser from "./components/Updateuser";
import Deleteuser from "./components/Deleteuser";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/fail" component={Fail} />
          <Route exact path="/failpass" component={Failpass} />
          <Route exact path="/failnotexist" component={Failnotexist} />
          <Route exact path="/main/:name" component={Main} />
          <Route exact path="/settings/:name" component={Settings} />
          <Route exact path="/adddriver/:name" component={Adddriver} />
          <Route exact path="/updatedriver/:name" component={Updatedriver} />
          <Route exact path="/deletedriver/:name" component={Deletedriver} />
          <Route
            exact
            path="/adddestination/:name"
            component={Adddestination}
          />
          <Route
            exact
            path="/updatedestination/:name"
            component={Updatedestination}
          />
          <Route
            exact
            path="/deletedestination/:name"
            component={Deletedestination}
          />
          <Route exact path="/addvehicle/:name" component={Addvehicle} />
          <Route exact path="/updatevehicle/:name" component={Updatevehicle} />
          <Route exact path="/deletevehicle/:name" component={Deletevehicle} />
          <Route exact path="/updateuser/:name" component={Updateuser} />
          <Route exact path="/deleteuser/:name" component={Deleteuser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
