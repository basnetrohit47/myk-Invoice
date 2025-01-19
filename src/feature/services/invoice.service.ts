
import InvoiceDataSource from "@/feature/dataSource/api/invoice.api";
import InvoiceInterface from "../interface/invoice.interface";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";
import { InvoiceListResponseModel, InvoiceModel, InvoiceRow, InvoiceStatResponse } from "../models/invoice.model";

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





    public createInvoice(params: CreateInvoiceParams): Promise<InvoiceModel | undefined> {
        return this.datasource.createInvoice(params)
    }
    public getInvoiceList(params: GetInvoiceListParam): Promise<InvoiceListResponseModel | undefined> {
        return this.datasource.getInvoiceList(params)
    }
    public getInvoiceStat(): Promise<InvoiceStatResponse | undefined> {
        return this.datasource.getInvoiceStat()
    }
    public getInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        return this.datasource.getInvoiceById(params)
    }
    public deleteInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined> {
        return this.datasource.deleteInovoiceById(params)
    }
    public editInvoiceById(params: EditInvoiceByIdParam): Promise<InvoiceRow | undefined> {
        return this.datasource.editInvoiceById(params)
    }

}