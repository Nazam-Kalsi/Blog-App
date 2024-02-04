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
  return <button className="px-4 py-1 rounded-md hover:bg-red-600 font-bold hover:shadow-none   shadow-[1px_2px_0_rgba(14,24,12,0.8)]" onClick={logoutHandler}>Logout</button>;
}

export default LogoutBtn;
