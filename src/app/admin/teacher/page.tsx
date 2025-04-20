import AllTeacherCount from '@/src/components/Admin/Teachers/AllTeacherCount';
import AllTeachersAdmin from '@/src/components/Admin/Teachers/AllTeachersAdmin';
import CreateTeacher from '@/src/components/Admin/Teachers/CreateTeacher';
import Path from '@/src/components/Path';
import { createPath } from '@/src/utils/pathMacker';
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
        path: 'admin/teacher',
        label: 'Teacher'
    },
]

const page = () => {
    return (
        <div>
            <Path paths={path} />
            <div className='flex justify-between items-center'>
                <AllTeacherCount />
                <CreateTeacher />
            </div>
            <AllTeachersAdmin />
        </div>
    );
};

export default page;