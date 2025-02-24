"use client";
import InvoiceListTable from "@/components/invoice/list/InvoiceListTable";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import InvoiceDashboard from "@/components/invoice/invoiceStat/InvoiceDashboard";
import { useGetProfile } from "@/core/hooks/user.hook";
import { getStoreValue } from "@/utils/localStorageUtil";
const InvoicePage = () => {
  const { data: profile } = useGetProfile();
  const getStoredTheme = getStoreValue<string>("theme");

  return (
    <>
      <div className="mx-20 my-2">
        <div>
          <Typography variant="h5" color="text.primary">
            Hello {profile?.firstName}
            {getStoredTheme}
          </Typography>
        </div>
        <div className="py-2 flex w-full justify-around gap-6">
          <InvoiceDashboard />
        </div>
        <div>
          <div className="flex my-4">
            <Typography variant="h5" color="text.primary">
              Invoice List
            </Typography>
            <Button component={Link} href="/" className="ml-auto bg-[#198754]" variant="contained">
              <AddIcon />
              Add Invoice
            </Button>
          </div>
          <InvoiceListTable />
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
