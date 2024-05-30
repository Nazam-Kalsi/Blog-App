import React, { useState } from "react";
import dbservices from "../appWrite/bucketService";
import { useForm } from "react-hook-form";
import authservice from "../appWrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Signup() {
  const [modal, setModal] = useState("");
  //register user
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  let { errors } = formState;

  let registerUser = async (data) => {
    setModal("");
    setServerError("");
    try {
      let userData = await authservice.createAccount(data);
      if (userData) {
        console.log(userData);
        let user = await authservice.currentUser();
        if (user) {
          dispatch(storeLogin(user));
          navigate("/");
        }
      }
    } catch (error) {
      setModal("hidden");
      setServerError(error.message);
    }
  };

  return (<>
    <div id="modal" className={`absolute  overflow-hidden bg-blur bg-white/80 border border-black z-10 left-[35%] top-[20%]  w-96  rounded-md  ${modal} `}>
      <div className=" text-end pr-2 border-b bg-white border-black text-black">ooo</div>
  <p className='text-black text-2xl font-serif font-bold text-center h-56 py-20'>Processing...</p>
  <div className="pb-8 bg-white  border-t border-black"></div>
</div> 
    <div className="rounded-2xl my-28 px-4 py-12 sm:w-2/5 m-auto bg-black/30">
      <h2 className="text-center text-2xl font-bold">Sign-Up</h2>

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
      <p className="mt-2">Already have a account  <Link className="text-blue-500" to="/Login">Log-In</Link></p>
      {serverError && <p className="text-red-200">{serverError}</p>}
    </div>
  </>
  );
}

export default Signup;
