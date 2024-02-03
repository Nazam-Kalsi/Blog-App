import React, { useState, useEffect } from "react";
import dbservice from "../appWrite/bucketService";
import authservice from "../appWrite/auth";
import { Card, Container } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    authservice.guest(); 
      dbservice.allBlogs().then((data) => {
        // console.log(data);
        setPosts(data.documents);
      })
  }, []);
  if (posts.length > 0) {
    return (
      <Container>
        {posts.map((post) => {
          return (
            <div key={post.$id}>
              <Card {...post} />
            </div>
          );
        })}
      </Container>
    );
  } else {
    return <div>Sign-up or Log-in to see Blogs.</div>;
  }
}
export default Home;
