import React, { useState, useEffect } from "react";
import dbservice from "../appWrite/bucketService";
import authservice from "../appWrite/auth";
import { Card, Container } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    authservice.guest(); 
      dbservice.allBlogs().then((data) => {
        setPosts(data.documents);
      })
  }, []);
  if (posts.length > 0) {
    return (<>
    
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
    return <div>Sign-up or Log-in to see Blogs.</div>;
  }
}
export default Home;
