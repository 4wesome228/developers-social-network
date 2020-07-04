import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../auth/Auth";
import Dashboard from "../dashboard/Dashboard";

import PrivateRoute from "./PrivateRoute";

import Alert from "../alert/Alert";

import AdditionalProfileData from "../profile-forms/AdditionalProfileData";
import Profiles from "../profiles/Profiles";
import CreateProfile from "../profile-editor/CreateProfile";
import EditProfile from "../profile-editor/EditProfile";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post-display/Post";
import NotFound from "./NotFound";

export default (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route path="/register" component={Auth} />
        <Route path="/login" component={Auth} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create-profile" component={CreateProfile} />
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <PrivateRoute
          path="/add-experience"
          component={AdditionalProfileData}
        />
        <PrivateRoute path="/add-education" component={AdditionalProfileData} />
        <PrivateRoute path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};
