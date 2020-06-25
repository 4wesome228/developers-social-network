import React from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";

import { IFormData, connector, PropsFromRedux } from "./types";
import Spinner from "../spinner/Spinner";
import fieldsConfig from "../../utils/auth-fields";

const Auth: React.FC<RouteComponentProps & PropsFromRedux> = ({
  match: { path },
  thunkSetAlert,
  register,
  loading,
  isAuth,
  login,
}) => {
  const isLogin = path === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const subTitle = isLogin ? "Sign into your account" : "Create an account";
  const subtitleText = isLogin
    ? "Need an account?"
    : "Already have an account?";
  const subTitleLink = isLogin ? "/register" : "/login";
  const currentFieldsConfig = isLogin
    ? [fieldsConfig.email, fieldsConfig.password]
    : Object.values(fieldsConfig);

  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    email: "",
    password: "",
    repeated_password: "",
  });

  const { name, email, password, repeated_password }: IFormData = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== repeated_password && !isLogin) {
      thunkSetAlert("Passwords do not match", "danger");
    } else {
      /*else if (Object.keys(formData).some((k) => formData[k] == "")) {
      for (let key in formData) {
        if (formData[key] === "") {
          thunkSetAlert(`${key} can't be empty`, "danger");
        }
      }
    }*/
      !isLogin
        ? register({ name, email, password })
        : login({ email, password });
    }
  };

  const renderField = (
    type: string,
    placeholder: string,
    name: string,
    label: string
  ) => {
    return (
      <div className="form-group" key={name}>
        <label className="form-label" htmlFor={`${name}-input`}>
          {label}:
        </label>
        <input
          id={`${name}-input`}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          required
        />
      </div>
    );
  };

  const renderFiels = (config) => {
    return config.map((i) =>
      renderField(i.type, i.placeholder, i.name, i.label)
    );
  };

  const fields = renderFiels(currentFieldsConfig);

  if (isAuth) return <Redirect to="/dashboard" />;

  return (
    <>
      <h1 className="large text-primary">{pageTitle}</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {subTitle}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        {fields}
        {!loading ? (
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        ) : (
          <Spinner />
        )}
      </form>
      <p className="my-1">
        {subtitleText}{" "}
        <Link to={subTitleLink}>{isLogin ? "Sign up" : "Sign in"}</Link>
      </p>
    </>
  );
};

export default connector(Auth);
