'use client'
import { useDeleteNoticeMutation, useGetAllNoticesQuery, useUpdateNoticeStatusMutation } from "@/src/redux/Notice/noticeManagementApi";
import { TNotice } from "@/src/types/TNotice";
import Image from "next/image";
import { FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import TTForm from "../../Form/TTForm";
import TTInput from "../../Form/TTInput";
import TTTextArea from "../../Form/TTTextArea";
import { Button } from "@heroui/button";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { hostImages } from "@/src/utils/ImageUpload";
import NoticeTableSkeleton from "@/src/Skeleton/Admin/NoticeTableSkeleton";
import NoDataFound from "../../NoDataFound";

const AllNoticeAdmin = () => {
    // Data retrieve and update api section
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { data: notices, isLoading } = useGetAllNoticesQuery(undefined)
    const [updateNotice] = useUpdateNoticeStatusMutation();
    const [deleteNotice] = useDeleteNoticeMutation();

    // state management section
    const [noticePhotoPreview, setNoticePhotPreview] = useState<string[] | []>([]);
    const [noticePhoto, setNoticePhoto] = useState<File[] | []>([]);
    const [loading, setLoading] = useState(false)
    const [updateNoticeId, setUpdateNoticeId] = useState('')

    // update notice
    const handleUpdateNotice: SubmitHandler<FieldValues> = async (data) => {
        const notice = notices?.data?.filter((notice: TNotice) => notice._id === updateNoticeId)[0]

        if (data.noticeTitle === notice.noticeTitle) {
            delete data.noticeTitle
        }
        if (data.noticeDescription === notice.noticeDescription) {
            delete data.noticeDescription
        }
        if (noticePhoto.length > 0) {
            setLoading(true);
            const uploadPhoto = await hostImages(noticePhoto);
            data.image = uploadPhoto[0];
        }

        if (Object.keys(data).length < 1) {
            return toast.error('Please minimum one field update.')
        }


        try {
            const payload = {
                id: updateNoticeId,
                updateInfo: data
            }
            setLoading(true);
            const res = (await updateNotice(payload)) as any;

            if (res?.data?.success) {
                toast.success(res?.data?.massage || "Notice update successfully");
                setNoticePhoto([]);
                setLoading(false);
                setNoticePhotPreview([]);
                onClose()
            } else if (res?.error?.data?.errorSources) {
                res?.error?.data?.errorSources.map(
                    (error: { message: string; path: "string" }) =>
                        toast.error(error?.message || "An error occurred"),
                );
                setLoading(false)
            }
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            setLoading(false);
        }

    }

    // update notice status section
    const updateNoticeStatus = async (id: string, blockStatus: boolean) => {
        const updateData = {
            id,
            updateInfo: { isBlock: blockStatus },
        };

        try {
            const res = (await updateNotice(updateData)) as any;

            if (res?.data?.success) {
                toast.success(res.data.massage);
            }
            if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
            }
        } catch (err: any) {
            toast.error("An error occurred while updating user data.");
        }
    };

    // delete notice
    const handleDeleteNotice = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: { isConfirmed: boolean }) => {
            if (result.isConfirmed) {
                try {
                    const res = (await deleteNotice(id)) as any;

                    if (res?.data?.success) {
                        toast.success(res?.data?.massage);
                    }
                    if (res?.error?.data?.message) {
                        toast.error(res?.error?.data?.message || "An error occurred");
                    }
                } catch (err: any) {
                    toast.error("An error occurred while updating user data.");
                }
            }
        });
    };

    const handleUpdateNoticeInfo = (id: string) => {
        setUpdateNoticeId(id)
        onOpen()
    }

    // handle update photo
    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setNoticePhoto([file]);
        if (file) {
            setNoticePhotPreview([]);
            const reader = new FileReader();

            reader.onloadend = () => {
                setNoticePhotPreview((prev) => [...prev, reader.result as string]);
            };

            reader.readAsDataURL(file);
        }
    };

    if (isLoading) {
        return <NoticeTableSkeleton />
    }

    if (!notices?.data?.length) {
            return <NoDataFound />
        }

    return (
        <div>
            <div className="overflow-x-auto my-5">
                <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-500/50 to-blue-500/50 text-black">
                        <tr>
                            <th className="px-2 py-3 text-left text-sm font-medium">Image</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">
                                Notice Title
                            </th>
                            <th className="px-2 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">
                                Publish Date
                            </th>
                            <th className="px-2 py-3 text-center text-sm font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices?.data?.map((notice: TNotice) => (
                            <tr
                                key={notice._id}
                                className="border-b last:border-none hover:bg-gray-50 transition"
                            >
                                <td className="p-2">
                                    <Image
                                        alt={notice.noticeTitle}
                                        className="w-10 h-10 object-cover rounded-full shadow-md"
                                        height={30}
                                        src={notice.image}
                                        width={30}
                                    />
                                </td>
                                <td className="min-w-44 py-2 font-semibold">
                                    {notice.noticeTitle}
                                </td>
                                <td
                                    className={`${notice.isBlock ? "text-orange-500" : "text-blue-500"} font-bold`}
                                >
                                    {notice.isBlock ? "Block" : "Unblock"}
                                </td>
                                <td className="min-w-32 py-2 font-semibold">
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </td>
                                <td className=" flex justify-center">
                                    <div className="flex">
                                        {notice.isBlock ? (
                                            <FaRegEye
                                                className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                onClick={() =>
                                                    updateNoticeStatus(notice._id, !notice.isBlock)
                                                }
                                            />
                                        ) : (
                                            <FaRegEyeSlash
                                                className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                onClick={() =>
                                                    updateNoticeStatus(notice._id, !notice.isBlock)
                                                }
                                            />
                                        )}
                                        <FaEdit
                                            className="text-[40px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                            onClick={() => handleUpdateNoticeInfo(notice._id)}
                                        />
                                        <FaRegTrashAlt
                                            className="text-[40px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                            onClick={() => handleDeleteNotice(notice._id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Modal isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Update Notice</ModalHeader>
                                <ModalBody>
                                    <div>
                                        {
                                            notices?.data?.map((notice: TNotice) => notice._id === updateNoticeId && (
                                                <div className="mb-5" key={notice._id}>
                                                    <div>
                                                        {noticePhotoPreview.length > 0 ? (
                                                            <div className="flex justify-center">
                                                                {noticePhotoPreview.map((profile) => (
                                                                    <Image
                                                                        key={profile}
                                                                        alt="profileImage"
                                                                        className="rounded-md object-cover h-[140px] w-[250px] border-2"
                                                                        height={140}
                                                                        src={profile}
                                                                        width={250}
                                                                    />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="flex justify-center">
                                                                <Image
                                                                    key={notice.noticeTitle}
                                                                    alt="profileImage"
                                                                    className="rounded-md object-cover h-[140px] w-[250px]"
                                                                    height={140}
                                                                    src={notice.image}
                                                                    width={250}
                                                                />
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                    <TTForm onSubmit={handleUpdateNotice}>
                                                        <TTInput
                                                            defaultValue={notice.noticeTitle}
                                                            required
                                                            label="Notice Title"
                                                            name="noticeTitle"
                                                        />
                                                        <TTTextArea
                                                            required
                                                            label="Notice Description"
                                                            name="noticeDescription"
                                                            defaultValue={notice.noticeDescription}
                                                        />
                                                        <div className="my-4">
                                                            <label
                                                                className="py-3 text-sm px-2 border bg-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-300 ease-out font-medium text-center block w-full"
                                                                htmlFor="noticePhoto"
                                                            >
                                                                Chose Notice image
                                                            </label>
                                                            <input
                                                                accept="image/png, image/jpeg"
                                                                className="hidden"
                                                                id="noticePhoto"
                                                                name="noticePhoto"
                                                                type="file"
                                                                onChange={handlePhoto}
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-x-3">
                                                            <Button
                                                                color="danger"
                                                                variant="flat"
                                                                onPress={onClose}
                                                            >
                                                                Close
                                                            </Button>
                                                            <Button color="primary" isLoading={loading} type="submit">
                                                                Update Notice
                                                            </Button>
                                                        </div>
                                                    </TTForm>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default AllNoticeAdmin;