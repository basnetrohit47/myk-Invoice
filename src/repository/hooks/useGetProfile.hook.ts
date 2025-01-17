import { useQuery } from "@tanstack/react-query"
import UserService from "../services/user.service"
const service = UserService.getInstance()
export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const result = service.getProfile()
            if (!result) {
                throw new Error("Failed to fetch invoice list: Received undefined response.");

            }
            return result;
        }
    })
}