import { CreateProductModel } from "@/feature/params/product.param";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3f4e6c",
    fontSize: 10,
    padding: 2,
    paddingLeft: 16,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 2,
  },
}));

const StyledBodyTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    border: "none",
  },
}));

interface Props {
  product: CreateProductModel[];
}
export const InvoiceProductComponent = ({ product }: Props) => {
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
            {product &&
              product.map((item, index) => (
                <TableRow key={index}>
                  <StyledBodyTableCell>{item.name}</StyledBodyTableCell>
                  <StyledBodyTableCell>{item.quantity}</StyledBodyTableCell>
                  <StyledBodyTableCell>{item.rate}</StyledBodyTableCell>
                  <StyledBodyTableCell sx={{ width: "20%", textAlign: "center" }}>{9 * (item.quantity || 0)}</StyledBodyTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
