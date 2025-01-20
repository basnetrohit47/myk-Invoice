import { useQuery } from "@tanstack/react-query"
import InvoiceService from "../services/invoice.service"

const service = InvoiceService.getInstance()
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