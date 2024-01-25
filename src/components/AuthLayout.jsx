//protected container for routing

import React,{useEffect,useState} from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function protection(
    {
        children,
        authentication=true
    }
) {
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authStatus=useSelector(state=>state.authreducer.status)

    useEffect(()=>{
        // if (authStatus) {
        //     navigate('/')
        // }
        // else{
        //     navigate('/login')
        // }

        if(authentication && authStatus != authentication)
        {
            navigate('/login')
        }
        else if(!authentication && authStatus !=authentication)
        {
            navigate('/')
        }

        setLoader(false);
    },[authStatus,navigate,authentication])
  return (
    loader ?<div>loading... </div> :{children}
  )
}

export default protection