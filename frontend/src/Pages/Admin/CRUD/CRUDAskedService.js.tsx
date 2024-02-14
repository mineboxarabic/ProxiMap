import React, { useState } from 'react';


// @ts-expect-error TS(2307): Cannot find module '../../../Components/CRUDTable'... Remove this comment to see the full error message
import CRUDTable from '../../../Components/CRUDTable';
import useResource from '../../../Hooks/useResource';

import useAxiosPrivate from '../../../Hooks/useAxiosPrivate';
import { useEffect } from 'react';
// @ts-expect-error TS(2305): Module '"../../../Helpers/REGEXS"' has no exported... Remove this comment to see the full error message
import {SERVICE_RANGE_REGEX,SERVICE_LATITUDE_REGEX,SERVICE_LONGITUDE_REGEX, SERVICE_NAME_REGEX, SERVICE_DESCRIPTION_REGEX, SERVICE_PRICE_REGEX, SERVICE_AVAILABILITY_REGEX} from '../../../Helpers/REGEXS';



  
const CRUDAskedService = () => {



    const [partners, setPartners] = useState([]);
    const [categories, setCategories] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosPrivate.get('/users');
            setPartners(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosPrivate.get('/categorys');
            setCategories(response.data);
        };
        fetchData();
    }, []);


    const columns = [
        {field: 'partnerId' , headerName: 'ID', width: 100},
        {field: 'name' , headerName: 'Name', width: 200},
        {field: 'description' , headerName: 'Description', width: 200},
        {field: 'price' , headerName: 'Price', width: 200},
        {field: 'availability' , headerName: 'Availability', width: 200},
        
    ]





    const serviceStructure = [
        {
            name: 'userId',
            label: 'User ID',
            type: 'select',
            // @ts-expect-error TS(2339): Property 'username' does not exist on type 'never'... Remove this comment to see the full error message
            options: partners.map(partner => {return {name: partner.username, value: partner._id}}),
        
        },
        {
            name: 'categoryId',
            label: 'Category ID',
            type: 'select',
            // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
            options: categories.map(category => {return {name: category.name, value: category._id}}),
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            regex: SERVICE_NAME_REGEX,
            errorMessage: 'Name must be between 1 and 100 characters long'
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            regex: SERVICE_DESCRIPTION_REGEX,
            errorMessage: 'Description must be between 1 and 1000 characters long'
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            regex: SERVICE_PRICE_REGEX,
            errorMessage: 'Price must be between 1 and 10 digits long'
        },
        {
            name: 'position.coordinates.0',
            label: 'Latitude',
            type: 'number',
            regex: SERVICE_LATITUDE_REGEX,
            errorMessage: 'Latitude must be between -90 and 90'
        },
        {
            name: 'position.coordinates.1',
            label: 'Longitude',
            type: 'number',
            regex: SERVICE_LONGITUDE_REGEX,
            errorMessage: 'Longitude must be between -180 and 180'

        },
        {
            name: 'date',
            label: 'Date',
            type: 'date',

        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                {name: 'pending', value: 'pending'},
                {name: 'accepted', value: 'accepted'},
                {name: 'rejected', value: 'rejected'},
            ],
        }
    ]



    return (
        <>
            <CRUDTable  columns={columns}  modelStructure={serviceStructure} nameOfClass={'askedServices'}/>
        </>
        );

}

export default CRUDAskedService;