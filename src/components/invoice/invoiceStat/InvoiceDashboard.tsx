"use client";
import { useGetInvoiceStat } from "@/feature/hooks/useGetInvoiceStat.hook";
import React from "react";
import InvoiceCard from "./InvoiceCard";
import growth from "../../../../public/growth.svg";
import paid from "../../../../public/paid.svg";
import unpaid from "../../../../public/unpaid.svg";
import ongoing from "../../../../public/pending.svg";
const InvoiceDashboard = () => {
  const { data: invoiceStat } = useGetInvoiceStat();

  return (
    <>
      {invoiceStat && (
        <>
          <InvoiceCard image={growth} total={invoiceStat.total_invoice.count} amount={invoiceStat.total_invoice.amount} title="Total invoice" bgClass="bg-[#517d91]" />
          <InvoiceCard image={ongoing} total={invoiceStat.total_ongoing_invoice.count} amount={invoiceStat.total_ongoing_invoice.amount} title="Total ongoing invoice" bgClass="bg-[#82825d]" />
          <InvoiceCard image={paid} total={invoiceStat.total_paid_invoice.count} amount={invoiceStat.total_paid_invoice.amount} title="Total paid invoice" bgClass="bg-[#588359]" />
          <InvoiceCard image={unpaid} total={invoiceStat.total_unpaid_invoice.count} amount={invoiceStat.total_unpaid_invoice.amount} title="Total unpaid invoice" bgClass="bg-[#995531]" />
        </>
      )}
    </>
  );
};

export default InvoiceDashboard;
