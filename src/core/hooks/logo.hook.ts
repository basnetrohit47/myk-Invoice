import { getStoreValue, removeStoreValue, setStoreValue } from "@/utils/localStorageUtil"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetLogo = () => {
    return useQuery({
        queryFn: () => {
            return getStoreValue<string>("logo") || null
        },
        queryKey: ["logo"]
    })
}

export const useSetLogo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (logo: string | null) => {
            await setStoreValue("logo", logo);
            return logo;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["logo"]
            })
        }
    })
}

export const useRemoveLogo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            await removeStoreValue("logo");
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["logo"]
            })
        }
    })
}
