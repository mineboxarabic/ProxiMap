import React, { useMemo, useState } from 'react';

import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useEffect } from 'react';

import { Button } from '@mui/material';
import CRUDTable from '../../../Components/CRUDTable';


  
const CRUDUser = () => {

    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);



    const userClass = () => {
        return {
            username: '',
            email: '',
            password: '',
            role: '',
            profile:{
                bio: '',
                profilePicture: ''
            }
        }
    }

    const columns = [
        {field: '_id' , headerName: 'ID', width: 100},
        {field: 'username' , headerName: 'Name', width: 200},
        {field: 'email' , headerName: 'Email', width: 200},
        {field: 'role' , headerName: 'Role', width: 200}
    ]




    return (
        <>
            <CRUDTable  columns={columns} modelClass={userClass} nameOfClass={'users'}/>
        </>
        );

}

export default CRUDUser;