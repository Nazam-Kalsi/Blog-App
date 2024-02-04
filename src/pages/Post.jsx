import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import dbservice from "../appWrite/bucketService";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.authreducer.userinfo);

 
    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            dbservice.getBlog(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        dbservice.deleteImg(post.$id)
        dbservice.deleteBlog(post.$id).then((status) => {
            if (status) {
                dbservice.deleteImg(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
                <div className="flex justify-center w-full p-2 mb-4 pb-8 border-b">
                    <img
                        src={dbservice.preview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-118 space-y-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgcolor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl text-center border-b pb-6 font-bold">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.Content)}
                    </div>
        </div>
    ) : null;
}