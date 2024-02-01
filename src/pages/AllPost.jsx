import React, { useEffect } from 'react'
import { Container,Card } from '../components'
import dbservice from '../appWrite/bucketService'
function AllPost() {
    const [post, setPost] = useState([])
    // get all posts on load 
    useEffect(()=>{
        dbservice.allBlogs(post)
        .then((data)=>{setPost(data.documents)})
        
    },[])
    
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
  )
}

export default AllPost