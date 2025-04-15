import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const Path = ({ paths }: { paths: string[] }) => {
    console.log(paths.length);
    return (
        <div className="flex items-center gap-x-2 bg-[#F5F9FA] p-4 my-3">
            {
                paths.map((path, index) => (
                    <p key={index} className='flex items-center'>
                        <span className={`${paths.length === index + 1 && 'font-semibold'}`}>{path}</span> <MdOutlineArrowForwardIos className={`${paths.length === index + 1 ? 'hidden' : 'block'}`} />
                    </p>
                ))
            }
        </div>
    );
};

export default Path;