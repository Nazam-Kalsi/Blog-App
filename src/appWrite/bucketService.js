import config from "../ConfigEnv/Config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class dbService {
  client = new Client();
  databases;
  Storage;

  constructor() {
    this.client.setEndpoint(config.appWriteID).setProject(config.projectID);
    this.databases = new Databases(this.client);
    this.Storage = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      const items = await this.databases.createDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          title,
          content,
          status,
          userID,
          featuredImage,
        }
      );
      return items;
    } catch (error) {
        throw new Error("could not create the blog");
    }
  }

  async updateBlog(slug, { title, featuredImage, content, status }) {
    try {
      let updatedBlog = await this.databases.updateDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
      return updatedBlog;
    } catch (error) {
      throw new Error("could not update the blog");
    }
  }

  async deleteBlog(slug){
    try{

        let deleteBlog =await this.databases.deleteDocument(config.databaseID,config.collectionID,slug);
        return deleteBlog;
    }
    catch{
        throw new Error("Could not delete the blog");
    }
  }

  async getBlog(slug){
    try{

        let singleBlog =await this.databases.getDocument(config.databaseID,config.collectionID,slug);
        return singleBlog;
    }
    catch{
        throw new Error("Could not parse the blog");
    }
  }

  async allBlogs(que=Query.select(['status','active'])){
    try{

        let allBlogs=this.databases.listDocuments(config.databaseID,config.collectionID,que)
        return allBlogs;
    }
    catch{
        throw new Error("could not get all blogs.Try again!")
    }
  }


  async uploadImg(file){
    try {
        return await this.Storage.createFile(config.bucketID,ID.unique(),file)
        
    } catch (error) {
        throw new Error("could not upload file.Try again!")

    }
  }

  async deleteImg(fileID){
    try {
        await this.Storage.deleteFile(config.bucketID,fileID)
        return true
    } catch (error) {
        throw new Error("could not delete file.Try again!")
        return false            
    }

  }

   preview(fileID){
    try {
        return this.Storage.getFilePreview(config.bucketID,fileID)
    } catch (error) {
        
    }
  }

}

const dbservice = new dbService();
export default dbservice;
