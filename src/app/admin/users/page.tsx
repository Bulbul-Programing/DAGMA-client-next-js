import AdminAllUser from '@/src/components/Admin/AllUsers/AdminAllUsers';
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
        path: 'admin/users',
        label: 'Users'
    },
]

const page = () => {
    return (
        <div>
            <Path paths={path} />
            <div>
                <AdminAllUser />
            </div>
        </div>
    );
};

export default page;