import AllGalleryAdmin from '@/src/components/Admin/Gallery/AllGalleryAdmin';
import GalleryCount from '@/src/components/Admin/Gallery/GalleryCount';
import GalleryCreate from '@/src/components/Admin/Gallery/GalleryCreate';
import Path from '@/src/components/Path';
import React from 'react';

const path = [
    {
        path: '',
        label: 'Home'
    },
    {
        path: 'admin/dashboard',
        label: 'Admin'
    },
    {
        path: 'admin/gallary',
        label: 'Gallery'
    },
]

const page = () => {
    return (
        <div>
            <Path paths={path} />
            <div className='flex justify-between items-center'>
                <GalleryCount />
                <GalleryCreate />
            </div>
            <AllGalleryAdmin />
        </div>
    );
};

export default page;