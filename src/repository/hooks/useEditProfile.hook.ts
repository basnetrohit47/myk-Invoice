import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../services/user.service";
import { EditProfileParam } from "../params/user.param";

const service = UserService.getInstance()

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