import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "@/core/params/invoice.param";
import { apiClient } from "./apiClient";
import InvoiceInterface from "../repositories/invoice.interface";
import { API_ENDPOINTS } from "./apiEndpoints";

export default class InvoiceDataSource extends InvoiceInterface {

    public async createInvoice(params: CreateInvoiceParams): Promise<object | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.CREATE, method: "POST", data: params })
            if (!data) {
                throw new Error('No data received from the server.');
            }
            return data

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
            if (!data) {
                throw new Error('No data received from the server.');
            }
            return data

        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }

    public async getInvoiceStat(): Promise<object | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.GET_STAT });
            if (!data) {
                throw new Error('No data received from the server.');
            }
            return data
        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }

    public async getInvoiceById(params: GetInvoiceByIdParam): Promise<object | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.GET_BY_ID(params.id) });
            if (!data) {
                throw new Error('No data received from the server.');
            }
            return data

        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }
    public async deleteInovoiceById(params: GetInvoiceByIdParam): Promise<object | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.DELETE(params.id), method: "DELETE" })
            if (!data) {
                throw new Error('No data received from the server.');
            }
            return data
        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }
    public async editInvoiceById(params: EditInvoiceByIdParam): Promise<object | undefined> {
        try {
            const data = await apiClient({ url: API_ENDPOINTS.INVOICE.UPDATE(params.id), method: "PUT", data: params })
            if (!data) {
                throw new Error('No data received from the server.');
            }
            return data
        }
        catch (error) {
            console.error('Error creating invoice:', error)
            throw new Error('Failed to create invoice. Please try again later.');
        }
    }
}