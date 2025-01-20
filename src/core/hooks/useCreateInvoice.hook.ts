import { useMutation, useQueryClient } from "@tanstack/react-query";
import InvoiceService from "../services/invoice.service";
import { CreateInvoiceParams } from "../params/invoice.param";

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