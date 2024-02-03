import React, { useEffect, useState } from "react";
import { Container, Card } from "../components";
import dbservice from "../appWrite/bucketService";
import { useSelector } from "react-redux";
function AllPost() {
  const [post, setPost] = useState([]);
  // get all posts on load
  useEffect(() => {
    dbservice.allBlogs().then((data) => {
      if (data) setPost(data.documents);
    });
  }, []);
  //   console.log(post);
  const user = useSelector((state) => {
    return state.authreducer.userinfo;
  });

  return (
    <>
      <div>
        <h1 className="mt-5 text-center">My Blogs</h1>
        <Container>
          {post.map((individualPost) =>
            individualPost.userID == user.$id ? (
              <Card {...individualPost} key={individualPost.$id} />
            ) : null
          )}
        </Container>
      </div>


      {/* <p>Create your new Blog</p> */}
    </>
  );
}

export default AllPost;
