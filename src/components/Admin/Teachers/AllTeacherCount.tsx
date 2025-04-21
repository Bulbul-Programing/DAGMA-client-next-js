'use client'
import { useCountTeacherQuery } from '@/src/redux/Teacher/teacherManagementApi';
import { Skeleton } from '@heroui/skeleton';
import React from 'react';

const AllTeacherCount = () => {
    const { data, isLoading } = useCountTeacherQuery(undefined)

    if (isLoading) {
        return <Skeleton className="w-36 h-11 bg-blue-100 rounded-lg" />;
    }
    return (
        <h1 className="bg-blue-500 text-base p-2 rounded-lg inline-block text-white">
            Total Teacher : {data?.data}
        </h1>
    );
};

export default AllTeacherCount;