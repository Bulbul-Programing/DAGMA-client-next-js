'use client'
import { hostImages } from '@/src/utils/ImageUpload';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import TTForm from '../../Form/TTForm';
import TTInput from '../../Form/TTInput';
import TTTextArea from '../../Form/TTTextArea';
import { useCreateTeacherMutation } from '@/src/redux/Teacher/teacherManagementApi';

const CreateTeacher = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [teacherPhotoPreview, setTeacherPhotPreview] = useState<string[] | []>([]);
    const [teacherPhoto, setTeacherPhoto] = useState<File[] | []>([]);
    const [createTeacher] = useCreateTeacherMutation();
    const [loading, setLoading] = useState<boolean>(false);

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setTeacherPhoto([file]);
        if (file) {
            setTeacherPhotPreview([]);
            const reader = new FileReader();

            reader.onloadend = () => {
                setTeacherPhotPreview((prev) => [...prev, reader.result as string]);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (teacherPhoto.length < 1) {
            return toast.error("Please select a profile picture");
        }
        setLoading(true);
        try {
            let image;

            if (teacherPhoto) {
                const uploadPhoto = await hostImages(teacherPhoto);

                image = uploadPhoto[0];
            }

            data.photo = image;
            const res = (await createTeacher(data)) as any;
            
            if (res?.data?.success) {
                toast.success(res?.data?.massage || "Teacher create successfully");
                setTeacherPhoto([]);
                setTeacherPhotPreview([]);
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

    return (
        <div>
            <Button onPress={onOpen} className="bg-blue-500 text-white">Add New Teacher</Button>
            <div>
                <Modal isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add New Teacher</ModalHeader>
                                <ModalBody>
                                    <div className="mb-5">
                                        <div>
                                            {teacherPhotoPreview.length > 0 && (
                                                <div className="flex justify-center">
                                                    {teacherPhotoPreview.map((profile) => (
                                                        <Image
                                                            key={profile}
                                                            alt="profileImage"
                                                            src={profile}
                                                            className="rounded-full object-cover h-[80px] w-[80px] border-2"
                                                            height={80}
                                                            width={80}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <TTForm onSubmit={handleSubmit}>
                                            <div className='grid grid-cols-2 gap-x-2'>
                                                <TTInput
                                                    required
                                                    label="Teacher Name"
                                                    name="name"
                                                />
                                                <TTInput
                                                    required
                                                    label="Teacher Email"
                                                    name="email"
                                                    type='email'
                                                />
                                                <TTInput
                                                    required
                                                    label="Teacher Phone Number"
                                                    name="phone"
                                                    type='phone'
                                                />
                                                <TTInput
                                                    required
                                                    label="Subject"
                                                    name="subject"
                                                />
                                                <TTInput
                                                    required
                                                    label="Teacher Designation"
                                                    name="designation"
                                                />
                                                {/* <TTInput
                                                    required
                                                    label="Department"
                                                    name="department"
                                                /> */}
                                                <TTInput
                                                    required
                                                    label="Teacher Qualifications"
                                                    name="qualifications"
                                                />
                                                {/* <TTInput
                                                    required
                                                    label="Teacher Join Date"
                                                    name="joiningDate"
                                                    type='date'
                                                /> */}
                                            </div>
                                            <div className="my-4">
                                                <label
                                                    className="py-3 text-sm px-2 border bg-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-300 ease-out font-medium text-center block w-full"
                                                    htmlFor="teacherPhoto"
                                                >
                                                    Chose Teacher Photo
                                                </label>
                                                <input
                                                    accept="image/png, image/jpeg"
                                                    className="hidden"
                                                    id="teacherPhoto"
                                                    name="teacherPhoto"
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
                                                    Create Teacher
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

export default CreateTeacher;