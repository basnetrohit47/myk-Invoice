"use client";
import { TextFieldInput } from "@/components/formInputs/TextFieldInput";
import { useRegisterUser } from "@/core/hooks/user.hook";
import { RegisterParams, RegisterSchema } from "@/core/params/user.param";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { mutateAsync: registerUser } = useRegisterUser();

  const { control, handleSubmit } = useForm<RegisterParams>({
    resolver: zodResolver(RegisterSchema),
    // defaultValues: { email: "", password: "", first_name: "", last_name: "", password2: "" },
  });
  const router = useRouter();
  const onSubmit = async (formData: RegisterParams) => {
    await registerUser(formData);
    router.push("/login");
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] ">
        <Paper className="text-center p-8 w-[40%]  rounded-xl " elevation={2}>
          <div className="p-4 mb-4">
            <h2 className="text-[2rem]">Register</h2>
            <p className="">Welcom to Myk-invoic</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
            <div className="flex  gap-2">
              <TextFieldInput label="First name" name="first_name" type="text" control={control} required />

              <TextFieldInput label="Last name" type="password" name="last_name" control={control} required />
            </div>
            <div className="flex flex-col gap-12">
              <TextFieldInput label="Email" control={control} name="email" type="email" required />
            </div>
            <div className="flex flex-col gap-12">
              <TextFieldInput label="Password" type="password" name="password" control={control} required />
            </div>
            <div className="flex flex-col gap-12">
              <TextFieldInput label="Password" type="password" name="password2" control={control} required />
            </div>
            <div>
              <Button type="submit" size="large" variant="contained" fullWidth>
                Register
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default LoginPage;
