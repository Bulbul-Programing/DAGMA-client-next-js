'use client'

import { useCreateNoticeMutation } from "@/src/redux/Notice/noticeManagementApi";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import TTForm from "../../Form/TTForm";
import TTInput from "../../Form/TTInput";
import TTTextArea from "../../Form/TTTextArea";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { hostImages } from "@/src/utils/ImageUpload";

const CreateNotice = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [noticePhotoPreview, setNoticePhotPreview] = useState<string[] | []>(
        [],
    );
    const [noticePhoto, setNoticePhoto] = useState<File[] | []>([]);
    const [createNotice] = useCreateNoticeMutation();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (noticePhoto.length < 1) {
            return toast.error("Please select a profile picture");
        }
        setLoading(true);
        try {
            let image;

            if (noticePhoto) {
                const uploadPhoto = await hostImages(noticePhoto);

                image = uploadPhoto[0];
            }

            data.image = image;
            const res = (await createNotice(data)) as any;

            if (res?.data?.success) {
                toast.success("Notice create successfully");
                setNoticePhoto([]);
                setNoticePhotPreview([]);
                onClose()
            } else if (res?.error?.data?.errorSources) {
                res?.error?.data?.errorSources.map(
                    (error: { message: string; path: "string" }) =>
                        toast.error(error?.message || "An error occurred"),
                );
                setLoading(false)
            }
            setLoading(false);
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            setLoading(false);
        }
    }

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

    return (
        <div>
            <Button onPress={onOpen} className="bg-blue-500 text-white">Create Notice</Button>
            <div>
                <Modal isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Create A Notice</ModalHeader>
                                <ModalBody>
                                    <div className="mb-5">
                                        <div>
                                            {noticePhotoPreview.length > 0 && (
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
                                            )}
                                        </div>
                                        <TTForm onSubmit={handleSubmit}>
                                            <TTInput
                                                required
                                                label="Notice Title"
                                                name="noticeTitle"
                                            />
                                            <TTTextArea
                                                required
                                                label="Notice Description"
                                                name="noticeDescription"
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
                                                    Create Notice
                                                </Button>
                                            </div>
                                        </TTForm>
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

export default CreateNotice;