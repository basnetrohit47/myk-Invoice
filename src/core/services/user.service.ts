import UserDataSource from "@/core/api/user.api";
import { EditProfileParam, LoginParam, RegisterParams } from "../entities/params/user.param";
import { LoginModel, LoginSchema, Profilechema, ProfileModel, RegisterModel, RegisterResponseSchema } from "../entities/models/user.model";
import UserInterface from "../repositories/user.interface";
import { serializedProfileResponse } from "../serializers/user.serializer";
import { z } from "zod";
import { InputParseError } from "../entities/errors/common";
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


  private parseWithCustomError<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    schemaName: string
  ): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(`${schemaName} validation failed`, result.error.errors);
      throw new InputParseError(`${schemaName} validation error`);
    }
    return result.data;
  }




  public async registerUser(params: RegisterParams): Promise<RegisterModel | undefined> {
    const response = await this.datasource.registerUser(params);
    return this.parseWithCustomError(RegisterResponseSchema, response, "RegisterResponseSchema")




  }

  public async loginUser(params: LoginParam): Promise<LoginModel | undefined> {
    const response = await this.datasource.loginUser(params)
    return this.parseWithCustomError(LoginSchema, response, "LoginSchema")


  }
  public async editProfile(params: EditProfileParam): Promise<ProfileModel | undefined> {
    const response = await this.datasource.editProfile(params)
    return this.parseWithCustomError(Profilechema, response, "ProfileSchema")



  }
  public async getProfile(): Promise<ProfileModel | undefined> {
    const respnose = await this.datasource.getProfile();
    const serializedData = serializedProfileResponse(respnose)
    return this.parseWithCustomError(Profilechema, serializedData, "ProfileSchema")


  }
}