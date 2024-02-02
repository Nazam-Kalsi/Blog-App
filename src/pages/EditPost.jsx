import React, { useState , useEffect } from 'react'
import dbservice from '../appWrite/bucketService'
import { useNavigate , useParams } from "react-router";
import { PostForm } from '../components';
function EditPost() {
    const [ post, setPost ] = useState(null)//we use null or empty array ' [] '
    const { slug }=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            dbservice.getBlog(slug).then((data)=>{
                setPost(data)
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])//why navigate
  return post ? <div>
    <PostForm post={post}/>

  </div> : null
}

export default EditPost