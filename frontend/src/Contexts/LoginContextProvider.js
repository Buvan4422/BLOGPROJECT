import axios from 'axios';
import { createContext, useState } from 'react';

//create context obj
export const loginContext = createContext();

function LoginProvider({ children }) {
  let [currentUserDetails, setCurrentUserDetails] = useState({
    userLoginStatus: false,
    currentUser: {},
    err: '',
  });

  async function loginUser(credObj) {
    if (credObj.role === 'user') {
      let res = await axios.post(
        'http://localhost:4000/user-api/login',
        credObj
      );

      console.log(res);
      if (res.data.message === 'Login Successful') {
        //navigate to user profile
        //console.log('user logged in');
        sessionStorage.setItem('token', res.data.token);
        setCurrentUserDetails({
          ...currentUserDetails,
          currentUser: res.data.user,
          userLoginStatus: true,
        });
      } else {
        setCurrentUserDetails({
          ...currentUserDetails,
          err: res.data.message,
          userLoginStatus: false,
          currentUser: {},
        });
      }
    }
    if (credObj.role === 'author') {
      let res = await axios.post(
        'http://localhost:4000/author-api/login',
        credObj
      );

      console.log(res);
      if (res.data.message === 'Login Successful') {
        //navigate to user profile
        //console.log('Author logged in');
        sessionStorage.setItem('token', res.data.token);
        setCurrentUserDetails({
          ...currentUserDetails,
          currentUser: res.data.author,
          userLoginStatus: true,
        });
      } else {
        setCurrentUserDetails({
          ...currentUserDetails,
          err: res.data.message,
          userLoginStatus: false,
          currentUser: {},
        });
      }
    }
  }

  return (
    <loginContext.Provider
      value={{ currentUserDetails, setCurrentUserDetails, loginUser }}
    >
      {children}
    </loginContext.Provider>
  );
}

export default LoginProvider;
