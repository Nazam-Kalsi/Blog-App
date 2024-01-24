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
        return this.login(email, password);
      } else {
        return accountCreation;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      let user = await this.account.createEmailSession(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }


  async currentUser(){
    try {
        const currentUser=await this.account.get();
        console.log(currentUser);
        return currentUser; 
    } catch (error) {
        // console.log('error', error) ;
    }
  }
  async logOut(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
  }
}

const authservice = new authService();
export default authservice;
