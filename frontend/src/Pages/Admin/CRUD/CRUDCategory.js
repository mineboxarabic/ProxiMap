import React, { useState } from 'react';

import CRUDTable from '../../../Components/CRUDTable';


  
const CRUDCategory = () => {



    const columns = [
        {field: 'name' , headerName: 'Name', width: 200},
        {field: 'description' , headerName: 'Description', width: 200},
    ]


    const category = {
        name: '',
        description: '',
    }


    return (
        <>
            <CRUDTable  columns={columns} modelClass={category} nameOfClass={'categorys'}/>
        </>
        );

}

export default CRUDCategory;