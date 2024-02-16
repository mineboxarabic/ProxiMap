import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";
import useCurrentUser from "../useCurrentUser";

const useCurrentPartnerServices = () => {


    // @ts-expect-error TS(2339): Property 'oVServices' does not exist on type '{}'.
    const {oVServices, setOVServices} = useGeneral();

    const currentUser = useCurrentUser();

    const {
      resources: services,
      getAll: getAllServices,
      error: errorServices,
      loading: isLoadingServices,
    } = useResource(`/services/partner/${currentUser?._id}`);

    
  useEffect(() => {
 
        getAllServices();
        console.log('services', services);

    }, []);

    useEffect(() => {
      if (services) {
          setOVServices(services);
      }
    }, [services]);

    useEffect(() => {
      if (errorServices) {
          console.error('Error fetching services:', errorServices);
      }
    }, [errorServices]);


    return {services, isLoadingServices, errorServices};
}

export default useCurrentPartnerServices;