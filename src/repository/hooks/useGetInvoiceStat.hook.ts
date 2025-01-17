import { useQuery } from "@tanstack/react-query"
import InvoiceService from "../services/invoice.service"

const service = InvoiceService.getInstance()
export const useGetInvoiceStat = () => {

    return useQuery({
        queryKey: ["invoiceStat"],
        queryFn: () => service.getInvoiceStat()
    })
}