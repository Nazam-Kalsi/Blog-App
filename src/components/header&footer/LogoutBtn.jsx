import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appWrite/auth";
import { logOut } from "../../store/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  let logoutHandler = () => {
    authservice
      .logOut()
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
      console.log(error);
      });
  };
  return <button onClick={logoutHandler}>Logout</button>;
}

export default LogoutBtn;
