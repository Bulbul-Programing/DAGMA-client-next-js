import Image from 'next/image';
import React from 'react';

const NoDataFound = () => {
    return (
        <div className="w-full my-5 flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
            <Image
                alt="No data"
                className=" object-contain"
                height={200}
                src="https://res.cloudinary.com/dbcedo67j/image/upload/v1743957153/47718913_9170826_zigwv0.jpg"
                width={300}
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-6">
                Oops! Nothing Here
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
                We couldn’t find any data to show right now. Please check back later or
                try refreshing the page.
            </p>
        </div>
    );
};

export default NoDataFound;