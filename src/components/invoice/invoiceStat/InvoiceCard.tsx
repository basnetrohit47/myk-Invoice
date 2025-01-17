import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import amountFormat from "@/utils/amountFormat";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
interface Props {
  image: string;
  amount: number;
  total: number;
  title: string;
  bgClass?: string;
}
const InvoiceCard = ({ image, amount, total, title, bgClass = "bg-[#517d91]" }: Props) => {
  return (
    <Card className="w-full  !rounded-lg" elevation={0}>
      <CardContent>
        <Typography variant="h5" component="div">
          <div className={`${bgClass} rounded-full w-10 h-10 p-2 flex justify-center items-center`}>{<Image src={image} alt="Logo" width="30" height="30" />}</div>
        </Typography>
        <div className="mt-4 mb-4">
          <Typography className="mt-2 uppercase text-[0.8rem]   " color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" className="">
            {amountFormat(amount)} USD
          </Typography>
        </div>

        <div className="flex gap-1 items-center">
          {/* <Image src={invoice} alt="Logo" width="12" height="12" /> */}
          <DescriptionOutlinedIcon className="text-[1rem]" />
          <Typography variant="body2">{total}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
