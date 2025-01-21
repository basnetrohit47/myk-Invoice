
import InvoiceDataSource from "@/core/api/invoice.api";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";
import { InvoiceListResponseModel, InvoiceListResponseSchema, InvoiceModel, InvoiceRow, InvoiceSchema, InvoiceStatResponse } from "../models/invoice.model";
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
        if (!responseData) {
            throw new Error('No data received from the server.');
        }
        const serializedData = serializeInvoiceResponse(responseData);
        return InvoiceSchema.parse(serializedData)



    }
    public async getInvoiceList(params: GetInvoiceListParam): Promise<InvoiceListResponseModel | undefined> {
        const invoiceListParams = serializeInvoiceListParams(params)
        const invoiceList = await this.datasource.getInvoiceList(invoiceListParams); // Call the API

        if (!invoiceList) {
            throw new Error('No data received from the server.');
        }
        // Serialize and return the response
        const serilizedData = serializeInvoiceListResponse(invoiceList);
        return InvoiceListResponseSchema.parse(serilizedData)



    }
    public getInvoiceStat(): Promise<InvoiceStatResponse | undefined> {
        return this.datasource.getInvoiceStat().then(serializeInvoiceStatResponse)
    }
    public getInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        return this.datasource.getInvoiceById(params).then(serializeInvoiceResponse)
    }
    public deleteInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        return this.datasource.deleteInovoiceById(params).then(serializeInvoiceResponse)
    }
    public editInvoiceById(params: EditInvoiceByIdParam): Promise<InvoiceRow | undefined> {
        return this.datasource.editInvoiceById(params).then(serializeInvoiceResponse)
    }

}