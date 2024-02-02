import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import dbservice from "../appWrite/bucketService";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import authservice from "../appWrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  let [error, setError] = useState("");

  const loginFxn = async (data) => {
    setError("");
    try {
      let session = await authservice.login(data);
      if (session) {
        let user = await authservice.currentUser();
        console.log(user);
        if (user) dispatch(storeLogin(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="">
      <div>logo</div>
      <h2>Sign-In</h2>

      <form onSubmit={handleSubmit(loginFxn)} className="">
        <div className="space-y-5">
          <Input
            label="E-mail"
            placeholder="Enter your E-mail"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value) ||
                  "Not a valid Email",
              },
            })}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit">Log in</Button>
        </div>
      </form>
      <p>
        Don't have a account
        <Link className="" to="/signUp">
          Sign-Up
        </Link>
      </p>
      {error && <p className="text-red-200">{error}</p>}
    </div>
  );
}

export default Login;
