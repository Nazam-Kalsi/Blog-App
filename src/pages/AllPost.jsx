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
      <div className="m-4">
        <h1 className="m-5 text-center font-bold text-2xl">My Blogs</h1>
        <div className="flex basis-2/3 flex-wrap gap-8 justify-center">

          {post.map((individualPost) =>
            individualPost.userID == user.$id ? (
              <Card {...individualPost} key={individualPost.$id} />
              ) : null
              )}
              </div>
      </div>


      {/* <p>Create your new Blog</p> */}
    </>
  );
}

export default AllPost;
