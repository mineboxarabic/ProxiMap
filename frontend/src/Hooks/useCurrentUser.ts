import useAuth from "./useAuth";

const useCurrentUser = () => {
    // @ts-expect-error TS(2339): Property 'auth' does not exist on type 'unknown'.
    const {auth} = useAuth();
    return auth?.user;
};

export default useCurrentUser;