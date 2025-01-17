import { InvoiceListResponseModel, InvoiceModel, InvoiceRow, InvoiceStatResponse } from "../models/invoice.model";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";

export default abstract class InvoiceInterface {
    public abstract createInvoice(params?: CreateInvoiceParams): Promise<InvoiceModel | undefined>
    public abstract getInvoiceList(params: GetInvoiceListParam): Promise<InvoiceListResponseModel | undefined>
    public abstract getInvoiceStat(): Promise<InvoiceStatResponse | undefined>
    public abstract getInvoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined>
    public abstract deleteInovoiceById(params: GetInvoiceByIdParam): Promise<InvoiceModel | undefined>
    public abstract editInvoiceById(params: EditInvoiceByIdParam): Promise<InvoiceRow | undefined>
}