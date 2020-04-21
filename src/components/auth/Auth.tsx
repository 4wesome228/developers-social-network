import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import { IFormData, connector, PropsFromRedux } from "./types";
import Spinner from "../spinner/Spinner";
import fieldsConfig from "../../utils/fields";

const Auth: React.FC<RouteComponentProps & PropsFromRedux> = (props) => {
  const {
    match: { path },
    thunkSetAlert,
    register,
    loading,
  } = props;

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

    if (password !== repeated_password) {
      thunkSetAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
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
          onChange={handleChange}
        />
      </div>
    );
  };

  const renderFiels = (config, fieldsLength) => {
    return config.map((i) => {
      return renderField(i.type, i.placeholder, i.name);
    });
  };

  const fields = renderFiels(
    currentFieldsConfig,
    Object.keys(currentFieldsConfig).length
  );

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
            Register
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
