import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Route path="/" exact component={Landing} />
        <section className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
      </>
    </Router>
  );
};

export default App;
