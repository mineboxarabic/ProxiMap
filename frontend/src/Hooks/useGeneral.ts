import { useContext } from "react";
// @ts-expect-error TS(2307): Cannot find module '../Context/GeneralProvider' or... Remove this comment to see the full error message
import GeneralContext from "../Context/GeneralProvider";

const useGeneral = () => {
    return useContext(GeneralContext);
};

export default useGeneral;