"use client";
import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { TextareaInput } from "../../formInputs/TextareaInput";
import ClearIcon from "@mui/icons-material/Clear";
import { CreateInvoiceParams } from "@/core/params/invoice.param";
import { TextFieldInput } from "@/components/formInputs/TextFieldInput";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3f4e6c",
    color: theme.palette.common.white,
    paddingLeft: 16,
    padding: 8,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface Props {
  control: Control<CreateInvoiceParams>;
}
export const ItemFields = ({ control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const products = useWatch({
    control,
    name: "products",
  });
  const calculateAmount = (index: number): number => {
    if (!products || !products[index]) return 0;
    const quantity = products[index].quantity || 0;
    const rate = products[index].rate || 0;
    return quantity * rate;
  };
  return (
    <>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "50%" }}>Item</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>Rate</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center", width: "20%" }}>Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell sx={{ border: "none" }}>
                  <TextareaInput name={`products.${index}.name`} label="Describe the item" control={control} required />
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  <TextFieldInput name={`products.${index}.quantity`} placeholder="0" control={control} required />
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  <TextFieldInput name={`products.${index}.rate`} placeholder="0" control={control} required />
                </TableCell>
                <TableCell sx={{ border: "none", width: "20%" }}>
                  <div className="flex items-center w-full">
                    <p className="p-4 text-right">{calculateAmount(index)}</p>

                    <button className="ml-auto" onClick={() => remove(index)}>
                      <ClearIcon fontSize="small" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ border: "none", width: "20%" }}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    append({
                      name: "",
                      rate: null,
                      quantity: null,
                    })
                  }
                >
                  Add item
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
