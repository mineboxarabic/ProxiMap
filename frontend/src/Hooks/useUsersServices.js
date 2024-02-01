import useGeneral from "./useGeneral";

const useUsersMapServices = () => {
    const {usersServices, setUsersServices} = useGeneral();

    const setServices = (services) => {
        setUsersServices(services);
    }

    return {usersServices,setServices};
} 

export default useUsersMapServices;