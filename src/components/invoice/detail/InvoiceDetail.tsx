import { Typography } from "@mui/material";
import { forwardRef } from "react";
import { InvoiceProductComponent } from "./InvoiceProduct";
import { InvoiceModel } from "@/repository/models/invoice.model";

interface Props {
  invoice: InvoiceModel;
  subTotal: number;
  total: number;
}

const InvoiceDetail = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { invoice, subTotal, total } = props;
  let discount = invoice.discount;
  if (invoice.discount_sign == "percent" && discount) {
    discount = ((Number.isNaN(discount) ? 0 : discount) / 100) * subTotal;
  }
  let tax = invoice.tax;
  if (invoice.tax_sign == "percent" && tax) {
    tax = ((Number.isNaN(tax) ? 0 : tax) / 100) * subTotal;
  }

  return (
    <>
      <div className="p-4 border-2 m-4 border-gray-200 rounded-xl min-h-[60vh]">
        <div id="invoice-preview" ref={ref}>
          <div className="text-right">
            <Typography variant="h4">Invoice</Typography>
          </div>
          <div className="flex m-4" id="invoice-field">
            <div className="text-[0.6rem] text-left flex flex-col gap-3">
              <div>
                <p>Bill From</p>
                <p>{invoice.bill_from}</p>
              </div>
              <div>
                <p>Bill To</p>
                <p>{invoice.bill_to}</p>
              </div>
              <div>
                <p>Shipping to </p>
                <p>{invoice.shipping_to}</p>
              </div>
            </div>
            <div className="mt-auto ml-auto text-[0.6rem] flex flex-col gap-2 ">
              <div className="flex gap-4">
                <p>Invoice number</p>
                <p className="ml-auto">#{invoice.number}</p>
              </div>
              <div className="flex">
                <p>Invoice date</p>
                <p className="ml-auto">{invoice.issue_date}</p>
              </div>
              <div className="flex">
                <p>Due date</p>
                <p className="ml-auto">{invoice.due_date}</p>
              </div>
            </div>
          </div>
          <InvoiceProductComponent product={invoice.products} />
          <div className="flex flex-col items-end gap-4 mt-4 text-[0.6rem]">
            <div className="flex gap-6">
              <p>Subtotal</p>
              <p>{subTotal}</p>
            </div>
            {invoice.tax && (
              <div className="flex gap-6">
                <p>Tax</p>
                <p>{tax}</p>
              </div>
            )}
            {invoice.discount && (
              <div className="flex gap-6">
                <p>Discount</p>
                <p>{discount}</p>
              </div>
            )}
            {invoice.shipping_cost && (
              <div className="flex gap-6">
                <p>Shiping cost</p>
                <p>{invoice.shipping_cost}</p>
              </div>
            )}

            <div className="flex gap-6">
              <p className="font-semibold">Total</p>
              <p>{total}</p>
            </div>
          </div>
          <div className="text-[0.6rem] text-left flex flex-col gap-2">
            {invoice.note && (
              <div>
                <p className="font-semibold">Note</p>
                <p>{invoice.note}</p>
              </div>
            )}
            {invoice.bank && (
              <div>
                <p className="font-semibold">Bank details</p>
                <p>{invoice.bank}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <p className="font-semibold">Terms & Conditons</p>
                <p>{invoice.terms}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

// Add this line to fix the warning/error
InvoiceDetail.displayName = "PreviewComponent";

export default InvoiceDetail;
