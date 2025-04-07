"use client";
import { Button } from "@heroui/button";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";

import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
import {
  useLoginUserMutation,
  useResetPasswordMailSendMutation,
} from "@/src/redux/Users/userManagementApi";
import { useAppDispatch } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/features/Auth/authSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [modalLoading, setModalLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [resetPasswordMailSend] = useResetPasswordMailSendMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = (await loginUser(data)) as any;

      if (res.data && res.data.success) {
        toast.success("Logged in successfully");
        setLoading(false);
        const token = {
          accessToken: res?.data?.accessToken,
          refreshToken: res?.data?.refreshToken,
        };

        dispatch(setUser(token));
        router.push("/");
      }
      if (res.error) {
        toast.error(res.error.data.message);
        setLoading(false);
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleResetPassword: SubmitHandler<FieldValues> = async (data) => {
    setModalLoading(true);
    try {
      const res = await resetPasswordMailSend(data.email);

      if (res?.data?.success) {
        setModalLoading(false);
        router.push("/");
        toast.success("Reset Password has been sent to your email");
      }
    } catch (err: any) {
      setModalLoading(false);
      toast.error(err?.message || "An error occurred");
    }
  };

  return (
    <div className="relative ">
      <div className="flex justify-center bg-slate-100 items-center h-screen">
        <div className="w-10/12  md:w-6/12 lg:w-4/12 backdrop-blur-lg bg-white bg-opacity-80 px-4 py-6 rounded-lg">
          <h1 className="text-center text-lg font-semibold">Login</h1>
          <div>
            <TTForm onSubmit={handleSubmit}>
              <TTInput label="email" name="email" type="email" />
              <TTInput label="Password" name="password" type="password" />
              <Button
                className="w-full bg-blue-500 text-white font-bold text flex-1"
                isLoading={loading}
                type="submit"
              >
                Login
              </Button>
            </TTForm>
          </div>
          <div>
            <p className="text-sm text-gray-600 mt-4">
              Forgot your password?
              <Button
                className="text-blue-500 bg-transparent underline"
                variant="solid"
                onPress={onOpen}
              >
                Reset Password
              </Button>
            </p>
          </div>
          <div className="flex items-center mt-4">
            <div className="border-b border-gray-400 w-full" />
            <p className="px-2 text-sm font-medium">OR</p>
            <div className="border-b border-gray-400 w-full" />
          </div>
          <p className="text-slate-600 mt-3">
            Don&apos;t have an account ?{" "}
            <Link className="text-blue-500 underline " href="/register">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Enter your email for reset password
                </ModalHeader>
                <ModalBody>
                  <TTForm onSubmit={handleResetPassword}>
                    <TTInput label="email" name="email" type="email" />
                    <Button
                      className="w-full bg-blue-500 mb-3 text-white font-semibold text flex-1"
                      isLoading={modalLoading}
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  </TTForm>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
