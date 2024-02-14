import React, { useMemo, useState } from 'react';

import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useEffect } from 'react';

import { Button } from '@mui/material';
// @ts-expect-error TS(2307): Cannot find module '../../../Components/CRUDTable'... Remove this comment to see the full error message
import CRUDTable from '../../../Components/CRUDTable';
import User from '../../../Classes/User';
import { USER_REGEX, EMAIL_REGEX, PASSWORD_REGEX, BIO_REGEX, STREET_REGEX, CITY_REGEX, ZIP_REGEX, STATE_REGEX } from '../../../Helpers/REGEXS';

  
const CRUDUser = () => {

    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);



    

    const columns = [
        {field: '_id' , headerName: 'ID', width: 100},
        {field: 'username' , headerName: 'Name', width: 200},
        {field: 'email' , headerName: 'Email', width: 200},
        {field: 'role' , headerName: 'Role', width: 200}
    ]


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
            regex: USER_REGEX,
            errorMessage: "Username must be at least 3 characters long and contain only letters and numbers"
        },
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: [
                {name: 'Admin', value: 'Admin'},
                {name: 'User', value: 'User'},
                {name: 'Staff', value: 'Staff'},
                {name: 'Manager', value: 'Manager'},
                {name: 'Partner', value: 'Partner'}
            ],
            customAttributes: {
                onChange: (value: any) => console.log(`Role changed to ${value}`),
            }
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            regex: EMAIL_REGEX,
            errorMessage: "Invalid email",
            customAttributes: {
                required: true,
            }
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            regex: PASSWORD_REGEX,
            customAttributes: {
                required: true,
                minLength: 6
            }
        },
        {
            name: 'profile.bio',
            label: 'Bio',
            regex: BIO_REGEX,
            errorMessage: "Bio must be at most 1000 characters long",
            type: 'textarea',
        },
        {
            name: 'profile.address.street',
            label: 'Street',
            type: 'text',
            regex: STREET_REGEX,
            errorMessage: "Street must be at most 100 characters long",
        },
        {
            name: 'profile.address.city',
            label: 'City',
            type: 'text',
            regex: CITY_REGEX,
            errorMessage: "City must be at most 100 characters long",
        },
        {
            name: 'profile.address.zip',
            label: 'Zip',
            type: 'number',
            regex: ZIP_REGEX,
            errorMessage: "Zip must be 5 characters long",
        },
        {
            name: 'profile.address.state',
            label: 'State',
            type: 'text',
            regex: STATE_REGEX,
            errorMessage: "State must be at most 100 characters long",
        }
    ]

    return (
        <>
            <CRUDTable  columns={columns} modelStructure={userStructure} nameOfClass={'users'}/>
        </>
        );

}

export default CRUDUser;