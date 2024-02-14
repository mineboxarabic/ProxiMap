import axios from 'axios';

// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('BASE_URL', BASE_URL);


export default axios.create({
    baseURL: BASE_URL,
});


export const axiosPrivate = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});