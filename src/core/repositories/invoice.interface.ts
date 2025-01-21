import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";

export default abstract class InvoiceInterface {
    public abstract createInvoice(params?: CreateInvoiceParams): Promise<object | undefined>
    public abstract getInvoiceList(params: GetInvoiceListParam): Promise<object | undefined>
    public abstract getInvoiceStat(): Promise<object | undefined>
    public abstract getInvoiceById(params: GetInvoiceByIdParam): Promise<object | undefined>
    public abstract deleteInovoiceById(params: GetInvoiceByIdParam): Promise<object | undefined>
    public abstract editInvoiceById(params: EditInvoiceByIdParam): Promise<object | undefined>
}