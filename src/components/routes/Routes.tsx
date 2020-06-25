import React from "react";
import { Route } from "react-router-dom";
import Auth from "../auth/Auth";
import Dashboard from "../dashboard/Dashboard";

import PrivateRoute from "./PrivateRoute";

import Alert from "../alert/Alert";
import Profile from "../profile/Profile";
import AdditionalProfileData from "../profile/AdditionalProfileData";

export default (props) => {
  return (
    <section className="container">
      <Alert />
      <Route path="/register" component={Auth} />
      <Route path="/login" component={Auth} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-profile" component={Profile} />
      <PrivateRoute path="/edit-profile" component={Profile} />
      <PrivateRoute path="/add-experience" component={AdditionalProfileData} />
      <PrivateRoute path="/add-education" component={AdditionalProfileData} />
    </section>
  );
};
