import React from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { logout } from "../../store/actions/auth";

const Navbar: React.FC<Props> = (props) => {
  const { loading, isAuth, logout } = props;
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="#">
          <i className="fas fa-sign-out-alt"> </i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/Developers">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <>{isAuth ? authLinks : guestLinks}</>}
    </nav>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = {
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(Navbar);
