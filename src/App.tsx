import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import { loadUserThunk, loginSuccess } from "./store/actions/auth";
import setToken from "./utils/setAuthToken";
import Routes from "./components/routes/Routes";

const App: React.FC<Props> = (props) => {
  if (localStorage.token) {
    setToken(localStorage.token);
    props.loginSuccess(localStorage.token);
  }

  useEffect(() => {
    props.loadUserThunk();
  }, []);

  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Routes />
        </Switch>
      </>
    </Router>
  );
};

const mapDispatchToProps = {
  loadUserThunk,
  loginSuccess,
};

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default connector(App);
