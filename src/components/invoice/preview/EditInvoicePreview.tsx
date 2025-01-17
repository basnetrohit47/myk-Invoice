import { EditInvoiceByIdParam } from "@/repository/params/invoice.param";
import { Paper, Typography } from "@mui/material";
import { forwardRef } from "react";
import { InvoiceProductComponent } from "./InvoiceProduct";

interface Props {
  formData: EditInvoiceByIdParam;
  subTotal: number;
  total: number;
}

const EditInvoicePreview = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { formData, subTotal, total } = props;
  let discount = formData.discount;
  if (formData.discount_sign == "percent" && discount) {
    discount = ((Number.isNaN(discount) ? 0 : discount) / 100) * subTotal;
  }
  let tax = formData.tax;
  if (formData.tax_sign == "percent" && tax) {
    tax = ((Number.isNaN(tax) ? 0 : tax) / 100) * subTotal;
  }

  return (
    <>
      <Paper className="p-4  m-4  rounded-xl min-h-[60vh]">
        <div id="invoice-preview" ref={ref}>
          <div className="text-right">
            <Typography variant="h4">Invoice</Typography>
          </div>
          <div className="flex m-4" id="invoice-field">
            <div className="text-[0.6rem] text-left flex flex-col gap-3">
              <div>
                <p>Bill From</p>
                <p>{formData.bill_from}</p>
              </div>
              <div>
                <p>Bill To</p>
                <p>{formData.bill_to}</p>
              </div>
              <div>
                <p>Shipping to </p>
                <p>{formData.shipping_to}</p>
              </div>
            </div>
            <div className="mt-auto ml-auto text-[0.6rem] flex flex-col gap-2 ">
              <div className="flex gap-4">
                <p>Invoice number</p>
                <p className="ml-auto">#{formData.number}</p>
              </div>
              <div className="flex">
                <p>Invoice date</p>
                <p className="ml-auto">{formData.issue_date}</p>
              </div>
              <div className="flex">
                <p>Due date</p>
                <p className="ml-auto">{formData.due_date}</p>
              </div>
            </div>
          </div>
          {formData.products && <InvoiceProductComponent product={formData.products} />}
          <div className="flex flex-col items-end gap-4 mt-4 text-[0.6rem]">
            <div className="flex gap-6">
              <p>Subtotal</p>
              <p>{subTotal}</p>
            </div>
            {formData.tax && (
              <div className="flex gap-6">
                <p>Tax</p>
                <p>{tax}</p>
              </div>
            )}
            {formData.discount && (
              <div className="flex gap-6">
                <p>Discount</p>
                <p>{discount}</p>
              </div>
            )}
            {formData.shipping_cost && (
              <div className="flex gap-6">
                <p>Shiping cost</p>
                <p>{formData.shipping_cost}</p>
              </div>
            )}

            <div className="flex gap-6">
              <p className="font-semibold">Total</p>
              <p>{total}</p>
            </div>
          </div>
          <div className="text-[0.6rem] text-left flex flex-col gap-2">
            {formData.note && (
              <div>
                <p className="font-semibold">Note</p>
                <p>{formData.note}</p>
              </div>
            )}
            {formData.bank && (
              <div>
                <p className="font-semibold">Bank details</p>
                <p>{formData.bank}</p>
              </div>
            )}
            {formData.terms && (
              <div>
                <p className="font-semibold">Terms & Conditons</p>
                <p>{formData.terms}</p>
              </div>
            )}
          </div>
        </div>
      </Paper>
    </>
  );
});

// Add this line to fix the warning/error
EditInvoicePreview.displayName = "PreviewComponent";

export default EditInvoicePreview;
