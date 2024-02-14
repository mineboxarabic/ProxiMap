import useAuth from "./useAuth";

const useCurrentUser = () => {
    const {auth} = useAuth();
    return auth?.user;
};

export default useCurrentUser;