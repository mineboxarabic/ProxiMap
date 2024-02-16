import useGeneral from "./useGeneral";

const useUsersMapServices = () => {


    // @ts-expect-error TS(2339): Property 'usersServices' does not exist on type '{... Remove this comment to see the full error message
    const {usersServices, setUsersServices} = useGeneral();

    const setServices = (services: any) => {
        setUsersServices(services);
    }

    return {usersServices,setServices};
} 

export default useUsersMapServices;