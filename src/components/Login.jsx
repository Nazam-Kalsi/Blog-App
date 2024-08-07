import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import dbservice from "../appWrite/bucketService";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import authservice from "../appWrite/auth";

function Login() {
  let [modal,setModal]=useState('hidden');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit ,formState} = useForm();
  const {errors}=formState;
  let [error, setError] = useState("");

  const loginFxn = async (data) => {
    setError("");
    setModal('');
    try {
      let session = await authservice.login(data);
      if (session) {
        let user = await authservice.currentUser();
        if (user) dispatch(storeLogin(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setModal('hidden');
    }
  };

  return (<>
      <div id="modal" className={`absolute  overflow-hidden bg-blur bg-white/80 border border-black z-10 left-[35%] top-[20%]  w-96  rounded-md  ${modal} `}>
      <div className=" text-end pr-2 border-b bg-white border-black text-black">ooo</div>
  <p className='text-black text-2xl font-serif font-bold text-center h-56 py-20'>Processing...</p>
  <div className="pb-8 bg-white  border-t border-black"></div>
</div> 
    <div className="px-4 py-12 rounded-2xl sm:w-2/5  bg-black/30">
      <h2 className="text-center text-2xl font-bold">Log in to your account</h2>

      <form onSubmit={handleSubmit(loginFxn)} className="">
        <div className="space-y-5">
          <Input
            label="Your email"
            placeholder="name@company.com"
            type="email"
            {...register("email", {
              required: {
                value:true,
                message:"it is required field"
              },
              validate: {
                matchPattern: (value) =>{
                  return(                    
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value)||
                    "Not a valid Email"
                    )
                  }
                },
              })}
          />
          <p className="">{errors.email?.message}</p>
          <Input
          className='mb-4'
            type="password"
            label="Password"
            placeholder="********"
            {...register("password", {
              required: true,
            })}
            />


          <Button type="submit">Log in</Button>
          
        </div>
      </form>
      <p className="mt-2">
      Don’t have an account yet?  <Link className=" text-blue-500" to="/signUp">Sign-Up
        </Link>
      </p>
      {error && <p className="text-red-200">{error}</p>}
    </div>
            </>
  );
}

export default Login;
