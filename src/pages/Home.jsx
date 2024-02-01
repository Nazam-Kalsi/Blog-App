import React, { useState, useEffect } from "react";
import dbservice from "../appWrite/bucketService";
import { Card, Container } from "../components";

function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    dbservice.allBlogs().then((data) => {
      setPosts(data.documents);
    });
  });
  if (posts.length > 0) {
    return (
      <Container>
        {posts.map((post) => {
          <div key={post.$id}>
            <Card post={post} />
          </div>;
        })}
      </Container>
    );
  } else {
    return <div>No post yet. Be the First To post.</div>;
  }
}
export default Home;
