import { useMutation } from "@tanstack/react-query";
import { LoginParam } from "../params/user.param";
import UserService from "../services/user.service";

const service = UserService.getInstance();

export const useLoginUser = () => {
    return useMutation({
        mutationFn: async (param: LoginParam) => {
            const response = await service.loginUser(param)
            return response
        },




    })
}