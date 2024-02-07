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

    const userStructure = [
        {
            name: 'username',
            label: 'User Name',
            type: 'text',
            customAttributes: {
                required: true,
                minLength: 3
            }
            ,
            regex: /^[a-zA-Z0-9]{3,}$/, // Example regex, adjust as needed
            errorMessage: "Username must be at least 3 characters long and contain only letters and numbers"
        },
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: ['Admin', 'User', 'Staff'],
            customAttributes: {
                onChange: (value) => console.log(`Role changed to ${value}`),
            }
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            customAttributes: {
                required: true,
            }
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            customAttributes: {
                required: true,
                minLength: 6
            }
        },
        {
            name: 'profile.bio',
            label: 'Bio',
            type: 'text',
        }
    ]

    return (
        <>
            <CRUDTable  columns={columns} modelClass={user} modelStructure={userStructure} nameOfClass={'users'}/>
        </>
        );

}

export default CRUDUser;