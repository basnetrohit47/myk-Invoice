import { apiClient } from "./apiClient"
import { EditProfileParam, LoginParam, RegisterParams } from "@/core/entities/params/user.param"
import UserInterface from "../repositories/user.interface";
import { API_ENDPOINTS } from "./apiEndpoints";


export default class UserDataSource extends UserInterface {

    public async loginUser(params: LoginParam): Promise<object | undefined> {
        const response = await apiClient({ url: API_ENDPOINTS.PROFILE.LOGIN, method: "POST", data: params });
        if (!response) {
            throw new Error('No data received from the server.');
        }
        return response



    }
    public async registerUser(params: RegisterParams): Promise<object | undefined> {

        try {
            const response = await apiClient({ url: API_ENDPOINTS.PROFILE.REGISTER, method: "POST", data: params });
            if (!response) {
                throw new Error('No data received from the server.');
            }
            return response
        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }

    public async getProfile(): Promise<object | undefined> {
        try {
            const response = await apiClient({ url: API_ENDPOINTS.PROFILE.GET_PROFILE, });
            if (!response) {
                throw new Error('No data received from the server.');
            }
            return response

        }
        catch (error) {
            console.error("error", error)
        }


    }
    public async editProfile(params: EditProfileParam): Promise<object | undefined> {
        try {
            const response = await apiClient({ url: API_ENDPOINTS.PROFILE.EDIT_PROFILE, method: "PUT", data: params });
            if (!response) {
                throw new Error('No data received from the server.');
            }
            return response

        }
        catch (error) {
            console.error("error", error)
        }

    }

}
