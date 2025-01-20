import { LoginModel, LoginSchema, Profilechema, ProfileModel } from "@/core/models/user.model";
import { apiClient } from "./apiClient"
import { EditProfileParam, LoginParam } from "@/core/params/user.param"
import UserInterface from "../repositories/user.interface";


export default class UserDataSource extends UserInterface {

    public async loginUser(params: LoginParam): Promise<LoginModel | undefined> {
        const response = await apiClient({ url: "/login", method: "POST", data: params });
        if (!response) {
            return undefined;
        }
        const responseParse = LoginSchema.parse(response);
        localStorage.setItem("token", responseParse.access);
        return responseParse



    }

    public async getProfile(): Promise<ProfileModel | undefined> {
        try {
            const data = await apiClient({ url: "/profile", });
            console.log("data", data);
            if (!data) {
                return undefined
            }
            const res = Profilechema.parse(data);
            console.log("Passs")
            return res;

        }
        catch (error) {
            console.error("error", error)
        }


    }
    public async editProfile(params: EditProfileParam): Promise<ProfileModel | undefined> {
        try {
            const data = await apiClient({ url: "/profile", method: "PUT", data: params });
            console.log("data", data);
            if (!data) {
                return undefined
            }
            const res = Profilechema.parse(data);
            console.log("Passs")
            return res;

        }
        catch (error) {
            console.error("error", error)
        }

    }

}
