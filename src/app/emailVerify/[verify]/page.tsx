"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

import { useVerifyEmailMutation } from "@/src/redux/Users/userManagementApi";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const searchToken = searchParams.get("token");
  const router = useRouter();
  const [updateEmailVerifyStatus] = useVerifyEmailMutation();

  const status = "loading";

  useEffect(() => {
    try {
      (async function () {
        const res = (await updateEmailVerifyStatus({
          token: searchToken,
        })) as any;

        if (res?.data?.success) {
          toast.success(res.data.massage);
          router.push("/");
        }
        if (res?.error?.data) {
          toast.error(res.error?.data?.message);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [searchToken]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        {status === "loading" ? (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Verifying your email...</p>
          </div>
        ) : status === "success" ? (
          <div className="text-green-600">
            <h2 className="text-xl font-semibold">Success!</h2>
            <p>message</p>
          </div>
        ) : (
          <div className="text-red-600">
            <h2 className="text-xl font-semibold">Error</h2>
            <p>message</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
