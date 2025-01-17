import { LoginModel, ProfileModel } from "../models/user.model";
import { EditProfileParam, LoginParam } from "../params/user.param";

export default abstract class UserInterface {
    public abstract loginUser(params: LoginParam): Promise<LoginModel | undefined>;
    public abstract getProfile(): Promise<ProfileModel | undefined>;
    public abstract editProfile(params: EditProfileParam): Promise<ProfileModel | undefined>;
}