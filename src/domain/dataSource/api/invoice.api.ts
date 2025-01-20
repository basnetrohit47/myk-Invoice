import InvoiceInterface from "@/domain/interface/invoice.interface";
import { InvoiceListResponseModel, InvoiceListResponseSchema, InvoiceModel, InvoiceRow, InvoiceRowSchema, InvoiceSchema, InvoiceStatResponse, InvoiceStatResponseSchema } from "@/domain/models/invoice.model";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "@/domain/params/invoice.param";
import { apiClient } from "../config/apiClient";

export default class InvoiceDataSource extends InvoiceInterface {
    public async createInvoice(params: CreateInvoiceParams): Promise<InvoiceModel | undefined> {
        try {
            const data = await apiClient({ url: "/invoice", method: "POST", data: params })
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
    public async getInvoiceList(params?: GetInvoiceListParam): Promise<InvoiceListResponseModel | undefined> {
        try {
            const page = params?.page ?? 1;  // Default to 1 if page is not provided
            const pageSize = params?.pageSize ?? 10;
            const data = await apiClient({ url: `/invoice?page=${page}&page_size=${pageSize}` });
            if (!data) {
                return undefined;
            }
            return InvoiceListResponseSchema.parse(data);
        }
        catch (error) {
            console.error(error)
            return undefined
        }
    }

    public async getInvoiceStat(): Promise<InvoiceStatResponse | undefined> {
        try {
            const data = await apiClient({ url: "/invoice_stats" });
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
            const data = await apiClient({ url: `/invoice/${params.id}` });
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
            const data = await apiClient({ url: `/invoice/${params.id}`, method: "DELETE" })
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
            const data = await apiClient({ url: `/invoice/${params.id}`, method: "PUT", data: params })
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