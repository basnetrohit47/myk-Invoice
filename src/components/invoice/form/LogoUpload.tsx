import { IconButton, Typography } from "@mui/material";
import React, { useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import Image from "next/image";
import { useGetLogo, useRemoveLogo, useSetLogo } from "@/core/hooks/logo.hook";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
const LogoUpload = () => {
  const { mutate: uploadLogo } = useSetLogo();
  const { data: logo } = useGetLogo();
  const { mutate: removeLogo } = useRemoveLogo();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        uploadLogo(base64);
        // localStorage.setItem("uploadedLogo", base64); // Save to localStorage
      };
      reader.readAsDataURL(file); // Convert file to Base64 string
    }
  };
  const removeLogoo = () => {
    removeLogo();
  };
  const onFileSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      {logo ? (
        <div className="flex justify-start items-center gap-4">
          <Image width={100} src={logo} alt="" height={100} />
          <div className="d-flex flex-column justify-content-center">
            <div>
              <IconButton onClick={removeLogoo}>
                <DeleteOutlineIcon />
              </IconButton>
            </div>
            <div>
              <IconButton onClick={onFileSelectClick}>
                <CreateOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={onFileSelectClick} className=" rounded-md cursor-pointer border-2 border-dotted flex justify-center">
          <div className="p-4 text-center">
            <UploadIcon />
            <Typography>Upload logo</Typography>
            <p className="text-[8px]">240 x 240 pixels @ 72 DPI, Maximum size of 1MB.</p>
          </div>
        </div>
      )}
      <input style={{ display: "none" }} type="file" accept="image/*" onChange={onFileChanged} ref={fileInputRef} />
    </>
  );
};

export default LogoUpload;
