import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEditInvoiceById } from "@/domain/hooks/useEditInvoiceById.hook";
import { InvoiceRow } from "@/domain/models/invoice.model";
interface Props {
  invoice: InvoiceRow;
}
const ActionMenu = ({ invoice }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mutate: updateStatus } = useEditInvoiceById();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status: "PAID" | "OVERDUE" | "PENDING" | "PARTIALLY_PAID" | "CANCELLED") => {
    updateStatus({ id: invoice.id, status });
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      {invoice.status === "PAID" && (
        <Menu
          sx={{ height: "400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleStatusChange("OVERDUE")}>Make it unpaid</MenuItem>
        </Menu>
      )}
      {(invoice.status === "OVERDUE" || invoice.status === "PENDING") && (
        <Menu
          sx={{ height: "400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleStatusChange("PAID")}>Make it paid</MenuItem>
          <MenuItem onClick={() => handleStatusChange("PARTIALLY_PAID")}>Make it partially paid</MenuItem>
          <MenuItem onClick={() => handleStatusChange("CANCELLED")}>Make it cancelled</MenuItem>
        </Menu>
      )}
      {invoice.status === "PARTIALLY_PAID" && (
        <Menu
          sx={{ height: "400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleStatusChange("PAID")}>Make it paid</MenuItem>
          <MenuItem onClick={() => handleStatusChange("CANCELLED")}>Make it cancelled</MenuItem>
          <MenuItem onClick={() => handleStatusChange("OVERDUE")}>Make it unpaid</MenuItem>
        </Menu>
      )}
      {invoice.status === "CANCELLED" && (
        <Menu
          sx={{ height: "400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleStatusChange("PAID")}>Make it paid</MenuItem>
          <MenuItem onClick={() => handleStatusChange("OVERDUE")}>Make it cancelled</MenuItem>
          <MenuItem onClick={() => handleStatusChange("PARTIALLY_PAID")}>Make it partially paid</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default ActionMenu;
