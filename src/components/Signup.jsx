import React, { useState } from "react";
import dbservices from "../appWrite/bucketService";
import { useForm } from "react-hook-form";
import authservice from "../appWrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Signup() {
  //register user
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  let { errors } = formState;

  let registerUser = async (data) => {
    setServerError("");

    try {
      let userData = await authservice.createAccount(data);
      if (userData) {
        let user = await authservice.currentUser();
        if (user) {
          dispatch(storeLogin(user));
          navigate("/");
        }
      }
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="">
      <div>logo</div>
      <h2>Sign-Up</h2>

      <form onSubmit={handleSubmit(registerUser)}>
        <div className="space-y-5">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your User Name"
            {...register("name", {
              require: true,
            })}
          />

          <Input
            label="E-mail"
            placeholder="Enter your E-mail"
            type="email"
            {...register("email", {
              required: true,
              // validate: {
              //   matchPattern: (value) =>
              //     /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value) ||
              //     "Not a valid Email",
              // },
            })}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              maxLength: 8,
              validate:{                
                matchPattern: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) ||
                "should Contain 8 letters including capital letter and numbers",
              }
            })}
          />
          <p>{errors.password?.message}</p>

          <Button type="submit">Sign-Up</Button>
        </div>
      </form>
      <p>
        Already have a account
        <Link className="" to="/Login">
          Log-In
        </Link>
      </p>
      {serverError && <p className="text-red-200">{serverError}</p>}
    </div>
  );
}

export default Signup;
