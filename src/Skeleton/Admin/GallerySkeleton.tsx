import { Skeleton } from '@heroui/skeleton';
import React from 'react';

const GallerySkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl shadow-md p-4 w-full max-w-[400px] transition border border-gray-100"
                >
                    {/* Info */}
                    <div className="mb-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-5/6 rounded" />
                    </div>

                    {/* Image area */}
                    <div className="w-full h-[200px] rounded-md overflow-hidden relative">
                        <Skeleton className="h-full w-full rounded-md" />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-3 mt-3">
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GallerySkeleton;