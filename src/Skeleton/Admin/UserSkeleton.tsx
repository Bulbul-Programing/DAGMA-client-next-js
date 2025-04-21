import { Skeleton } from '@heroui/skeleton';
import React from 'react';

const UserSkeleton = () => {
    return (
        <div>
            <Skeleton className="w-full h-40 rounded-tl-[60px]" />
            <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center p-5">
                <div className="flex flex-col md:flex-row lg:flex-row items-center space-x-4">
                    <Skeleton className="w-[150px] h-[150px] rounded-full" />
                    <div>
                        <Skeleton className="w-40 h-6 mb-2" />
                        <Skeleton className="w-60 h-4 mb-2" />
                        <Skeleton className="w-48 h-4" />
                    </div>
                </div>
                <Skeleton className="w-40 h-10" />
            </div>
            <div className="max-w-2xl mx-auto mt-5 bg-white rounded-lg p-5">
                <Skeleton className="w-60 h-6 mb-3" />
                <div className="flex flex-col md:flex-row lg:flex-row gap-x-3">
                    <Skeleton className="w-full md:w-40 lg:w-40 h-10" />
                    <Skeleton className="w-40 h-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-3 mt-5">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10 mt-5" />
            </div>
        </div>
    );
};

export default UserSkeleton;