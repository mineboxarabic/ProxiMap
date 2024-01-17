import { createContext, useState } from "react";

const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
    const [general, setGeneral] = useState(null);
    const [oVServices, setOVServices] = useState(localStorage.getItem('oVServices') || null);
    return (
        <GeneralContext.Provider value={{ general, setGeneral, oVServices, setOVServices }}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;
