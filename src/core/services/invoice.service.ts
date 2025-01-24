
import InvoiceDataSource from "@/core/api/invoice.api";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../entities/params/invoice.param";
import { InvoiceListResponseModel, InvoiceListResponseSchema, InvoiceModel, InvoiceRow, InvoiceRowSchema, InvoiceSchema, InvoiceStatResponse, InvoiceStatResponseSchema } from "../entities/models/invoice.model";
import InvoiceInterface from "../repositories/invoice.interface";
import { serializeCreateInvoiceRequest, serializeInvoiceListParams, serializeInvoiceListResponse, serializeInvoiceResponse, serializeInvoiceStatResponse } from "../serializers/invoice.serializer";
import { z } from "zod";
import { InputParseError } from "../entities/errors/common";

export default class InvoiceService {
    private static _instance: InvoiceService;
    public static getInstance(): InvoiceService {
        if (!InvoiceService._instance) {
            InvoiceService._instance = new InvoiceService();
        }
        return InvoiceService._instance;
    }

    private constructor(
        private datasource: InvoiceInterface = new InvoiceDataSource(),
    ) { }


    private parseWithCustomError<T>(
        schema: z.ZodSchema<T>,
        data: unknown,
        schemaName: string
    ): T {
        const result = schema.safeParse(data);
        if (!result.success) {
            console.error(`${schemaName} validation failed`, result.error.errors);
            throw new InputParseError(`${schemaName} validation error`);
        }
        return result.data;
    }

    public async createInvoice(params: CreateInvoiceParams): Promise<InvoiceModel | undefined> {
        const requestData = serializeCreateInvoiceRequest(params);
        const responseData = await this.datasource.createInvoice(requestData);
        const serializedData = serializeInvoiceResponse(responseData);
        return this.parseWithCustomError(InvoiceSchema, serializedData, "InvoiceSchema")




    }
    public async getInvoiceList(params: GetInvoiceListParam): Promise<InvoiceListResponseModel | undefined> {
        const invoiceListParams = serializeInvoiceListParams(params)
        const invoiceList = await this.datasource.getInvoiceList(invoiceListParams); // Call the API
        const serializedData = serializeInvoiceListResponse(invoiceList);
        return this.parseWithCustomError(InvoiceListResponseSchema, serializedData, "InvoiceListResponseSchema")

    }
    public async getInvoiceStat(): Promise<InvoiceStatResponse | undefined> {
        const invoiceStat = await this.datasource.getInvoiceStat().then(serializeInvoiceStatResponse)
        return this.parseWithCustomError(InvoiceStatResponseSchema, invoiceStat, "InvoiceStatResponseSchema")




    }
    public async getInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        const invoiceDetail = await this.datasource.getInvoiceById(params).then(serializeInvoiceResponse)
        return this.parseWithCustomError(InvoiceSchema, invoiceDetail, "InvoiceSchema")





    }
    public async deleteInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {

        const response = await this.datasource.deleteInovoiceById(params).then(serializeInvoiceResponse)
        return this.parseWithCustomError(InvoiceSchema, response, "InvoiceSchema")



    }
    public async editInvoiceById(params: EditInvoiceByIdParam): Promise<InvoiceRow | undefined> {
        const response = await this.datasource.editInvoiceById(params).then(serializeInvoiceResponse)
        return this.parseWithCustomError(InvoiceRowSchema, response, "InvoiceRowSchema")



    }

}