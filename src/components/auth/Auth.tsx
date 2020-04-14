import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { IFormData, connector, PropsFromRedux } from "./types";

const Auth: React.FC<RouteComponentProps & PropsFromRedux> = (props) => {
  const {
    match: { path },
    setAlert,
  } = props;

  const isLogin = path === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const subTitle = isLogin ? "Sign into your account" : "Create an account";
  const subTitleText = isLogin
    ? "Need an account?"
    : "Already have an account?";
  const subTitleLink = isLogin ? "/register" : "/login";
  //const apiUrl = isLogin ? "/users/login" : "/users";

  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    email: "",
    password: "",
    repeated_password: "",
  });

  const { password, repeated_password }: IFormData = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== repeated_password) {
      setAlert("Passwords do not match", "danger");
    } else {
      console.log(formData);
    }
  };

  const renderField = (
    type: string,
    placeholder: string,
    name: string
  ): React.ReactNode => {
    return (
      <div className="form-group">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          required
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <>
      <h1 className="large text-primary">{pageTitle}</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {subTitle}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        {!isLogin && renderField("text", "Name", "name")}
        {renderField("email", "Email Address", "email")}
        {renderField("password", "Password", "password")}
        {!isLogin &&
          renderField("password", "Confirm Password", "repeated_password")}
        <input type="submit" className="btn btn-primary" />
      </form>
      <p className="my-1">
        {subTitleText}{" "}
        <Link to={subTitleLink}>{isLogin ? "Sign up" : "Sign in"}</Link>
      </p>
    </>
  );
};

export default connector(Auth);
