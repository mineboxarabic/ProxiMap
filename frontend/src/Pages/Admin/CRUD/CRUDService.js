import React, { useState } from 'react';

import CRUDTable from '../../../Components/CRUDTable';


  
const CRUDService = () => {



    const columns = [
        {field: 'partnerId' , headerName: 'ID', width: 100},
        {field: 'name' , headerName: 'Name', width: 200},
        {field: 'description' , headerName: 'Description', width: 200},
        {field: 'price' , headerName: 'Price', width: 200},
        {field: 'availability' , headerName: 'Availability', width: 200},
        
    ]


    const service = {
        partnerId: '',
        categoryId: '',
        name: '',
        description: '',
        price: '',
        availability: '',
        ratings: [],
        position: {
            lat: 0,
            lng: 0
        },
        range: 0
    }


    return (
        <>
            <CRUDTable  columns={columns} modelClass={service} nameOfClass={'services'}/>
        </>
        );

}

export default CRUDService;