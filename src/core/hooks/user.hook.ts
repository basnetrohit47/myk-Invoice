import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditProfileParam, LoginParam, RegisterParams } from "../entities/params/user.param";
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
export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (param: RegisterParams) => {
            return await service.registerUser(param)
        }
    })
}

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


export const useEditProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (param: EditProfileParam) => {
            const response = await service.editProfile(param)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile']
            })
        }




    })
}