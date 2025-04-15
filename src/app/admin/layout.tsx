"use client";
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IoMenu } from "react-icons/io5";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useUserInfoQuery } from "@/src/redux/Users/userManagementApi";
import { verifyToken } from "@/src/utils/veryfyToken";
import { logout, useCurrentToken } from "@/src/redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { TDecodedUser } from "@/src/types/TUser";
import { dashboardNavItem } from "@/src/utils/dashboardNavItem";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@heroui/button";


const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const userToken = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();
    const [userInfo, setUserInfo] = useState<TDecodedUser | any>({});
    const { data } = useUserInfoQuery(userInfo.email, {
        skip: !userInfo.email,
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const currentPage = usePathname();
    const [submenuIndex, setSubmenuIndex] = useState(0)
    const [submenuElement, setSubmenuElement] = useState('')

    useEffect(() => {
        if (userToken) {
            const decodedToken = verifyToken(userToken);
            if (decodedToken) {
                setUserInfo(decodedToken);
            } else {
                dispatch(logout());
                router.push("/login");
            }
        } else {
            router.push("/login")
        }
    }, [userToken]);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setIsExpanded(true);
    };

    const handleOutsideClick = () => {
        if (isDrawerOpen) {
            setIsDrawerOpen(false);
        }
    };

    // if (isLoading) {
    //   return <p>loading</p>;
    // }
    return (
        <div className="max-w-7xl relative mx-auto flex flex-col md:flex-col lg:flex-row">
            <div className=" block md:block lg:hidden" onClick={handleDrawerToggle}>
                <div className="flex mx-1 rounded-lg p-5 shadow-xl justify-between">
                    <IoMenu className="text-2xl text-black " />
                </div>
            </div>
            {isDrawerOpen && (
                <div
                    className=" absolute min-h-screen h-full inset-0 bg-black opacity-10 z-20"
                    onClick={handleOutsideClick}
                />
            )}
            <div
                className={`min-h-screen px-3 h-full absolute lg:block bg-[#f1f2f7] text-black
                    transition-all
                    ${isExpanded ? "w-48" : "w-16"}
                    ${isDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    z-30`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className={` flex justify-center items-center pt-5 transition-all duration-300 ease-in-out transform`}
                >
                    <Image
                        alt=""
                        className={` rounded-full transition-all ease-in ${isExpanded ? "w-20 h-20" : "w-10 h-10"}`}
                        height={80}
                        src={
                            data?.data?.profilePicture ||
                            "https://res.cloudinary.com/dbcedo67j/image/upload/v1740237896/ywfrddaxzp4lo6jupeyr.jpg"
                        }
                        width={80}
                    />
                </div>
                <h1
                    className={`${isExpanded ? "text-base mt-2" : "text-[0px] mt-0"} text-center transition-all ease-in duration-300 font-semibold`}
                >
                    {data?.data?.name}
                </h1>
                <div className="mt-4 space-y-2 transition-all duration-300 ease-in-out">
                    {dashboardNavItem.map((item, index) => (
                        <div key={index}>
                            {
                                item?.subMenu && (
                                    <div className="transition-all">
                                        <div className={` flex gap-x-2  ${isExpanded ? "justify-start" : "justify-center"
                                            } items-center ${currentPage === item.path ? isExpanded && "bg-blue-500 text-white rounded-lg" : ""} hover:bg-blue-500 hover:text-white p-2 hover:rounded-md`}>
                                            <button onClick={() => (setSubmenuIndex(index === submenuIndex ? 0 : index), setSubmenuElement(item.element === submenuElement ? '' : item.element))} className={`flex justify-between hover:bg-blue-500 hover:text-white hover:rounded-md items-center ${currentPage === item.path ? !isExpanded && "bg-blue-500 text-white p-2 rounded-full" : ""} w-full`}>
                                                <div className={`flex gap-x-2 items-center  `}>
                                                    <div
                                                        className={` text-lg md:text-2xl lg:text-xl`}
                                                    >
                                                        {item.icon}
                                                    </div>
                                                    <p className={` ${isExpanded ? "block" : "hidden"} ${isExpanded ? "text-base" : "text-[0px] mt-0"}`}>
                                                        {item.element}
                                                    </p>
                                                </div>
                                                <IoIosArrowDown className={` ${isExpanded ? "text-base block " : "text-[0px] mt-0 hidden"}`} />
                                            </button>
                                        </div>
                                        <div className={`${(submenuIndex === index && submenuElement === item.element) ? "block" : "hidden"} border-l-2 border-black/30`}>
                                            {
                                                item.subMenu.map((item, i) => (
                                                    <Link
                                                        key={i}
                                                        className={` border flex gap-x-2  ${isExpanded ? "justify-start" : "justify-center"
                                                            } items-center ${currentPage === item.path ? isExpanded && "bg-blue-500 text-white rounded-lg" : ""} hover:bg-blue-500 hover:text-white p-1 m-3 hover:rounded-md`}
                                                        href={item.path}
                                                        onClick={() => setIsDrawerOpen(false)}
                                                    >
                                                        <div
                                                            className={`text-lg md:text-2xl lg:text-xl ${currentPage === item.path ? !isExpanded && "bg-blue-500 text-white p-3 rounded-full" : ""}`}
                                                        >
                                                            {item.icon}
                                                        </div>
                                                        <p className={` ${isExpanded ? "text-base" : "text-[0px] mt-0"}`}>
                                                            {item.element}
                                                        </p>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                item?.path && (
                                    <Link
                                        className={` flex gap-x-2  ${isExpanded ? "justify-start" : "justify-center"
                                            } items-center ${currentPage === item.path ? isExpanded && "bg-blue-500 text-white rounded-lg" : ""} hover:bg-blue-500 hover:text-white p-2 hover:rounded-md`}
                                        href={item.path}
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        <div
                                            className={`text-lg md:text-2xl lg:text-xl ${currentPage === item.path ? !isExpanded && "bg-blue-500 text-white p-3 rounded-full" : ""}`}
                                        >
                                            {item.icon}
                                        </div>
                                        <p className={` ${isExpanded ? "text-base" : "text-[0px] mt-0"}`}>
                                            {item.element}
                                        </p>
                                    </Link>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className=" w-full lg:ml-16 px-3 md:px-4 lg:px-5 p-2 md:p-2 pt-5">
                {children}
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
