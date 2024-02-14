import { useContext } from "react";
// @ts-expect-error TS(2307): Cannot find module '../Context/AuthProvider' or it... Remove this comment to see the full error message
import AuthContext from "../Context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;