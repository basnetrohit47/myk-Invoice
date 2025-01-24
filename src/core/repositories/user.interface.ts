import { EditProfileParam, LoginParam, RegisterParams } from "../entities/params/user.param";

export default abstract class UserInterface {
    public abstract loginUser(params: LoginParam): Promise<object | undefined>;
    public abstract getProfile(): Promise<object | undefined>;
    public abstract editProfile(params: EditProfileParam): Promise<object | undefined>;
    public abstract registerUser(params: RegisterParams): Promise<object | undefined>;
}