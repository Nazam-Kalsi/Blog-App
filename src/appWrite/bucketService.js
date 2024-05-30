import config from "../ConfigEnv/Config";
import { Client, ID, Databases, Storage, Query,Permission,Role } from "appwrite";

export class dbServices {
  client = new Client();
  databases;
  Storage;
// We use Slug as Document ID
  constructor() {
    this.client.setEndpoint(config.appWriteID).setProject(config.projectID);
    this.databases = new Databases(this.client);
    this.Storage = new Storage(this.client);
  }
  async createPost({ Title, slug, Content, featuredImage, status, userID }) {
    try {
      const post = await this.databases.createDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          Title,
          Content,
          status,
          userID,
          featuredImage,
        },[
          Permission.read(Role.users())
          // Permission.read(Role.guests())
      ]
      );
      return post;
    } catch (error) {
        throw new Error("could not create the blog"+error.message);
    }
  }

  async updateBlog(slug, { Title, featuredImage, Content, status }) {
    try {
      let updatedBlog = await this.databases.updateDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          Title,
          Content,
          status,
          featuredImage,
        }
      );
      return updatedBlog;
    } catch (error) {
      throw new Error("could not update the blog"+error.message);
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
    catch(error){
        throw new Error("Could not parse the blog",error.message);
    }
  }

  // async allBlogs(que=Query.select(['status','active'])){
  async allBlogs(){
  try{
        let allBlogs=await this.databases.listDocuments(config.databaseID,config.collectionID)
        console.log(allBlogs);
        return allBlogs;
    }
    catch(error){
        throw new Error("could not get all blogs.Try again!"+error.message)
    }
  }


//storage

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
      return false            
        // throw new Error("could not delete file.Try again!")
      }
      
    }

   preview(fileID){
    try {
        return this.Storage.getFilePreview(config.bucketID,fileID)
    } catch (error) {
        
    }
  }

}

const dbservice = new dbServices();
export default dbservice;
