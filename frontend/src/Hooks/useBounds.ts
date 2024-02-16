import { useContext, useState } from 'react';
import useGeneral from './useGeneral';
const useBounds = () => {


    // @ts-expect-error TS(2339): Property 'bounds' does not exist on type '{}'.
    const {bounds, setBounds} = useGeneral();

    const setBoundsHandler = (bounds: any) => {
        setBounds(bounds);
        localStorage.setItem('bounds', bounds);
    };

    return { bounds, setBounds: setBoundsHandler };
};

export default useBounds;