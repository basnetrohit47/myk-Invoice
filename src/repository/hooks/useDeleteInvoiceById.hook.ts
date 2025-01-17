import { useMutation, useQueryClient } from "@tanstack/react-query";
import InvoiceService from "../services/invoice.service";
import { GetInvoiceByIdParam } from "../params/invoice.param";

const service = InvoiceService.getInstance();

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