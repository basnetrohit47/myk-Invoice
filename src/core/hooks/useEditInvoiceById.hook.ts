import { useMutation, useQueryClient } from "@tanstack/react-query";
import InvoiceService from "../services/invoice.service";
import { EditInvoiceByIdParam } from "../params/invoice.param";

const service = InvoiceService.getInstance();

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