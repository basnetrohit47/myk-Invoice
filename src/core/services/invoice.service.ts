
import InvoiceDataSource from "@/core/api/invoice.api";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";
import { InvoiceListResponseModel, InvoiceListResponseSchema, InvoiceModel, InvoiceRow, InvoiceRowSchema, InvoiceSchema, InvoiceStatResponse, InvoiceStatResponseSchema } from "../models/invoice.model";
import InvoiceInterface from "../repositories/invoice.interface";
import { serializeCreateInvoiceRequest, serializeInvoiceListParams, serializeInvoiceListResponse, serializeInvoiceResponse, serializeInvoiceStatResponse } from "../serializers/invoice.serializer";

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

    public async createInvoice(params: CreateInvoiceParams): Promise<InvoiceModel | undefined> {
        const requestData = serializeCreateInvoiceRequest(params);
        const responseData = await this.datasource.createInvoice(requestData);
        const serializedData = serializeInvoiceResponse(responseData);
        return InvoiceSchema.parse(serializedData)



    }
    public async getInvoiceList(params: GetInvoiceListParam): Promise<InvoiceListResponseModel | undefined> {
        const invoiceListParams = serializeInvoiceListParams(params)
        const invoiceList = await this.datasource.getInvoiceList(invoiceListParams); // Call the API

        const serilizedData = serializeInvoiceListResponse(invoiceList);
        return InvoiceListResponseSchema.parse(serilizedData)



    }
    public async getInvoiceStat(): Promise<InvoiceStatResponse | undefined> {

        const invoiceStat = await this.datasource.getInvoiceStat().then(serializeInvoiceStatResponse)

        return InvoiceStatResponseSchema.parse(invoiceStat)
    }
    public async getInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {

        const invoiceDetail = this.datasource.getInvoiceById(params).then(serializeInvoiceResponse)

        return InvoiceSchema.parse(invoiceDetail)

    }
    public async deleteInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {

        const response = await this.datasource.deleteInovoiceById(params).then(serializeInvoiceResponse)

        return InvoiceSchema.parse(response)
    }
    public async editInvoiceById(params: EditInvoiceByIdParam): Promise<InvoiceRow | undefined> {
        const response = await this.datasource.editInvoiceById(params).then(serializeInvoiceResponse)

        return InvoiceRowSchema.parse(response)
    }

}