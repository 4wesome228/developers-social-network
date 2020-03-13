import * as React from "react";

import { IFormData } from "./types";

const Register: React.FC = () => {
  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    email: "",
    password: "",
    repeated_password: ""
  });

  const renderField = (
    type: string,
    placeholder: string,
    name: string,
    isRequired: boolean
  ): React.ReactNode => {
    return (
      <div className="form-group">
        {isRequired ? (
          <input type={type} placeholder={placeholder} name={name} required />
        ) : (
          <input type={type} placeholder={placeholder} name={name} />
        )}
      </div>
    );
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html">
        {renderField("text", "Name", "name", true)}
        {renderField("email", "Email Address", "email", false)}
        {renderField("password", "Password", "password", false)}
        {renderField(
          "password",
          "Confirm Password",
          "repeated_password",
          false
        )}
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
