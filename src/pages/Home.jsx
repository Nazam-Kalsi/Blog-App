import React, { useState, useEffect } from "react";
import dbservice from "../appWrite/bucketService";
import authservice from "../appWrite/auth";
import { Card, Container } from "../components";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {  
      dbservice.allBlogs().then((data) => {
        setPosts(data.documents);
      })
  }, []);

  if (posts.length > 0) {
    return (
    <>
       <p className="text-2xl font-bold text-center font-serif my-2 pb-2 border-b">BLOGS</p>
      <div className="flex items-start flex-wrap gap-8  justify-center mb-2 basis-2/6">
        {posts.map((post) => {
          return (
            <div key={post.$id}>
              <Card {...post} />
            </div>
          );
        })}
      </div>
      </>
    );
  } else {
    return <div className="text-center text-2xl my-2">Login or sign-up to see the blogs</div>
  }
}
export default Home;
