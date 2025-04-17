import { Skeleton } from '@heroui/skeleton';
import React from 'react';

const NoticeTableSkeleton = () => {
    return (
        <div className="overflow-x-auto my-5">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500/50 to-blue-500/50 text-black">
                    <tr>
                        <th className="px-2 py-3 text-left text-sm font-medium">Image</th>
                        <th className="px-2 py-3 text-left text-sm font-medium">Notice Title</th>
                        <th className="px-2 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-2 py-3 text-left text-sm font-medium">Publish Date</th>
                        <th className="px-2 py-3 text-center text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition">
                            <td className="p-2">
                                <Skeleton className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="min-w-44 py-2">
                                <Skeleton className="h-4 w-40 rounded" />
                            </td>
                            <td className="py-2">
                                <Skeleton className="h-4 w-20 rounded" />
                            </td>
                            <td className="min-w-32 py-2">
                                <Skeleton className="h-4 w-24 rounded" />
                            </td>
                            <td>
                                <div className="flex justify-center gap-2 px-3 py-2">
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NoticeTableSkeleton;