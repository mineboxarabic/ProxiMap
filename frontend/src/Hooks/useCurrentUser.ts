import User from "../Classes/User";
import useAuth from "./useAuth";

const useCurrentUser = () : User => {
    const {auth} = useAuth();

    const user: User = auth?.user as User;

    return user;
};

export default useCurrentUser;