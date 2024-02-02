import React, { useEffect,useState } from 'react'
import { Container,Card } from '../components'
import dbservice from '../appWrite/bucketService'
function AllPost() {
    const [post, setPost] = useState(null)
    // get all posts on load 
    useEffect(()=>{
        dbservice.allBlogs(post)
        .then((data)=>{
            if(data)setPost(data.documents)})       
    },[])
    if(post){
  return (
    <div>
            <h1 className="mt-5 text-center">Blogs</h1>
        <Container>
            {
                post.map((individualPost)=>{
                    <Card post={individualPost} key={individualPost.$id}/>
                })
            }
        </Container>
    </div>
  )}
  else{return    <p>No post yet</p>
  }
}

export default AllPost