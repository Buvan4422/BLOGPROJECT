import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
function AuthorProfile() {
  return (
    <div>
      <ul className="nav justify-content-around p-3 mt-5">
        <li className="nav-item">
          <NavLink className="nav-link text-warning" to="add-article">
            Add Article
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-warning" to="article-of-author">
            Articles of author
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
