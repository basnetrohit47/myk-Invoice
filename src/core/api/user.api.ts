import { LoginModel, LoginSchema, Profilechema, ProfileModel } from "@/core/models/user.model";
import { apiClient } from "./apiClient"
import { EditProfileParam, LoginParam } from "@/core/params/user.param"
import UserInterface from "../repositories/user.interface";
import { API_ENDPOINTS } from "./apiEndpoints";


export default class UserDataSource extends UserInterface {

    public async loginUser(params: LoginParam): Promise<LoginModel | undefined> {
        const response = await apiClient({ url: API_ENDPOINTS.PROFILE.LOGIN, method: "POST", data: params });
        if (!response) {
            return undefined;
        }
        const responseParse = LoginSchema.parse(response);
        localStorage.setItem("token", responseParse.access);
        return responseParse



    }

    public async getProfile(): Promise<ProfileModel | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.PROFILE.GET_PROFILE, });
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
            const data = await apiClient({ url: API_ENDPOINTS.PROFILE.EDIT_PROFILE, method: "PUT", data: params });
            if (!data) {
                return undefined
            }
            const res = Profilechema.parse(data);
            return res;

        }
        catch (error) {
            console.error("error", error)
        }

    }

}
