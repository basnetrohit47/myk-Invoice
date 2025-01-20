"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useGetInvoiceList } from "@/domain/hooks/useGetInvoiceList.hook";

import { columns } from "./InvoiceColumn";

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
          // pageSizeOptions={[10, 10, 20, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange} // Handle pagination model changes
          rowCount={invoiceList?.count || 0} // Assuming total count is available from the API
          paginationMode="server" // Use server-side pagination if you want to handle pagination on the server
          sx={{
            width: "100%",
            "& .MuiDataGrid-columnHeader": {
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
