import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiBloggerLine } from "react-icons/ri";
import { PiNewspaperClipping } from "react-icons/pi";
import { RiCarouselView } from "react-icons/ri";
import { MdAppRegistration } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi2";

export const dashboardNavItem = [
    {
        path: "/admin/dashboard",
        element: "Dashboard",
        icon: <MdOutlineDashboard />,
    },
    {
        path: "/admin/profile",
        element: "Profile",
        icon: <FaRegUser />,
    },
    {
        element: "Academy",
        icon: <HiOutlineAcademicCap />,
        subMenu: [
            {
                path: "/admin/notice",
                element: "Notice",
                icon: <PiNewspaperClipping />,
            },
            {
                path: "/admin/teacher",
                element: "Teachers",
                icon: <LiaChalkboardTeacherSolid />,
            },
        ]
    },
    {
        element: "Users",
        icon: <FiUsers />,
        subMenu: [
            {
                path: "/admin/banner",
                element: "Banner",
                icon: <RiCarouselView />,
            },
            {
                path: "/admin/course",
                element: "Courses",
                icon: <LiaChalkboardTeacherSolid />,
            }
        ]
    },
    {
        element: "Recitations",
        icon: <MdAppRegistration />,
        subMenu: [
            {
                path: "/admin/class",
                element: "Classes",
                icon: <GiTeacher />,
            },
            {
                path: "/admin/batch",
                element: "Batch",
                icon: <SiGoogleclassroom />,
            },
            {
                path: "/admin/review",
                element: "Review",
                icon: <MdOutlineRateReview />,
            },
            {
                path: "/admin/blog",
                element: "Blog",
                icon: <RiBloggerLine />,
            }
        ]
    },
    {
        path: "/",
        element: "Home",
        icon: <IoHomeOutline />,
    },
];
