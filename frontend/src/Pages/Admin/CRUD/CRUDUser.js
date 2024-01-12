import React, { useMemo, useState } from 'react';

import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useEffect } from 'react';

import { Button } from '@mui/material';
import CRUDTable from '../../../Components/CRUDTable';
import User from '../../../Classes/User';


  
const CRUDUser = () => {

    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);



    

    const columns = [
        {field: '_id' , headerName: 'ID', width: 100},
        {field: 'username' , headerName: 'Name', width: 200},
        {field: 'email' , headerName: 'Email', width: 200},
        {field: 'role' , headerName: 'Role', width: 200}
    ]


    const user = {
        username: '',
        email: '',
        password: '',
        role: '',
        profile:{
            bio: '',
            profilePicture: '',
        }
    }


    return (
        <>
            <CRUDTable  columns={columns} modelClass={user} nameOfClass={'users'}/>
        </>
        );

}

export default CRUDUser;