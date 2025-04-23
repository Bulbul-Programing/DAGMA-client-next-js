import React from 'react';

const NoticeLoadingSkeleton = () => {
    return (
        <div className="w-full space-y-3 animate-pulse">
            {/* Button Skeleton */}
            <div className="h-10 w-36 rounded-md bg-blue-300/40" />

            {/* Marquee Skeleton */}
            <div className="flex gap-6 overflow-hidden py-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-6 w-48 rounded bg-gray-300/50" />
                ))}
            </div>
        </div>
    );
};

export default NoticeLoadingSkeleton;