import React from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { logout } from "../../store/actions/auth";
import { clearProfile } from "../../store/actions/profile";

const Navbar: React.FC<Props> = ({ loading, isAuth, logout, clearProfile }) => {
  const path = isAuth ? "/dashboard" : "/";

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user">&#160;</i>
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            logout();
            clearProfile();
          }}
          to="/"
        >
          <i className="fas fa-sign-out-alt">&#160;</i>
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
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
        <Link to={path}>
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
  clearProfile,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(Navbar);
