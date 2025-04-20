'use client'

import { useGetAllGalleryAdminQuery, useUpdateGalleryMutation } from "@/src/redux/Gallery/galleryManagementApi";
import { TGallery } from "@/src/types/TGallery";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import ImagePreview from "../../ImagePreview";
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { ChangeEvent, useRef, useState } from "react";
import type { LightGallery as LightGalleryType } from "lightgallery/lightgallery";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import TTForm from "../../Form/TTForm";
import TTInput from "../../Form/TTInput";
import TTTextArea from "../../Form/TTTextArea";
import { Button } from "@heroui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GalleryItem } from "./GalleryCreate";
import { RxCross2 } from "react-icons/rx";
import { hostImages } from "@/src/utils/ImageUpload";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import('lightgallery/react'), {
    ssr: false
});

const AllGalleryAdmin = () => {
    // retrirve Data
    const { data: gallery, isLoading } = useGetAllGalleryAdminQuery(undefined)
    const [updateGallery] = useUpdateGalleryMutation()

    // State management
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [galleryId, setGalleryId] = useState('')
    const lightGalleryRef = useRef<any>(null)
    const [galleryPhoto, setGalleryPhoto] = useState<GalleryItem[]>([]);
    const [previousGalleryPhoto, setPreviousGalleryPhoto] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [lightGalleryPhoto, setLightGalleryPhoto] = useState<string[]>([])

    const onEdit = (id: string) => {
        setGalleryId(id)
        const thisGallery = gallery?.data?.filter((gallery: TGallery) => gallery._id === id)[0]
        setPreviousGalleryPhoto(thisGallery.photos)
        onOpen()
    }

    const onDelete = (id: string) => {

    }

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const thisGallery = gallery?.data?.filter((gallery: TGallery) => gallery._id === galleryId)[0]
        if (thisGallery.galleryName === data.galleryName) {
            delete data.galleryName
        }
        if (thisGallery.galleryDescription === data.galleryDescription) {
            delete data.galleryDescription
        }

        if (galleryPhoto.length > 0) {
            setLoading(true);
            const files = galleryPhoto.map((file) => file.file)
            const uploadPhoto = await hostImages(files);
            data.photos = [...uploadPhoto];
        }

        if (thisGallery.photos.length !== previousGalleryPhoto.length) {
            data.photos = [...previousGalleryPhoto]
        }

        if (Object.keys(data).length < 1) {
            return toast.error('Please minimum one field update.')
        }

        try {
            const payload = {
                id: galleryId,
                updateInfo: data
            }
            setLoading(true);
            const res = (await updateGallery(payload)) as any;

            if (res?.data?.success) {
                toast.success(res?.data?.massage || "Gallery update successfully");
                setGalleryPhoto([]);
                setLoading(false);
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

    const handleRemovePhoto = (photo: string, state: string) => {
        if (state === 'previous') {
            setPreviousGalleryPhoto((prev) => prev.filter(img => img !== photo))
        }
        if (state === 'now') {
            setGalleryPhoto((prev) => prev.filter((img) => img.url !== photo))
        }
    }

    const openLightbox = (photos: string[]) => {
        setLightGalleryPhoto(photos);

        // Timeout ensures LightGallery has updated with new dynamicEl
        setTimeout(() => {
            lightGalleryRef.current?.openGallery(0);
        }, 0);
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {gallery?.data?.map((gallery: TGallery) => (
                    <div
                        key={gallery._id}
                        className="bg-white rounded-2xl shadow-md p-4 w-full max-w-[400px] transition hover:shadow-lg border border-gray-100"
                    >
                        {/* Info */}
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">{gallery.galleryName}</h2>
                            <p className="text-gray-500 text-sm line-clamp-2">{gallery.galleryDescription}</p>
                        </div>

                        {/* Image Clickable */}
                        <button
                            className="w-full h-[200px] relative rounded-md overflow-hidden cursor-pointer"
                            onClick={() => openLightbox(gallery.photos)}
                        >
                            <Image
                                src={gallery.photos[0]}
                                alt={`Gallery Image ${gallery.galleryName}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </button>

                        {/* Action buttons */}
                        <div className="flex justify-end gap-3 border-t pt-3">
                            <button onClick={() => onEdit(gallery._id)} className="flex items-center gap-1 text-blue-600 text-sm">
                                <FaEdit /> Edit
                            </button>
                            <button onClick={() => onDelete(gallery._id)} className="flex items-center gap-1 text-red-600 text-sm">
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <LightGallery
                    onInit={(ref) => {
                        lightGalleryRef.current = ref.instance;
                    }}
                    dynamic
                    dynamicEl={lightGalleryPhoto.map(photo => (
                        {
                            src: photo,
                            thumb: photo
                        }
                    ))}
                    plugins={[lgThumbnail, lgZoom]}
                />
            </div>
            <div>
                <Modal isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Update Gallery</ModalHeader>
                                <ModalBody>
                                    <div>
                                        {
                                            gallery?.data?.map((gallery: TGallery) => gallery._id === galleryId && (
                                                <div className="mb-5" key={gallery._id}>
                                                    <div>
                                                        <div className="flex justify-center flex-wrap gap-2">
                                                            {previousGalleryPhoto.length > 0 && previousGalleryPhoto.map((photo, index) => (
                                                                <div key={index} className='group relative'>
                                                                    <Image
                                                                        alt="profileImage"
                                                                        className="rounded-md object-cover h-[80px] w-[80px] border-2 p-1"
                                                                        height={140}
                                                                        src={photo}
                                                                        width={250}
                                                                    />
                                                                    <RxCross2 onClick={() => handleRemovePhoto(photo, 'previous')} size={20} className=' hover:cursor-pointer absolute group-hover:block hidden z-50 -top-2 -right-2' />
                                                                </div>
                                                            ))}
                                                            {galleryPhoto.length > 0 && galleryPhoto.map((profile, index) => (
                                                                <div key={index} className='group relative'>
                                                                    <Image
                                                                        alt="profileImage"
                                                                        className="rounded-md object-cover h-[80px] w-[80px] border-2 p-1"
                                                                        height={140}
                                                                        src={profile.url}
                                                                        width={250}
                                                                    />
                                                                    <RxCross2 onClick={() => handleRemovePhoto(profile.url, 'now')} size={20} className=' hover:cursor-pointer absolute group-hover:block hidden z-50 -top-2 -right-2' />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <TTForm onSubmit={handleSubmit}>
                                                        <TTInput defaultValue={gallery.galleryName} label='Gallery Name' name='galleryName' />
                                                        <TTTextArea defaultValue={gallery.galleryDescription} label='Gallery Description' name='galleryDescription' />
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
                                                                onPress={() => (onClose(), setGalleryPhoto([]))}
                                                            >
                                                                Close
                                                            </Button>
                                                            <Button color="primary" isLoading={loading} type="submit">
                                                                Update Gallery
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

export default AllGalleryAdmin;