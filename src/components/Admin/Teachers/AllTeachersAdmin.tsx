'use client'
import { useGetAllTeacherAdminQuery } from "@/src/redux/Teacher/teacherManagementApi";
import { TTeacher } from "@/src/types/TTeacher";
import Image from "next/image";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt } from "react-icons/fa";

const AllTeachersAdmin = () => {
    const { data: Teachers, isLoading } = useGetAllTeacherAdminQuery(undefined)

    const handleUpdateTeacher = async (id: string) => {

    }

    const handleDeleteTeacher = async (id: string) => {

    }

    const updateTeacherStatus = async (id: string, status: boolean) => {

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
                                <td className=" flex justify-center">
                                    <div className="flex">
                                        {teacher.isBlock ? (
                                            <FaRegEye
                                                className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                onClick={() =>
                                                    updateTeacherStatus(teacher._id, !teacher.isBlock)
                                                }
                                            />
                                        ) : (
                                            <FaRegEyeSlash
                                                className="text-[45px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                                onClick={() =>
                                                    updateTeacherStatus(teacher._id, !teacher.isBlock)
                                                }
                                            />
                                        )}
                                        <FaEdit
                                            className="text-[40px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                            onClick={() => handleUpdateTeacher(teacher._id)}
                                        />
                                        <FaRegTrashAlt
                                            className="text-[40px] px-3 rounded-md font-medium cursor-pointer hover:text-red-500 transition-all"
                                            onClick={() => handleDeleteTeacher(teacher._id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTeachersAdmin;