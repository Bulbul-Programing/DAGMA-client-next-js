import Link from 'next/link';
import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

type TPath = {
    path: string,
    label: string
}

const Path = ({ paths }: { paths: TPath[] }) => {
    return (
        <div className="flex items-center gap-x-2 bg-[#F5F9FA] p-4 my-3">
            {
                paths.map((path, index) => (
                    <div key={index} className='flex items-center'>
                        <Link href={`http://localhost:3000/${path.path}`} className='flex items-center'><span className={`${paths.length === index + 1 && 'font-semibold'}`}>{path.label}</span> <MdOutlineArrowForwardIos className={`${paths.length === index + 1 ? 'hidden' : 'block'}`} /></Link>
                    </div>
                ))
            }
        </div>
    );
};

export default Path;