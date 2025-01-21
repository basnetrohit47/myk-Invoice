import UserDataSource from "@/core/api/user.api";
import { EditProfileParam, LoginParam, RegisterParams } from "../params/user.param";
import { LoginModel, LoginSchema, Profilechema, ProfileModel, RegisterModel, RegisterResponseSchema } from "../models/user.model";
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




  public async registerUser(params: RegisterParams): Promise<RegisterModel | undefined> {
    const response = await this.datasource.registerUser(params);
    return RegisterResponseSchema.parse(response);

  }

  public async loginUser(params: LoginParam): Promise<LoginModel | undefined> {
    const response = await this.datasource.loginUser(params)
    const responseParse = LoginSchema.parse(response);
    localStorage.setItem("token", responseParse.access);
    return responseParse

  }
  public async editProfile(params: EditProfileParam): Promise<ProfileModel | undefined> {
    const response = await this.datasource.editProfile(params)
    return Profilechema.parse(response);

  }
  public async getProfile(): Promise<ProfileModel | undefined> {

    const respnose = await this.datasource.getProfile();
    return Profilechema.parse(respnose);

  }
}