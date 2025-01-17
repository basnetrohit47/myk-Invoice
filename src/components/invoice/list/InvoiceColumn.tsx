import { InvoiceRow } from "@/repository/models/invoice.model";
import { Avatar, Chip, IconButton, Typography } from "@mui/material";
import { blue, deepPurple, green, orange, red } from "@mui/material/colors";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ActionMenu from "./ActionMenu";
import InvoiceConfirmModal from "../modal/InvoiceConfirmModal";
import { useInvoiceDelete } from "@/hooks/useInvoiceDelete";
import amountFormat from "@/utils/amountFormat";
const getAvatarColor = (value: string) => {
  const colors = [deepPurple[500], green[500], blue[500], red[500], orange[500]];
  const hash = value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length]; // Cycle through colors
};
const getStatusColor = (value: string) => {
  if (value.toLocaleLowerCase() === "overdue") {
    return "border-red-700 bg-red-100 text-red-700";
  }
  if (value.toLocaleLowerCase() === "paid") {
    return "border-green-700 bg-green-100 text-green-700";
  }
  if (value.toLocaleLowerCase() === "partially_paid") {
    return "border-blue-700 bg-blue-100 text-blue-700";
  }
  return "border-gray-700 bg-gray-100 text-gray-700";
};
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

export const columns: GridColDef<InvoiceRow>[] = [
  //   { field: "id", headerName: "ID", minWidth: 70, flex: 0.1 },
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
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <>
        <div className="flex  items-center gap-2">
          <Avatar sx={{ bgcolor: getAvatarColor(params.value), width: "30px", height: "30px", fontSize: "1rem" }} sizes="small">
            {params.value.charAt(0)}
          </Avatar>

          <Typography>{params.value}</Typography>
        </div>
      </>
    ),
  },
  { field: "issue_date", headerName: "Issue date", minWidth: 130, flex: 0.2 },
  { field: "due_date", headerName: "Due date", minWidth: 130, flex: 0.2 },
  { field: "amount", headerName: "Invoice amount", minWidth: 160, flex: 0.2, renderCell: (params) => amountFormat(params.value) },
  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    flex: 0.2,
    renderCell: (params) => (
      <>
        <Chip size="small" label={params.value} variant="outlined" className={`${getStatusColor(params.value)} text-[0.6rem] min-w-16`} />
      </>
    ),
  },
  { field: "paid_amount", headerName: "Paid Amount", minWidth: 130, flex: 0.2, renderCell: (params) => amountFormat(params.value) },
  {
    field: "action",
    headerName: "Action",
    minWidth: 130,
    flex: 0.2,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div>
        <IconButton component={Link} href={`/invoice/${params.row.id}/edit`} size="small">
          <EditOutlinedIcon />
        </IconButton>
        <DeleteInvoiceButton invoiceId={params.row.id} />
        <ActionMenu invoice={params.row} />
      </div>
    ),
  },
];
