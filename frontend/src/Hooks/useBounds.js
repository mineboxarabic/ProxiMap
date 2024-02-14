import { useContext, useState } from 'react';
import useGeneral from './useGeneral';
const useBounds = () => {
    const {bounds, setBounds} = useGeneral();

    const setBoundsHandler = (bounds) => {
        setBounds(bounds);
        localStorage.setItem('bounds', bounds);
    };

    return { bounds, setBounds: setBoundsHandler };
};

export default useBounds;