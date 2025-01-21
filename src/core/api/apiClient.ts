import { getAccessToken } from "@/utils/getAccessToken";
import axios, { AxiosRequestConfig } from "axios";



const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.getjuny.com";


interface ApiConfig extends AxiosRequestConfig {
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export const apiClient = async<T>({ url, method = "GET", data = null, params = null, headers = {} }: ApiConfig): Promise<T> => {

    const token = await getAccessToken();


    console.log("tokda", token)

    try {
        const response = await axios({
            url: `${API_BASE_URL}${url}`,
            method,
            params,
            data,
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '', // Add Authorization header
            }
        })

        return response.data

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error('Network Error');
    }

}


