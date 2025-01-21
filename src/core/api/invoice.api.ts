import { InvoiceModel, InvoiceRow, InvoiceRowSchema, InvoiceSchema, InvoiceStatResponse, InvoiceStatResponseSchema } from "@/core/models/invoice.model";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "@/core/params/invoice.param";
import { apiClient } from "./apiClient";
import InvoiceInterface from "../repositories/invoice.interface";
import { API_ENDPOINTS } from "./apiEndpoints";

export default class InvoiceDataSource extends InvoiceInterface {
    public async createInvoice(params: CreateInvoiceParams): Promise<object | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.CREATE, method: "POST", data: params })
            return data ?? undefined
        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }
    public async getInvoiceList(params?: GetInvoiceListParam): Promise<object | undefined> {
        try {
            const page = params?.page ?? 1;  // Default to 1 if page is not provided
            const pageSize = params?.pageSize ?? 10;
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.GET_LIST(page, pageSize) });
            return data ?? undefined

        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }

    public async getInvoiceStat(): Promise<InvoiceStatResponse | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.GET_STAT });
            if (!data) {
                return undefined;
            }
            return InvoiceStatResponseSchema.parse(data)
        }
        catch (error) {
            console.error(error)
            return undefined
        }
    }

    public async getInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.GET_BY_ID(params.id) });
            if (!data) {
                return undefined
            }
            return InvoiceSchema.parse(data)

        }
        catch (error) {
            console.error(error)
            return undefined
        }
    }
    public async deleteInovoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.DELETE(params.id), method: "DELETE" })
            if (!data) {
                return undefined
            }
            return InvoiceSchema.parse(data)
        }
        catch (error) {
            console.error(error)
            return undefined
        }
    }
    public async editInvoiceById(params: EditInvoiceByIdParam): Promise<InvoiceRow | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.UPDATE(params.id), method: "PUT", data: params })
            if (!data) {
                return undefined
            }
            return InvoiceRowSchema.parse(data)
        }
        catch (error) {
            console.error(error)
            return undefined
        }
    }
}