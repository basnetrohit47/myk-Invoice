"use client";
import InvoiceDetail from "@/components/invoice/detail/InvoiceDetail";
import { useGetInvoiceById } from "@/core/hooks/useGetInvoiceById.hook";
import React from "react";
interface Props {
  params: Promise<{
    invoiceId: string;
  }>;
}
const InvoiceDetailPage = ({ params }: Props) => {
  const { invoiceId } = React.use(params); // Unwrap params promise

  const id = parseInt(invoiceId);
  const { data: invoice } = useGetInvoiceById({ id });

  return (
    <>
      {invoice && (
        <>
          <InvoiceDetail invoice={invoice} subTotal={44} total={33} />
        </>
      )}
    </>
  );
};

export default InvoiceDetailPage;
