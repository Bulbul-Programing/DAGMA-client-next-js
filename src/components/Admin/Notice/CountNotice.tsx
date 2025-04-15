'use client'
import { useCountNoticeQuery } from '@/src/redux/Notice/noticeManagementApi';
import { Skeleton } from "@heroui/skeleton";

const CountNotice = () => {
    const { data, isLoading } = useCountNoticeQuery(undefined)

    if (isLoading) {
        return <Skeleton className="w-36 h-11 bg-blue-100 rounded-lg" />;
    }
    return (
        <h1 className="bg-blue-500 text-base p-2 rounded-lg inline-block text-white">
            Total notice : {data?.data}
        </h1>
    );
};

export default CountNotice;