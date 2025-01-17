import { useQuery } from "@tanstack/react-query"
import InvoiceService from "../services/invoice.service"
import { GetInvoiceListParam } from "../params/invoice.param"
const service = InvoiceService.getInstance()
export const useGetInvoiceList = (params: GetInvoiceListParam = {}) => {
    return useQuery({
        queryKey: ["invoiceList"],
        queryFn: async () => {
            return service.getInvoiceList(params)
        },
        retry: 2,
        staleTime: 600000,

    })
}