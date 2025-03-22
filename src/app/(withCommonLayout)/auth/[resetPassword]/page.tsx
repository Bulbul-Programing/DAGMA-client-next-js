"use client";
import { Button } from "@heroui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";

import { useResetPasswordMutation } from "@/src/redux/Users/userManagementApi";
import TTInput from "@/src/components/Form/TTInput";
import TTForm from "@/src/components/Form/TTForm";
const ResetPassword = () => {
  const [submitResetCode, setSubmitResetCode] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  const searchParams = useSearchParams();
  const searchToken = searchParams.get("token");

  useEffect(() => {
    onOpen();
    if (!searchToken) {
      return router.push("/");
    }
  }, [searchToken]);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const firstPasswords = data.password;
    const secondPasswords = data.retypePassword;

    if (firstPasswords !== secondPasswords) {
      return toast.error("Passwords do not match.");
    }
    const payloadData = {
      password: data.password,
      token: searchToken,
    };

    try {
      setLoading(true);
      const res = (await resetPassword(payloadData)) as any;

      if (res?.data?.success) {
        setLoading(false);
        toast.success("Password has been reset successfully.");
        setSubmitResetCode(false);
        router.push("/login");
      }
      if (res?.error?.data) {
        setLoading(false);
        toast.error(res.error?.data?.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-lg to-blue-100 font-medium text-center">
                Reset Your password!
              </ModalHeader>
              <ModalBody>
                <TTForm onSubmit={handleSubmit}>
                  <TTInput
                    label="New password"
                    name="password"
                    type="password"
                  />
                  <TTInput
                    label="Retype Password"
                    name="retypePassword"
                    type="password"
                  />
                  <Button
                    className="w-full bg-[#17D893] font-bold text flex-1 mb-3"
                    isLoading={loading}
                    type="submit"
                  >
                    Reset password
                  </Button>
                </TTForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResetPassword;
