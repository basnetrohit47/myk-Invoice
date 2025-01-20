"use client";
import { TextFieldInput } from "@/components/formInputs/TextFieldInput";
import { useAuth } from "@/contexts/AuthContext";
import { useLoginUser } from "@/core/hooks/userLoginUser.hook";
import { LoginParam, LoginSchema } from "@/core/params/user.param";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { login } = useAuth();
  const { mutateAsync: loginUser } = useLoginUser();

  const { control, handleSubmit } = useForm<LoginParam>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });
  const router = useRouter();
  const onSubmit = async (formData: LoginParam) => {
    const response = await loginUser(formData);
    if (response) {
      login(response.access);
    }
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-gray-500">
        <div className="text-center p-8 w-[40%] bg-slate-200 rounded-xl">
          <div className="p-4 mb-4">
            <h2 className="text-[2rem]">Login</h2>
            <p className="text-gray-600">Nice to see you again</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
            <div className="flex flex-col gap-12">
              <TextFieldInput label="Email" control={control} name="username" required />

              <TextFieldInput label="Password" type="password" name="password" control={control} required />
            </div>
            <div>
              <Button type="submit" size="large" variant="contained" fullWidth>
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
