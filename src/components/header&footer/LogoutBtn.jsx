import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appWrite/auth";
import { logOut } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let logoutHandler = () => {
    authservice
      .logOut()
      .then(() => {
        dispatch(logOut());
        navigate(' ')
      })
      .catch((error) => {
      console.log(error);
      });
  };
  return <button onClick={logoutHandler}>Logout</button>;
}

export default LogoutBtn;
