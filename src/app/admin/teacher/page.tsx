import AllTeacherCount from '@/src/components/Admin/Teachers/AllTeacherCount';
import AllTeachersAdmin from '@/src/components/Admin/Teachers/AllTeachersAdmin';
import CreateTeacher from '@/src/components/Admin/Teachers/CreateTeacher';
import Path from '@/src/components/Path';
import React from 'react';

const page = () => {
    return (
        <div>
            <Path paths={['Home', 'admin', 'Teachers']} />
            <div className='flex justify-between items-center'>
                <AllTeacherCount />
                <CreateTeacher />
            </div>
            <AllTeachersAdmin />
        </div>
    );
};

export default page;