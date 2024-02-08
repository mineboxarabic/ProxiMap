import React, { useState } from 'react';

import CRUDTable from '../../../Components/CRUDTable';

import {CATEGORY_NAME_REGEX, CATEGORY_DESCRIPTION_REGEX} from '../../../Helpers/REGEXS';
  
const CRUDCategory = () => {



    const columns = [
        {field: 'name' , headerName: 'Name', width: 200},
        {field: 'description' , headerName: 'Description', width: 200},
    ]


    const categorysStructure = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            customAttributes: {
                required: true,
                minLength: 3
            }
            ,
            regex: CATEGORY_NAME_REGEX,
            errorMessage: "Name must be at least 3 characters long"
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            customAttributes: {
                required: true,
                minLength: 3
            }
            ,
            regex: CATEGORY_DESCRIPTION_REGEX,
            errorMessage: "Description must be at least 3 characters long"
        }
    ]


    return (
        <>
            <CRUDTable  columns={columns} modelStructure={categorysStructure} nameOfClass={'categorys'}/>
        </>
        );

}

export default CRUDCategory;