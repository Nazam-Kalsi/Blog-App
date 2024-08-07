import { Client, Account, ID } from "appwrite";
import config from "../ConfigEnv/Config";

export class authService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.appWriteID).setProject(config.projectID);
    this.account = new Account(this.client);
  }
  
  async createAccount({ email, password, name }) {
    try {
      let accountCreation = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (accountCreation) {
        console.log("userAccount : ", accountCreation);
        // calllogin
        return this.login({email, password});
      } else {
        return accountCreation;
      }
    } catch (error) {
      throw new Error("Failed to create user : " + error.message);
    }
  }

  async login({ email, password }) {
    try {
      let user = await this.account.createEmailSession(email, password);
      return user;
    } catch (error) {
      throw new Error("Failed to login user : " + error.message);
    }
  }

  async currentUser(){
    try {
        const currentUser=await this.account.get();
        return currentUser; 
    } catch (error) {
      throw new Error("Failed to fetch current user: " + error.message);
    }
  }
  
  async logOut(){
    try {
       return await this.account.deleteSession('current');
    } catch (error) {
        throw error;
    }
  }

  //this function is not in use.
  // async guest(){    
  //   try {
  //     let  isGuest = await this.account.createAnonymousSession();
  //     console.log("is Guest : ",isGuest);
  //     return isGuest;
      
  //   } catch (error) {
  //     throw new Error(error);
      
  //   }}
  }
const authservice = new authService();
export default authservice;
