import { InvoiceEditForm } from "@/components/invoice/form/InvoiceEditForm";
import React from "react";
interface Props {
  params: Promise<{
    invoiceId: string;
  }>;
}
const InvoiceEditPage = ({ params }: Props) => {
  const { invoiceId } = React.use(params); // Unwrap params promise
  const id = parseInt(invoiceId);

  return (
    <>
      <div>
        <InvoiceEditForm invoiceId={id} />
      </div>
    </>
  );
};

export default InvoiceEditPage;
