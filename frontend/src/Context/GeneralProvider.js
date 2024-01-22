import { createContext, useState } from "react";

const GeneralContext = createContext({});

export const GeneralProvider = ({ children }) => {
    const [general, setGeneral] = useState(null);
    const [oVServices, setOVServices] = useState(localStorage.getItem('oVServices') || null);
    const [selectedService, setSelectedService] = useState(null);
    const [historyOfChanges, setHistoryOfChanges] = useState(null);
    return (
        <GeneralContext.Provider value={{ general, setGeneral, oVServices, setOVServices , selectedService, setSelectedService , historyOfChanges, setHistoryOfChanges 
         }}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;
