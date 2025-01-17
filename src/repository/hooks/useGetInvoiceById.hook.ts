import { useQuery } from "@tanstack/react-query"
import InvoiceService from "../services/invoice.service"
import { GetInvoiceByIdParam } from "../params/invoice.param"

const service = InvoiceService.getInstance()
export const useGetInvoiceById = (params: GetInvoiceByIdParam) => {
    return useQuery({
        queryKey: ["invoiceById"],
        queryFn: () => service.getInvoiceById(params)
    })
}