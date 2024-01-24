import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appWrite/auth";
import { logOut } from "../../store/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  let logoutHandler = () => {
    authservice.logOut().then((data) => {
      if (data.error) {
        alert("Log out failed");//custom modal can be inserted
      } else {
        //dispatch the action to update state in Redux store
        dispatch(logOut());
      }
    });
  };
  return <button onClick={logoutHandler}>Logout</button>;
}

export default LogoutBtn;
