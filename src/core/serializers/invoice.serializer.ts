/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceListResponseModel, InvoiceModel, InvoiceStatResponse } from "../models/invoice.model";
import { CreateInvoiceParams, EditInvoiceByIdParam, GetInvoiceListParam } from "../params/invoice.param";

export const serializeInvoiceListParams = (params: GetInvoiceListParam) => {
    return {
        page: params.page,
        page_size: params.pageSize
    }
}
export const serializeInvoiceResponse = (data: any): InvoiceModel => {
    return {

        id: data.id,
        bill_from: data.bill_from,
        number: data.number,
        due_date: data.due_date ?? null, // Ensure nullable date
        payment_date: data.payment_date ?? null, // Ensure nullable date
        issue_date: data.issue_date, // Convert to Date
        bill_to: data.bill_to,
        shipping_to: data.shipping_to || null, // Nullable string
        tax_sign: data.tax_sign || null, // Nullable enum
        tax: data.tax ?? null, // Default to null if undefined
        discount: data.discount ?? null, // Default to null if undefined
        discount_sign: data.discount_sign || null, // Nullable enum
        shipping_cost: data.shipping_cost ?? null, // Default to null if undefined
        paid_amount: data.paid_amount ?? null, // Default to null if undefined
        products: data.products.map((product: any) => ({
            id: product.id ?? undefined, // Handle optional id
            name: product.name,
            rate: product.rate,
            quantity: product.quantity,
        })),
        note: data.note || null, // Nullable string
        terms: data.terms || null, // Nullable string
        bank: data.bank || null, // Nullable string
        amount: data.amount ?? null, // Default to null if undefined
        logo: data.logo, // Assuming this is just a string URL or path
        status: data.status || null, // Nullable string
        currency: data.currency || null, // Nullable string
    }
}


export const serializeInvoiceListResponse = (data: any): InvoiceListResponseModel => {
    return {
        count: data.count ?? 0, // Default to 0 if undefined
        next: data.next || null, // Nullable string
        previous: data.previous || null, // Nullable string
        results: data.results.map((invoice: any) => serializeInvoiceResponse(invoice)), // Serialize each invoice
    };
};

// Function to serialize request data for creating an invoice
export const serializeCreateInvoiceRequest = (params: CreateInvoiceParams): any => {
    return {
        bill_from: params.bill_from,
        number: params.number,
        due_date: params.due_date || null,
        payment_date: params.payment_date || null,
        issue_date: params.issue_date, // assuming it's a Date object
        bill_to: params.bill_to,
        shipping_to: params.shipping_to || null,
        tax_sign: params.tax_sign || null,
        tax: params.tax ?? null,
        discount: params.discount ?? null,
        discount_sign: params.discount_sign || null,
        shipping_cost: params.shipping_cost ?? null,
        paid_amount: params.paid_amount ?? null,
        products: params.products.map((product) => ({
            name: product.name,
            rate: product.rate,
            quantity: product.quantity,
        })),
        note: params.note || null,
        terms: params.terms || null,
        bank: params.bank || null,
        amount: params.amount ?? null,
        logo: params.logo,
        currency: params.currency || null,
    };
};

// Function to serialize request data for editing an invoice
export const serializeEditInvoiceRequest = (params: EditInvoiceByIdParam): unknown => {
    return {
        id: params.id,
        bill_from: params.bill_from,
        number: params.number,
        due_date: params.due_date || null,
        payment_date: params.payment_date || null,
        issue_date: params.issue_date,
        bill_to: params.bill_to,
        shipping_to: params.shipping_to || null,
        tax_sign: params.tax_sign || null,
        tax: params.tax ?? null,
        discount: params.discount ?? null,
        discount_sign: params.discount_sign || null,
        shipping_cost: params.shipping_cost ?? null,
        paid_amount: params.paid_amount ?? null,
        products: params.products?.map((product) => ({
            name: product.name,
            rate: product.rate,
            quantity: product.quantity,
        })),
        note: params.note || null,
        terms: params.terms || null,
        bank: params.bank || null,
        amount: params.amount ?? null,
        logo: params.logo,
        status: params.status || null,
        currency: params.currency || null,
    };
};


export const serializeInvoiceStatResponse = (data: any): InvoiceStatResponse => {
    return {
        total_invoice: { count: data.total_invoice.count, amount: data.total_invoice.amount },
        total_unpaid_invoice: { count: data.total_unpaid_invoice.count, amount: data.total_unpaid_invoice.amount },
        total_paid_invoice: { count: data.total_paid_invoice.count, amount: data.total_paid_invoice.amount },
        total_ongoing_invoice: { count: data.total_ongoing_invoice.count, amount: data.total_ongoing_invoice.amount },

    }
}