'use client'
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import React, { ChangeEvent, useState } from 'react';
import TTForm from '../../Form/TTForm';
import TTInput from '../../Form/TTInput';
import TTTextArea from '../../Form/TTTextArea';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useCreateGalleryMutation } from '@/src/redux/Gallery/galleryManagementApi';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'sonner';
import { hostImages } from '@/src/utils/ImageUpload';

export type GalleryItem = {
    file: File;
    url: string;
};

const GalleryCreate = () => {
    //API Section
    const [createGallery] = useCreateGalleryMutation()

    // State management
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false)
    const [galleryPhoto, setGalleryPhoto] = useState<GalleryItem[]>([]);

    const handleRemovePhoto = (imageLink: string) => {
        setGalleryPhoto((prev) => prev.filter((img) => img.url !== imageLink))
    }

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (galleryPhoto.length < 1) {
            return toast.error("Please select a gallery photos");
        }
        setLoading(true);
        try {
            let image;

            const files = galleryPhoto.map((file) => file.file)

            if (galleryPhoto) {
                const uploadPhoto = await hostImages(files);
                image = uploadPhoto
            }

            data.photos = image;

            const res = (await createGallery(data)) as any;

            if (res?.data?.success) {
                toast.success(res?.data?.massage || "Notice create successfully");
                setGalleryPhoto([])
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
        const file = e.target.files

        if (file) {
            const filesArray = Array.from(file);

            filesArray.forEach((file) => {
                const reader = new FileReader()

                reader.onloadend = () => {
                    setGalleryPhoto((prev) => [...prev, { file: file, url: reader.result as string }]);
                };
                reader.readAsDataURL(file);
            })
        }
    };

    return (
        <div>
            <Button onPress={onOpen} className="bg-blue-500 text-white">Create New Gallery</Button>
            <div>
                <Modal isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Create A Gallery</ModalHeader>
                                <ModalBody>
                                    <div className="mb-5">
                                        <div>
                                            {galleryPhoto.length > 0 && (
                                                <div className="flex justify-center flex-wrap gap-2">
                                                    {galleryPhoto.map((profile) => (
                                                        <div key={profile.url} className='group relative'>
                                                            <Image
                                                                alt="profileImage"
                                                                className="rounded-md object-cover h-[80px] w-[80px] border-2 p-1"
                                                                height={140}
                                                                src={profile.url}
                                                                width={250}
                                                            />
                                                            <RxCross2 onClick={() => handleRemovePhoto(profile.url)} size={20} className=' hover:cursor-pointer absolute group-hover:block hidden z-50 -top-2 -right-2' />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <TTForm onSubmit={handleSubmit}>
                                                <TTInput label='Gallery Name' name='galleryName' />
                                                <TTTextArea label='Gallery Description' name='galleryDescription' />
                                                <div className="my-4">
                                                    <label
                                                        className="py-3 text-sm px-2 border bg-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-300 ease-out font-medium text-center block w-full"
                                                        htmlFor="galleryPhotos"
                                                    >
                                                        Chose Gallery photos
                                                    </label>
                                                    <input
                                                        accept="image/png, image/jpeg"
                                                        className="hidden"
                                                        id="galleryPhotos"
                                                        name="galleryPhotos"
                                                        type="file"
                                                        multiple={true}
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
                                                        Create Gallery
                                                    </Button>
                                                </div>
                                            </TTForm>
                                        </div>
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

export default GalleryCreate;