import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { loginContext } from '../../Contexts/LoginContextProvider';
function Header() {
  const { currentUserDetails, setCurrentUserDetails } =
    useContext(loginContext);

  function userLogout() {
    sessionStorage.removeItem('token');
    setCurrentUserDetails({
      userLoginStatus: false,
      currentUser: {},
      err: '',
    });
  }
  return (
    <div>
      <ul className="nav bg-dark justify-content-end p-3">
        {currentUserDetails.userLoginStatus !== true ? (
          <span>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="signin">
                Signin
              </NavLink>
            </li>
          </span>
        ) : (
          <li className="nav-item">
            <NavLink
              className="nav-link text-light"
              to="signin"
              onClick={userLogout}
            >
              <span className="me-4">
                Welcome, {currentUserDetails.currentUser.username}
              </span>
              Signout
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
