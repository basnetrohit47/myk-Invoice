import { Paper } from "@mui/material";
import logo from "../../public/logo.svg";
import Image from "next/image";
import NavigationMenu from "./NavigationMenu";
import Link from "next/link";
const NavigationBar = () => {
  return (
    <Paper className="flex p-4 shadow-lg rounded-none" elevation={0} style={{ boxShadow: "0 .375rem 1.5rem 0 rgba(140,152,164,.125)" }}>
      <div className="flex items-center w-[20%]">
        <Image src={logo} alt="Logo" width="30" height="30" />
        <Link href={"/"}> Free invoice Generator</Link>
      </div>
      <div className="flex w-full">
        <NavigationMenu />
      </div>
    </Paper>
  );
};

export default NavigationBar;
