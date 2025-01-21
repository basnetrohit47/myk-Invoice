"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "@mui/material";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavigationMenu = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="flex gap-2 items-center w-full">
            <Link href={"/invoice"}>My Invoices</Link>
            <div className="ml-auto flex ">
              <ThemeToggle />
              <ProfileAvatar />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="ml-auto flex ">
            <ThemeToggle />
            <Button component={Link} href="/login">
              Login
            </Button>
            <Button>Register</Button>
          </div>
        </>
      )}
    </>
  );
};

export default NavigationMenu;
