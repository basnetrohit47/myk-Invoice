"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetInvoiceList } from "@/repository/hooks/useGetInvoiceList.hook";
import { InvoiceRow } from "@/repository/models/invoice.model";
import Link from "next/link";
import { Avatar, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useInvoiceDelete } from "@/hooks/useInvoiceDelete";
import InvoiceConfirmModal from "../modal/InvoiceConfirmModal";
import { blue, deepPurple, green, orange, red } from "@mui/material/colors";
const getAvatarColor = (value: string) => {
  const colors = [deepPurple[500], green[500], blue[500], red[500], orange[500]];
  const hash = value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length]; // Cycle through colors
};
const columns: GridColDef<InvoiceRow>[] = [
  { field: "id", headerName: "ID", minWidth: 70, flex: 0.1 },
  //   { field: "number", headerName: "Number", minWidth: 130, flex: 0.2 },
  {
    field: "number",
    headerName: "Number",
    minWidth: 130,
    flex: 0.2,
    renderCell: (params) => (
      <Link href={`/invoice/${params.row.id}`} style={{ textDecoration: "none", color: "#1976d2" }}>
        {params.value}
      </Link>
    ),
  },
  {
    field: "bill_to",
    headerName: "Client",
    minWidth: 150,
    flex: 0.3,
    renderCell: (params) => (
      <>
        <div className="flex  items-center gap-2">
          <Avatar sx={{ bgcolor: getAvatarColor(params.value), width: "35px", height: "35px", fontSize: "1rem" }} sizes="small">
            {params.value.charAt(0)}
          </Avatar>

          <Typography>{params.value}</Typography>
        </div>
      </>
    ),
  },
  { field: "issue_date", headerName: "Issue date", minWidth: 130, flex: 0.2 },
  { field: "due_date", headerName: "Due date", minWidth: 130, flex: 0.2 },
  { field: "amount", headerName: "Invoice amount", minWidth: 160, flex: 0.2 },
  { field: "status", headerName: "Status", minWidth: 130, flex: 0.2 },
  { field: "paid_amount", headerName: "Paid Amount", minWidth: 130, flex: 0.2 },
  {
    field: "action",
    headerName: "Action",
    minWidth: 130,
    flex: 0.2,
    renderCell: (params) => (
      <div>
        <IconButton component={Link} href={`/invoice/${params.row.id}/edit`} size="small">
          <EditOutlinedIcon />
        </IconButton>
        <DeleteInvoiceButton invoiceId={params.row.id} />
      </div>
    ),
  },
];

const DeleteInvoiceButton = ({ invoiceId }: { invoiceId: number }) => {
  const { isModalOpen, handleDeleteClick, handleDeleteCancel, handleDeleteConfirm } = useInvoiceDelete();

  return (
    <>
      <IconButton size="small" onClick={() => handleDeleteClick({ id: invoiceId })}>
        <DeleteOutlineIcon />
      </IconButton>
      {isModalOpen && <InvoiceConfirmModal isOpen={isModalOpen} onConfirm={handleDeleteConfirm} message={`Are you sure you want to delete ?`} onClose={handleDeleteCancel} />}
    </>
  );
};

const InvoiceListTable = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const { data: invoiceList, refetch } = useGetInvoiceList({
    page: paginationModel.page + 1, // Current page
    pageSize: paginationModel.pageSize,
  });

  // Handle pagination model change
  const handlePaginationModelChange = (newPaginationModel: { page: number; pageSize: number }) => {
    setPaginationModel(newPaginationModel); // Update page and pageSize in the state
  };
  useEffect(() => {
    refetch(); // Refetch data whenever page or pageSize changes
  }, [paginationModel, refetch]);

  return (
    <>
      <Paper sx={{ height: 630, width: "100%" }}>
        <DataGrid
          disableRowSelectionOnClick
          rows={invoiceList?.results}
          columns={columns}
          checkboxSelection
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange} // Handle pagination model changes
          rowCount={invoiceList?.count || 0} // Assuming total count is available from the API
          paginationMode="server" // Use server-side pagination if you want to handle pagination on the server
          sx={{
            width: "100%",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#f6f5ef", // Custom header background color
              fontWeight: "bold", // Custom font weight for header
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px", // Custom cell font size
              padding: "8px", // Custom padding for cells
              display: "flex", // Use flex for alignment
              alignItems: "center", // Center vertically
            },
          }}
        />
      </Paper>
    </>
  );
};

export default InvoiceListTable;
