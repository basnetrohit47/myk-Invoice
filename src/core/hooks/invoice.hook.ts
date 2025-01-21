import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InvoiceService from "../services/invoice.service";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";

const service = InvoiceService.getInstance();

export const useCreateInvoice = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (param: CreateInvoiceParams) => {
            const response = await service.createInvoice(param)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoiceList']
            })
        }




    })
}


export const useDeleteInvoiceById = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (param: GetInvoiceByIdParam) => {
            const response = await service.deleteInvoiceById(param)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoiceList']
            })
        }




    })
}
export const useEditInvoiceById = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (param: EditInvoiceByIdParam) => {
            const response = await service.editInvoiceById(param)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['invoiceList']
            })
        }




    })
}

export const useGetInvoiceById = (params: GetInvoiceByIdParam) => {
    return useQuery({
        queryKey: ["invoiceById"],
        queryFn: () => service.getInvoiceById(params)
    })
}

export const useGetInvoiceList = (params: GetInvoiceListParam = {}) => {
    return useQuery({
        queryKey: ["invoiceList"],
        queryFn: async () => {
            const result = await service.getInvoiceList(params);
            if (!result) {
                throw new Error("Failed to fetch invoice list: Received undefined response.");

            }
            return result;

        },
        retry: 2,
        staleTime: 600000,

    })
}

export const useGetInvoiceStat = () => {

    return useQuery({
        queryKey: ["invoiceStat"],
        queryFn: async () => {
            const result = service.getInvoiceStat();
            if (!result) {
                throw new Error("Failed to fetch invoice list: Received undefined response.");

            }
            return result;
        }
    })
}