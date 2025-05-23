"use client";

import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
import { useRegisterUserMutation } from "@/src/redux/Users/userManagementApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/features/Auth/authSlice";
import { hostImages } from "@/src/utils/ImageUpload";
import registerValidationSchema from "@/src/schemas/register.schemas";
import { authContext } from "@/src/components/AuthProvider/AuthProvider";

const Register = () => {
  const [profilePreview, setProfilePreview] = useState<string[] | []>([]);
  const [profilePhoto, setProfilePhoto] = useState<File[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [signUpUser] = useRegisterUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { googleLogin } = useContext(authContext);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (profilePhoto.length < 1) {
      return toast.error("Please select a profile picture");
    }
    setLoading(true);
    try {
      let profilePicture;

      if (profilePhoto) {
        const uploadPhoto = await hostImages(profilePhoto);

        profilePicture = uploadPhoto[0];
      }

      data.profilePicture = profilePicture;
      data.role = "user";
      data.followers = [];
      data.following = [];

      const res = (await signUpUser(data)) as any;

      if (res?.data?.success) {
        toast.success("User created successfully");
        const token = {
          accessToken: res?.data?.data?.accessToken,
          refreshToken: res?.data?.data?.refreshToken,
        };

        dispatch(setUser(token));
        router.push("/");
      } else if (res?.error?.data?.errorSources) {
        res?.error?.data?.errorSources.map(
          (error: { message: string; path: "string" }) =>
            toast.error(res?.error?.data?.message || "An error occurred"),
        );
      }
      setLoading(false);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred";

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setProfilePhoto([file]);
    if (file) {
      setProfilePreview([]);
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin().then((res: any) => console.log(res));
  };

  return (
    <div className="flex bg-slate-100 justify-center items-center min-h-screen">
      <div className=" w-10/12  md:w-6/12 lg:w-4/12 bg-white backdrop-blur-lg bg-opacity-80 px-4 py-6 rounded-lg">
        <h1 className="text-center text-lg font-semibold">Register</h1>
        <div>
          {profilePreview.length > 0 && (
            <div>
              {profilePreview.map((profile) => (
                <Image
                  key={profile}
                  alt="profileImage"
                  className="border w-20 h-20  rounded-full block mt-2 mx-auto"
                  height={80}
                  src={profile}
                  width={80}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          {/* <FormProvider {...methods}> */}
          <TTForm resolver={registerValidationSchema} onSubmit={onSubmit}>
            <TTInput label="Name" name="name" type="text" />
            <TTInput label="Email" name="email" type="email" />
            <TTInput label="Password" name="password" type="password" />
            <TTInput label="Phone Number" name="phoneNumber" type="string" />
            <div className="my-4">
              <label
                className="py-3 text-sm px-2 border bg-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-300 ease-out font-medium text-center block w-full"
                htmlFor="profilePhoto"
              >
                Chose Profile image
              </label>
              <input
                accept="image/png, image/jpeg"
                className="hidden"
                id="profilePhoto"
                name="profileImage"
                type="file"
                onChange={handlePhoto}
              />
            </div>
            <Button
              className="w-full bg-blue-500 text-white font-bold text flex-1"
              isLoading={loading}
              type="submit"
            >
              register
            </Button>
          </TTForm>
          {/* </FormProvider> */}
        </div>
        <div className="flex justify-center gap-x-4">
          <button onClick={handleGoogleLogin}>
            <FcGoogle className=" mt-2 text-3xl text-blue-500" />
          </button>
        </div>
        <div className="flex items-center mt-4">
          <div className="border-b border-gray-400 w-full" />
          <p className="px-2 text-sm font-medium">OR</p>
          <div className="border-b border-gray-400 w-full" />
        </div>
        <p className="text-slate-600 mt-3">
          Have an account ?{" "}
          <Link className="text-blue-500 underline " href="/login">
            login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
