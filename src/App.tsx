import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/alert/alert";
import Auth from "./components/auth/Auth";
import { connect, ConnectedProps } from "react-redux";

import { loadUserThunk } from "./store/actions/auth";
import setToken from "./utils/setAuthToken";

if (localStorage.token) setToken(localStorage.token);

const App: React.FC<Props> = (props) => {
  useEffect(() => {
    props.loadUserThunk();
  }, []);
  return (
    <Router>
      <>
        <Navbar />
        <Route path="/" exact component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/register" component={Auth} />
            <Route path="/login" component={Auth} />
          </Switch>
        </section>
      </>
    </Router>
  );
};

const mapDispatchToProps = {
  loadUserThunk,
};

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default connector(App);
