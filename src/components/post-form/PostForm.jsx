import React, { useCallback, useEffect } from "react";

import dbservice from "../../appWrite/bucketService"; //as we send data to appwrite
import { useNavigate } from "react-router-dom"; //
import { useSelector } from "react-redux"; //to validate from store

import { useForm } from "react-hook-form"; //form
import { Button, Input, RTE,Select } from "../index"; //basic components

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });
  const userData = useSelector((state) => state.authreducer.userinfo);

  const submit = async (data) => {
    //came to update

    if (post) {
      let newImg = data.image[0] ? dbservice.uploadImg(data.image[0]) : null;
      if (newImg) {
        dbservice.deleteImg(post.featuredImage);
      }
      let update = await dbservice.updateBlog(post.$id, {
        ...data,
        featuredImage: newImg ? newImg.$id : undefined,
      });
      if (update) {
        navigate(`/post/${update.$id}`);
      }
    } else {
      if (post.image[0]) {
        const file = await dbservice.uploadImg(data.image[0]);
        if (file) {
          let fileId = file.$id;
          data.featuredImage = fileId;
          let newPost = await dbservice.createPost({
            ...data,
            userID: userData.$id,
          });
          if (newPost) {
            navigate(`/post/${newPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .normalize("NFKD") // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => {
      subscription.unsubscribe(); //memory management
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        lable="Title : "
        placeholder="Enter Title..."
        {...register("title", {
          required: {
            value: true,
            message: "Please enter a title",
          },
        })}
      />
      <Input
        lable="Slug"
        {...register("slug", {
          required: {
            value: true,
            message: "Please enter a title",
          },
        })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value));
        }}
      />
      <RTE
        label="Write your Context here..."
        control={control}
        name="context"
        defaultValue={getValues("content")}
      />
      <Input
        type="file"
        label="Featured Image"
        {...register("image", {
          required: {
            value: true,
            message: "insert a image",
          },
        })}
      />
      {post && (
        <img src={dbservice.preview(post.featuredImage)} alt={post.title} />
      )}
      <Select
        label="status"
        options={["active", "inactive"]}
        {...register("status", {
          required: {
            value: true,
            message: "select a status",
          },
        })}
      />
      <Button type="submit">{post ? "Update" : "Submit"}</Button>
    </form>
  );
}

export default PostForm;
