import { useQuery } from "@tanstack/react-query"
import UserService from "../services/user.service"
const service = UserService.getInstance()
export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return service.getProfile()
        }
    })
}