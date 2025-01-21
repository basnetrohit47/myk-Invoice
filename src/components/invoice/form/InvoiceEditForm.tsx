"use client";
import { TextareaInput } from "../../formInputs/TextareaInput";
import { Box, Button, Paper } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputDropdown } from "../../formInputs/DropdownInput";
import { TextFieldInput } from "@/components/formInputs/TextFieldInput";
import { EditInvoiceByIdParam, EditInvoiceSchema } from "@/core/params/invoice.param";
import { useEffect, useRef } from "react";
import { EditItemFields } from "./EditItemFields";
import { useRouter } from "next/navigation";
import EditInvoicePreview from "../preview/EditInvoicePreview";
import { useEditInvoiceById, useGetInvoiceById } from "@/core/hooks/invoice.hook";

interface Props {
  invoiceId: number;
}
export const InvoiceEditForm = ({ invoiceId }: Props) => {
  const { data: invoice } = useGetInvoiceById({ id: invoiceId });
  const { mutate: editInvoice } = useEditInvoiceById();

  const { control, handleSubmit, watch, reset } = useForm<EditInvoiceByIdParam>({
    defaultValues: { id: invoiceId },
    resolver: zodResolver(EditInvoiceSchema),
  });
  useEffect(() => {
    if (invoice) {
      reset(invoice);
    }
  }, [invoice, reset]);
  const router = useRouter();
  const onSubmit: SubmitHandler<EditInvoiceByIdParam> = async (formData: EditInvoiceByIdParam) => {
    try {
      console.log("Submitting form data:", formData); // Debug
      await editInvoice(formData); // Ensure this is working
      router.push("/invoice");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formData = watch();
  //   const { total, subTotal } = invoice_total(formData);

  const printRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Box>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8 ">
            <Paper className="px-8 py-12 m-2 rounded-lg w-[65%]">
              <div className="flex gap-8 ">
                <div className="flex flex-col gap-6 w-[50%]">
                  <div className=" rounded-md cursor-pointer border-2 border-dotted flex justify-center">
                    <div className="p-4 text-center">
                      <UploadIcon />
                      <p>Upload logo</p>
                      <p className="text-[8px]">240 x 240 pixels @ 72 DPI, Maximum size of 1MB.</p>
                    </div>
                  </div>
                  <TextareaInput name="bill_to" label="who is this for" control={control} required />
                  <TextareaInput name="shipping_to" label="add shipping details" control={control} />
                </div>
                <div className="flex flex-col gap-6 ml-auto w-[50%]">
                  <TextareaInput name="bill_from" label="who is this from" control={control} required />
                  <TextFieldInput name="number" label="invoice number" control={control} required />
                  <TextFieldInput name="issue_date" label="issue date" control={control} type="date" />
                  <TextFieldInput name="due_date" label="due date" control={control} type="date" />
                </div>
              </div>
              <div className="my-10">
                <EditItemFields control={control} />
              </div>

              <div className="flex flex-col  items-end">
                <div className="flex flex-col gap-6 w-[40%] mb-10">
                  <div className="flex gap-8">
                    <p className="">Sub Total</p>
                    <p className="ml-auto">tpdp {formData.currency}</p>
                  </div>
                  <div className="flex">
                    <TextFieldInput
                      type="number"
                      name="tax"
                      label="Tax"
                      control={control}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          },
                        },
                      }}
                    />
                    <div className="w-[20%]">
                      <FormInputDropdown
                        options={[
                          { label: "%", value: "percent" },
                          { label: formData.currency || "$", value: "amount" },
                        ]}
                        variant="outlined"
                        name="tax_sign"
                        control={control}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderLeft: "none",
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <TextFieldInput
                      name="discount"
                      label="Discount"
                      type="number"
                      control={control}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          },
                        },
                      }}
                    />
                    <div className="w-[20%]">
                      <FormInputDropdown
                        options={[
                          { label: "%", value: "percent" },
                          { label: formData.currency || "$", value: "amount" },
                        ]}
                        variant="outlined"
                        name="tax_sign"
                        control={control}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderLeft: "none",
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <TextFieldInput name="shipping_cost" label="shipping cost" type="number" control={control} />
                  <TextFieldInput name="paid_amount" label="Amount paid" type="number" control={control} />
                  <div className="flex gap-8">
                    <p className="font-semibold">Total to pay</p>
                    <p className="ml-auto">todo {formData.currency}</p>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-8 mt-8">
                  <TextareaInput name="note" label="Add note" control={control} />
                  <TextareaInput name="terms" label="Add tems" control={control} />
                  <TextareaInput name="bank" label="Add bank details" control={control} />
                </div>
              </div>
            </Paper>
            <div className="w-[35%] ">
              <div>
                <div className="flex justify-end gap-2 ">
                  <Button type="submit" variant="contained" className="!bg-green-600">
                    Submit
                  </Button>
                  <FormInputDropdown
                    variant="outlined"
                    name="currency"
                    size="small"
                    control={control}
                    sx={{ maxWidth: "100px" }}
                    options={[
                      { label: "€", value: "€" },
                      { label: "$", value: "$" },
                    ]}
                  />
                </div>
              </div>
              <EditInvoicePreview formData={formData} ref={printRef} total={45} subTotal={5} />
            </div>
          </div>
        </form>
      </Box>
    </>
  );
};
