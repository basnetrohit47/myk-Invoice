"use client";
import { TextFieldInput } from "@/components/formInputs/TextFieldInput";
import { WithAuth } from "@/hoc/withAuth";
import { useEditProfile } from "@/feature/hooks/useEditProfile.hook";
import { useGetProfile } from "@/feature/hooks/useGetProfile.hook";
import { EditProfileParam, EditProfileSchema } from "@/feature/params/user.param";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetProfile();
  const { mutate: editProfile } = useEditProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileParam>({
    resolver: zodResolver(EditProfileSchema),
  });
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);
  console.log("data in prof", data);
  if (isLoading) {
    return <div>....Logind</div>;
  }
  if (isError) {
    return <div>and errorro</div>;
  }
  const onSubmit: SubmitHandler<EditProfileParam> = async (profileData: EditProfileParam) => {
    console.log("dfasdf", profileData);
    await editProfile(profileData);
  };

  return (
    <>
      <Paper className="m-4 p-4" elevation={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  m-10">
            <Typography variant="h4" color="text.primary">
              Personal Information
            </Typography>
            <Button type="submit" className="ml-auto" variant="contained">
              Update
            </Button>
            {Object.entries(errors).map(([key, error]) => (
              <p key={key} style={{ color: "red" }}>
                {key}
                {error.message}
              </p>
            ))}
          </div>
          <div className="flex gap-8 m-10">
            <TextFieldInput control={control} name="username" label="Username" disabled />
            <TextFieldInput control={control} name="email" label="Email" disabled />
          </div>

          <div className="flex gap-8  m-10">
            <TextFieldInput control={control} name="first_name" label="First Name" />
            <TextFieldInput control={control} name="last_name" label="Last Name" />
          </div>
          <div className="flex gap-8  m-10">
            <TextFieldInput control={control} name="country" label="Country" />
            <TextFieldInput control={control} name="city" label="City" />
          </div>

          <div className="flex gap-8  m-10">
            <TextFieldInput className="w-[50%] pr-2" control={control} name="address" label="Address" />
          </div>
        </form>
      </Paper>
    </>
  );
};

export default WithAuth(ProfilePage);
