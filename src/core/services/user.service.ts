import UserDataSource from "@/core/api/user.api";
import { EditProfileParam, LoginParam } from "../params/user.param";
import { LoginModel, ProfileModel } from "../models/user.model";
import UserInterface from "../repositories/user.interface";

export default class UserService {
  private static _instance: UserService;
  public static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }
    return UserService._instance;
  }

  private constructor(
    private datasource: UserInterface = new UserDataSource(),
  ) { }





  public loginUser(params: LoginParam): Promise<LoginModel | undefined> {
    return this.datasource.loginUser(params)
  }
  public editProfile(params: EditProfileParam): Promise<ProfileModel | undefined> {
    return this.datasource.editProfile(params)
  }
  public getProfile(): Promise<ProfileModel | undefined> {
    console.log("called")
    const data = this.datasource.getProfile()
    console.log("ddasdfasdf", data)
    return data
  }
}