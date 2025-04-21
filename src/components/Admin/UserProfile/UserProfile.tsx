"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";

import TTForm from "../../Form/TTForm";
import TTInput from "../../Form/TTInput";

import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
    useUpdateUserDataMutation,
    useUserInfoQuery,
} from "@/src/redux/Users/userManagementApi";
import { verifyToken } from "@/src/utils/veryfyToken";
import { hostImages } from "@/src/utils/ImageUpload";
import { TDecodedUser } from "@/src/types/TUser";
import UserSkeleton from "@/src/Skeleton/Admin/UserSkeleton";

type TUpdateUserData = {
    name?: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
    profilePicture?: string;
};
const UserProfile = () => {
    const userToken = useAppSelector(useCurrentToken);
    const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
    const { data: userData, isLoading } = useUserInfoQuery(userInfo?.email);
    const [nameSubmitButtonDisable, setNameSubmitButtonDisable] = useState(true);
    const [passwordSubmitButtonDisable, setPasswordSubmitButtonDisable] =
        useState(true);
    const [profilePhotoSubmitButtonDisable, setProfilePhotoSubmitButtonDisable] =
        useState(true);
    const [isRequired, setIsRequired] = useState(false);
    const [updateUser] = useUpdateUserDataMutation();
    const [nameUpdateLoading, setNameUpdateLoading] = useState(false);
    const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);
    const [profilePhotoUpdateLoading, setProfilePhotoUpdateLoading] =
        useState(false);
    const [profilePhoto, setProfilePhoto] = useState<File[] | []>([]);
    const [profilePreview, setProfilePreview] = useState<string[] | []>([]);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (userToken) {
            const decodedToken = verifyToken(userToken);

            if (decodedToken) {
                setUserInfo(decodedToken);
            } else {
                dispatch(logout());
                router.push("/login");
            }
        } else {
            setUserInfo({});
        }
    }, [userToken]);

    const handleOnchange = (fieldName: string) => {
        if (fieldName === "name") {
            setNameSubmitButtonDisable(false);
        }

        if (
            fieldName === "currentPassword" ||
            fieldName === "newPassword" ||
            fieldName === "retypePassword"
        ) {
            setPasswordSubmitButtonDisable(false);
            setIsRequired(true);
        }
    };

    const handleUpdateProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setIsRequired(false);
        setProfilePhotoSubmitButtonDisable(false);
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

    const handleProfilePhoto: SubmitHandler<FieldValues> = async () => {
        setProfilePhotoUpdateLoading(true);
        let updateData = {} as TUpdateUserData;

        if (profilePhoto.length > 0) {
            const uploadPhoto = await hostImages(profilePhoto);

            updateData.profilePicture = uploadPhoto[0];
        }
        updateData.email = userData?.data?.email;
        try {
            const res = (await updateUser(updateData)) as any;

            if (res?.data?.data?.modifiedCount > 0) {
                setProfilePhotoUpdateLoading(false);
                toast.success("User data updated successfully.");
                setProfilePhotoSubmitButtonDisable(true);
            } else if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
                setProfilePhotoUpdateLoading(false);
            }
        } catch (error: any) {
            toast.error("An error occurred while updating user data.");
            setProfilePhotoUpdateLoading(false);
        }
    };

    const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
        setNameUpdateLoading(true);
        let updateData = {} as TUpdateUserData;

        if (data.name !== userData?.data?.name) {
            updateData.name = data.name;
        }

        updateData.email = userData?.data?.email;
        try {
            const res = (await updateUser(updateData)) as any;

            if (res?.data?.data?.modifiedCount > 0) {
                setNameUpdateLoading(false);
                setProfilePhotoUpdateLoading(false);
                toast.success("User data updated successfully.");
                setNameSubmitButtonDisable(true);
                setIsRequired(false);
            } else if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
                setNameUpdateLoading(false);
                setProfilePhotoUpdateLoading(false);
            }
        } catch (error: any) {
            toast.error("An error occurred while updating user data.");
            setNameUpdateLoading(false);
            setProfilePhotoUpdateLoading(false);
        }
    };

    const handleUpdatePassword: SubmitHandler<FieldValues> = async (data) => {
        setPasswordUpdateLoading(true);
        let updateData = {} as TUpdateUserData;

        if (!data.currentPassword || !data.newPassword || !data.retypePassword) {
            return toast.error("Please fill all field for update password");
        }

        if (data.currentPassword && data.newPassword && data.retypePassword) {
            if (
                data.currentPassword.length < 6 ||
                data.newPassword.length < 6 ||
                data.retypePassword.length < 6
            ) {
                setPasswordUpdateLoading(false);

                return toast.error("Passwords should be at least 6 characters long.");
            }
            if (data.newPassword !== data.retypePassword) {
                setPasswordUpdateLoading(false);

                return toast.error("Passwords do not match.");
            }
            updateData.newPassword = data.newPassword;
            updateData.currentPassword = data.currentPassword;
        }

        updateData.email = userData?.data?.email;
        try {
            const res = (await updateUser(updateData)) as any;

            if (res?.data?.data?.modifiedCount > 0) {
                setPasswordUpdateLoading(false);
                toast.success("User data updated successfully.");
                setPasswordSubmitButtonDisable(true);
                setIsRequired(false);
            } else if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
                setPasswordUpdateLoading(false);
            }
        } catch (error: any) {
            toast.error("An error occurred while updating user data.");
            setPasswordUpdateLoading(false);
        }
    };

    if (isLoading) {
        return <UserSkeleton />;
    }

    return (
        <div>
            {/* <h1 className="text-xl font-medium text-center">Welcome back <span className="text-2xl">{data?.data?.name}</span></h1> */}
            <div className="bg-gradient-to-r from-blue-500/50 to-blue-700/50 py-10 md:py-10 lg:py-16 rounded-tl-[60px]" />
            <div className="flex flex-col md:flex-row lg:flex-row justify-between md:justify-between lg:justify-between items-center">
                <div className="flex flex-col md:flex-row lg:flex-row justify-center md:justify-start lg:justify-start items-center mt-[-30px] mx-10">
                    <div className="relative group">
                        <Image
                            alt=""
                            className="w-[150px] border-[5px] border-white shadow-2xl h-[150px] rounded-full"
                            height={120}
                            src={
                                profilePreview.length > 0
                                    ? profilePreview[0]
                                    : userData?.data?.profilePicture
                            }
                            width={120}
                        />
                        <label
                            className="absolute inset-0 transition-all ease-out flex items-center group-hover:opacity-100 opacity-0 justify-center bg-black bg-opacity-40 cursor-pointer rounded-full"
                            htmlFor="profilePicture"
                        >
                            <IoCameraOutline className="text-3xl text-white font-bold" />
                        </label>
                        <input
                            accept="image/jpeg, image/png"
                            className="hidden"
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            onChange={handleUpdateProfilePicture}
                        />
                    </div>
                    <div className=" ml-0 md:ml-7 lg:ml-7 my-3 md:my-0 lg:my-0">
                        <h1 className="text-2xl text-center md:text-left lg:text-left font-semibold">
                            {userData?.data?.name}
                        </h1>
                        <h1 className="text-center text-slate-600 md:text-left lg:text-left">
                            Email: {userData?.data?.email}
                        </h1>
                        <h1 className="text-center text-slate-600 md:text-left lg:text-left">
                            Phone: {userData?.data?.phoneNumber}
                        </h1>
                    </div>
                </div>
                <div>
                    {
                        profilePhotoSubmitButtonDisable ? <Button
                            className={` ${profilePhotoSubmitButtonDisable ? "bg-slate-100  cursor-not-allowed" : "bg-blue-500 text-white"} font-semibold `}
                            disabled={profilePhotoSubmitButtonDisable}
                            isLoading={profilePhotoUpdateLoading}
                            size="md"
                            type="submit"
                        >
                            Update Profile Photo
                        </Button> :
                            <Button
                                className={` ${profilePhotoSubmitButtonDisable ? "bg-slate-100  cursor-not-allowed" : "bg-blue-500 text-white"} font-semibold `}
                                disabled={profilePhotoSubmitButtonDisable}
                                isLoading={profilePhotoUpdateLoading}
                                size="md"
                                type="submit"
                                onPress={handleProfilePhoto}
                            >
                                Update Profile Photo
                            </Button>
                    }
                </div>
            </div>
            <div className="max-w-2xl mx-auto mt-5 bg-white rounded-lg ">
                <h2 className="text-xl font-semibold mb-1">Update Your Profile</h2>
                <TTForm onSubmit={handleUpdate}>
                    <div className="flex flex-col md:flex-row lg:flex-row items-center gap-x-3">
                        <TTInput
                            defaultValue={userData?.data?.name}
                            label="Name"
                            name="name"
                            required={false}
                            onChange={() => handleOnchange("name")}
                        />
                        <Button
                            className={`w-full md:w-40 lg:w-40 ${nameSubmitButtonDisable ? "bg-slate-100  cursor-not-allowed" : "bg-blue-500 text-white"} font-semibold `}
                            disabled={nameSubmitButtonDisable}
                            isLoading={nameUpdateLoading}
                            size="lg"
                            type="submit"
                        >
                            Update Name
                        </Button>
                    </div>
                </TTForm>
                <TTForm onSubmit={handleUpdatePassword}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-3">
                        <TTInput
                            defaultValue={userData?.data?.email}
                            disabled={true}
                            label="email"
                            name="email"
                            required={false}
                        />
                        <TTInput
                            label="Current password"
                            name="currentPassword"
                            type="password"
                            onChange={() => handleOnchange("currentPassword")}
                        />
                        <TTInput
                            label="New password"
                            name="newPassword"
                            type="password"
                            onChange={() => handleOnchange("newPassword")}
                        />
                        <TTInput
                            label="Retype password"
                            name="retypePassword"
                            type="password"
                            onChange={() => handleOnchange("retypePassword")}
                        />
                    </div>
                    <Button
                        className={`w-full ${passwordSubmitButtonDisable ? "bg-slate-100  cursor-not-allowed" : "bg-blue-500 text-white"} font-semibold `}
                        disabled={passwordSubmitButtonDisable}
                        isLoading={passwordUpdateLoading}
                        size="lg"
                        type="submit"
                    >
                        Update Password
                    </Button>
                </TTForm>
            </div>
        </div>
    );
};

export default UserProfile;
