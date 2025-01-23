"use client";
import { TextareaInput } from "../../formInputs/TextareaInput";
import { Box, Button, Paper } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ItemFields } from "./ItemFields";
import { FormInputDropdown } from "../../formInputs/DropdownInput";
import { TextFieldInput } from "@/components/formInputs/TextFieldInput";
import { CreateInvoiceParams, CreateInvoiceSchema } from "@/core/params/invoice.param";
import { handleDownloadPdf } from "@/utils/downloadPdf";
import { useRef } from "react";
import ClassicInvoicePreview from "../preview/ClassicInvoicePreview";
import { invoice_total } from "@/utils/invoiceTotal";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateInvoice } from "@/core/hooks/invoice.hook";
import LogoUpload from "./LogoUpload";

export const InvoiceForm = () => {
  const today = new Date();
  const { mutate: createInvoice } = useCreateInvoice();
  const { isAuthenticated } = useAuth();

  const { control, handleSubmit, watch } = useForm<CreateInvoiceParams>({
    resolver: zodResolver(CreateInvoiceSchema),
    defaultValues: {
      products: [{ name: "", rate: null, quantity: null }],
      issue_date: today.toISOString().split("T")[0],
      due_date: "default",
      tax_sign: "amount",
      discount_sign: "amount",
      currency: "USD",
    },
  });
  const onSubmit: SubmitHandler<CreateInvoiceParams> = async (formData) => {
    if (isAuthenticated) {
      await createInvoice(formData);
    } else {
      handleDownloadPdf(printRef);
    }
  };

  const formData = watch();
  const { total, subTotal } = invoice_total(formData);

  const printRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Box>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8 ">
            <Paper className="px-8 py-12 m-2   rounded-lg w-[65%]">
              <div className="flex gap-8 ">
                <div className="flex flex-col gap-6 w-[50%]">
                  <LogoUpload />
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
                <ItemFields control={control} />
              </div>

              <div className="flex flex-col  items-end">
                <div className="flex flex-col gap-6 w-[40%] mb-10">
                  <div className="flex gap-8">
                    <p className="">Sub Total</p>
                    <p className="ml-auto">
                      {subTotal} {formData.currency}
                    </p>
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
                        name="discount_sign"
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
                    <p className="ml-auto">
                      {total} {formData.currency}
                    </p>
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
                    {isAuthenticated ? "Submit" : "Download"}
                  </Button>
                  <FormInputDropdown
                    variant="outlined"
                    name="currency"
                    size="small"
                    control={control}
                    sx={{ maxWidth: "110px" }}
                    options={[
                      { label: "€ (EUR)", value: "USD" },
                      { label: "$ (USD)", value: "EUR" },
                    ]}
                  />
                </div>
              </div>
              <ClassicInvoicePreview formData={formData} ref={printRef} total={total} subTotal={subTotal} />
            </div>
          </div>
        </form>
      </Box>
    </>
  );
};
