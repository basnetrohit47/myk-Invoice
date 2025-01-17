
import { useDeleteInvoiceById } from "@/repository/hooks/useDeleteInvoiceById.hook";
import { GetInvoiceByIdParam } from "@/repository/params/invoice.param";
import { useState } from "react";

export const useInvoiceDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<GetInvoiceByIdParam | null>(null);
  const { mutate: deleteInvoice } = useDeleteInvoiceById();

  const handleDeleteClick = (param: GetInvoiceByIdParam) => {
    setInvoiceToDelete(param);
    setIsModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setInvoiceToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!invoiceToDelete) return;

    try {
      await deleteInvoice(invoiceToDelete);


    } catch (error) {
      console.error(error)
    } finally {
      setIsModalOpen(false);
      setInvoiceToDelete(null);
    }
  };

  return {
    isModalOpen,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
  };
};