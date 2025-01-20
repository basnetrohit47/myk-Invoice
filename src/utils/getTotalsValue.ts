import { InvoiceModel } from "@/domain/models/invoice.model";
import { ProductModel } from "@/domain/models/product.models";

export const getTotals = (formData: InvoiceModel) => {
     const subTotal = formData.products.reduce((sum: number, item: ProductModel) => {
          let rate = item.rate;
          let quantity = item.quantity;
          if (typeof rate === 'string') rate = parseFloat(rate);
          if (typeof quantity === 'string') quantity = parseFloat(quantity)
          return sum + ((rate ?? 0) * (quantity ?? 0))

     }, 0)

     let discount = parseFloat((formData.discount || 0).toString());

     let tax = parseFloat((formData.tax || 0).toString());

     if (formData.tax_sign == 'percent') {
          tax = ((Number.isNaN(tax) ? 0 : tax) / 100) * subTotal;
     }
     if (formData.discount_sign == 'percent') {
          discount = ((Number.isNaN(discount) ? 0 : discount) / 100) * subTotal;

     }
     const shipping = parseFloat((formData.shipping_cost || 0).toString());
     const paid_amount = parseFloat((formData.paid_amount || 0).toString());
     const total = ((subTotal + (Number.isNaN(tax) ? 0 : tax) + (Number.isNaN(shipping) ? 0 : shipping)) - ((Number.isNaN(discount) ? 0 : discount) + (Number.isNaN(paid_amount) ? 0 : paid_amount)));

     return { total: total, subTotal: subTotal };
}
