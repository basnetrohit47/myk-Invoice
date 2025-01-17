import { useQuery } from "@tanstack/react-query"
import InvoiceService from "../services/invoice.service"
import { GetInvoiceListParam } from "../params/invoice.param"
const service = InvoiceService.getInstance()
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