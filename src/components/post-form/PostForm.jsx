import React, { useCallback, useEffect, useState } from "react";

import dbservice from "../../appWrite/bucketService"; //as we send data to appwrite
import { useNavigate } from "react-router-dom"; //
import { useSelector } from "react-redux"; //to validate from store
import { useForm } from "react-hook-form"; //form
import { Button, Input, RTE,Select } from "../index"; //basic components

function PostForm({ post }) {

  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues,formState } =
    useForm({
      defaultValues: {
        Title: post?.Title || "",
        content: post?.Content || "",
        slug: post?.$id || "",
        status: post?.status || "active",
        featuredImage: post?.featuredImage
      },
    });
    let [modal,setModal]=useState('hidden');
    const {errors}=formState;
  const userData = useSelector((state) => state.authreducer.userinfo);
  const submit = async (data) => {
    //came to update

    if (post) {
      setModal('');
      let newImg = data.image[0] ? await dbservice.uploadImg(data.image[0]) : null;
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
      setModal('');
      if (data.image[0]) {
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
      if (name === "Title") {
        setValue("slug", slugTransform(value.Title));
      }
    });
    return () => {
      subscription.unsubscribe(); //memory management
    };
  }, [watch, slugTransform, setValue]);

  
  return (
    <>
    <form onSubmit={handleSubmit(submit)} className="p-8 w-full">
    <div id="modal" className={`absolute  overflow-hidden bg-blur bg-white/80 border border-black z-10 left-[35%] -bottom-[16rem]  w-96  rounded-md  ${modal} `}>
      <div className=" text-end pr-2 border-b bg-white border-black text-black">ooo</div>
  <p className='text-black text-2xl font-serif font-bold text-center h-56 py-20'>Processing...</p>
  <div className="pb-8 bg-white  border-t border-black"></div>

</div> 
      <Input
      className="mb-6"
        label="Title"
        placeholder="Enter Title..."
        {...register("Title", {
          required: {
            value: true,
            message: "Please enter a title",
          },
        })}
      />
      <Input
            className="mb-6"

        label="Slug"
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
      className="mb-6"
        label="Write your Context"
        control={control}
        name="Content"  
        defaultValue={getValues("Content")}
      />
      <Input
      className="mb-6"
        type="file"
        label="Featured Image"
        accept=".jpg,.jpeg,.png,.gif"
        
          //  value='post.featuredImage'
        
        {...register("image", {
          required: {
            value: true,
            message: "insert a image",
          },
        })}
      />
      <p>{errors?.image?.message}</p>
      {/* {post && (
        <img src={dbservice.preview(post.featuredImage)} alt={post.title} />
      )} */}
      <Select    
      className="p-2 rounded-md mb-4"  
        label="status"
        options={["active", "inactive"]}
        {...register("status", {
          required: {
            value: true,
            message: "select a status",
          },
        })}
      />
      <p>{errors.status?.message}</p>
      <Button type="submit">{post ? "Update" : "Submit"}</Button>
      {errors && <p className="text-red-200">{errors.content}</p>}
   
    </form>
    </>

  );
}

export default PostForm;
