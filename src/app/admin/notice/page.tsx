import AllNoticeAdmin from '@/src/components/Admin/Notice/AllNoticeAdmin';
import CountNotice from '@/src/components/Admin/Notice/CountNotice';
import CreateNotice from '@/src/components/Admin/Notice/CreateNotice';
import Path from '@/src/components/Path';
import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

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
        path: 'admin/notice',
        label: 'Notice'
    },
]

const page = () => {
    return (
        <div>
            <Path paths={path} />
            <div className='flex justify-between items-center'>
                <CountNotice />
                <CreateNotice />
            </div>
            <AllNoticeAdmin />
        </div>
    );
};

export default page;