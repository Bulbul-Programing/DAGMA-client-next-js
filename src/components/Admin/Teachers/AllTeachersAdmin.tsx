'use client'
import { useDeleteTeacherMutation, useGetAllTeacherAdminQuery, useUpdateTeacherMutation } from "@/src/redux/Teacher/teacherManagementApi";
import { TTeacher } from "@/src/types/TTeacher";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";
import TTForm from "../../Form/TTForm";
import TTInput from "../../Form/TTInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { hostImages } from "@/src/utils/ImageUpload";
import TeacherTableSkeleton from "@/src/Skeleton/Admin/TeacherTableSkeleton";
import NoDataFound from "../../NoDataFound";

const AllTeachersAdmin = () => {
    // Data retrieve and update api section
    const { data: Teachers, isLoading } = useGetAllTeacherAdminQuery(undefined)
    const [updateTeacher] = useUpdateTeacherMutation()
    const [deleteTeacher] = useDeleteTeacherMutation()

    // Modal section
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [updateId, setUpdateId] = useState('')
    const [teacherPhotoPreview, setTeacherPhotPreview] = useState<string[] | []>([]);
    const [teacherPhoto, setTeacherPhoto] = useState<File[] | []>([]);

    // handle Loading
    const [statusLoading, setStatusLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const handleUpdateTeacher = async (id: string) => {
        setUpdateId(id)
        onOpen()
    }

    // update Teacher
    const handleTeacherUpdate: SubmitHandler<FieldValues> = async (data) => {
        const teacher = Teachers?.data?.filter((teacher: TTeacher) => teacher._id === updateId)[0]

        if (data.name === teacher.name) {
            delete data.name
        }
        if (data.email === teacher.email) {
            delete data.email
        }
        if (data.phone === teacher.phone) {
            delete data.phone
        }
        if (data.subject === teacher.subject) {
            delete data.subject
        }
        if (data.designation === teacher.designation) {
            delete data.designation
        }
        if (data.qualifications === teacher.qualifications) {
            delete data.qualifications
        }

        if (teacherPhoto.length > 0) {
            setUpdateLoading(true);
            const uploadPhoto = await hostImages(teacherPhoto);
            data.photo = uploadPhoto[0];
        }

        if (Object.keys(data).length < 1) {
            return toast.error('Please minimum one field update.')
        }


        try {
            const payload = {
                id: updateId,
                updateInfo: data
            }
            setUpdateLoading(true);
            const res = (await updateTeacher(payload)) as any;

            if (res?.data?.success) {
                toast.success(res?.data?.massage || "Teacher update successfully");
                setTeacherPhoto([]);
                setUpdateLoading(false);
                setTeacherPhotPreview([]);
                onClose()
            } else if (res?.error?.data?.errorSources) {
                res?.error?.data?.errorSources.map(
                    (error: { message: string; path: "string" }) =>
                        toast.error(error?.message || "An error occurred"),
                );
                setUpdateLoading(false)
            }
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            setUpdateLoading(false);
        }
    }

    // delete teacher
    const handleDeleteTeacher = async (id: string) => {
        setUpdateId(id)
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
                    setDeleteLoading(true)
                    const res = (await deleteTeacher(id)) as any;

                    if (res?.data?.success) {
                        toast.success(res?.data?.massage);
                        setDeleteLoading(false)
                    }
                    if (res?.error?.data?.errorSources) {
                        res?.error?.data?.errorSources.map(
                            (error: { message: string; path: "string" }) =>
                                toast.error(error?.message || "An error occurred"),
                        );
                        setDeleteLoading(false)
                    }
                } catch (err: any) {
                    toast.error("An error occurred while updating user data.");
                }
            }
        });
    }

    // update teacher status
    const updateTeacherStatus = async (id: string, status: boolean) => {
        setUpdateId(id)
        const updateData = {
            id,
            updateInfo: { isBlock: status },
        };

        try {
            setStatusLoading(true)
            const res = (await updateTeacher(updateData)) as any;

            if (res?.data?.success) {
                toast.success(res?.data?.massage);
                setStatusLoading(false)
                setUpdateId('')
            }
            if (res?.error?.data?.message) {
                toast.error(res?.error?.data?.message || "An error occurred");
                setStatusLoading(false)
            }
        } catch (err: any) {
            toast.error("An error occurred while updating user data.");
            setStatusLoading(false)
        }
    }

    // handle teacher Photo
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

    if (isLoading) {
        return <TeacherTableSkeleton />
    }

    if (!Teachers?.data?.length) {
        return <NoDataFound />
    }

    return (
        <div>
            <div className="overflow-x-auto my-5">
                <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-500/50 to-blue-500/50 text-black">
                        <tr>
                            <th className="px-2 py-3 text-left text-sm font-medium">Photo</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">Email</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">Phone</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">Subject</th>
                            <th className="px-2 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-2 py-3 text-center text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Teachers?.data?.map((teacher: TTeacher) => (
                            <tr
                                key={teacher._id}
                                className="border-b last:border-none hover:bg-gray-50 transition"
                            >
                                <td className="p-2">
                                    <Image
                                        alt={teacher.name}
                                        className="w-10 h-10 object-cover rounded-full shadow-md"
                                        height={30}
                                        src={teacher.photo}
                                        width={30}
                                    />
                                </td>
                                <td className="min-w-44 py-2 font-semibold">
                                    {teacher.name}
                                </td>
                                <td className="min-w-44 py-2 font-semibold">
                                    {teacher.email}
                                </td>
                                <td className="min-w-44 py-2 font-semibold">
                                    {teacher.phone}
                                </td>
                                <td className="min-w-44 py-2 font-semibold">
                                    {teacher.subject}
                                </td>
                                <td
                                    className={`${teacher.isBlock ? "text-orange-500" : "text-blue-500"} font-bold`}
                                >
                                    {teacher.isBlock ? "Block" : "Unblock"}
                                </td>
                                <td >
                                    <div className="flex items-center">
                                        {teacher.isBlock ? (
                                            <Button isLoading={statusLoading && updateId === teacher._id} isIconOnly={true} className="bg-transparent">
                                                <FaRegEye
                                                    className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                    onClick={() =>
                                                        updateTeacherStatus(teacher._id, !teacher.isBlock)
                                                    }
                                                />
                                            </Button>

                                        ) : (
                                            <Button isLoading={statusLoading && updateId === teacher._id} isIconOnly={true} className="bg-transparent">
                                                <FaRegEyeSlash
                                                    className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                    onClick={() =>
                                                        updateTeacherStatus(teacher._id, !teacher.isBlock)
                                                    }
                                                />
                                            </Button>

                                        )}
                                        <Button isLoading={updateLoading && updateId === teacher._id} isIconOnly={true} className="bg-transparent">
                                            <FaEdit
                                                className="text-[40px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                onClick={() => handleUpdateTeacher(teacher._id)}
                                            />
                                        </Button>

                                        <Button isLoading={deleteLoading && updateId === teacher._id} isIconOnly={true} className="bg-transparent">
                                            <FaRegTrashAlt
                                                className="text-[40px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                onClick={() => handleDeleteTeacher(teacher._id)}
                                            />
                                        </Button>

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
                                <ModalHeader className="flex flex-col gap-1">Update Teacher</ModalHeader>
                                <ModalBody>
                                    <div>
                                        {
                                            Teachers?.data?.map((teacher: TTeacher) => teacher._id === updateId && (
                                                <div className="mb-5" key={teacher._id}>
                                                    <div>
                                                        {teacherPhotoPreview.length > 0 ? (
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
                                                        ) : (
                                                            <div className="flex justify-center">
                                                                <Image
                                                                    key={teacher.name}
                                                                    alt="profileImage"
                                                                    src={teacher.photo}
                                                                    className="rounded-full object-cover h-[80px] w-[80px] border-2"
                                                                    height={80}
                                                                    width={80}
                                                                />
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                    <TTForm onSubmit={handleTeacherUpdate}>
                                                        <div className='grid grid-cols-2 gap-x-2'>
                                                            <TTInput
                                                                defaultValue={teacher.name}
                                                                required
                                                                label="Teacher Name"
                                                                name="name"
                                                            />
                                                            <TTInput
                                                                defaultValue={teacher.email}
                                                                required
                                                                label="Teacher Email"
                                                                name="email"
                                                                type='email'
                                                            />
                                                            <TTInput
                                                                required
                                                                defaultValue={teacher.phone}
                                                                label="Teacher Phone Number"
                                                                name="phone"
                                                                type='phone'
                                                            />
                                                            <TTInput
                                                                required
                                                                defaultValue={teacher.subject}
                                                                label="Subject"
                                                                name="subject"
                                                            />
                                                            <TTInput
                                                                required
                                                                defaultValue={teacher.designation}
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
                                                                defaultValue={teacher.qualifications}
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
                                                            <Button color="primary" isLoading={updateLoading} type="submit">
                                                                Update Teacher
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

export default AllTeachersAdmin;