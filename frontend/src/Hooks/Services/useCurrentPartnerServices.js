import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";
import useCurrentUser from "../useCurrentUser";

const useCurrentPartnerServices = () => {
    const [bounds, setBounds] = useState(null);
    const {oVServices, setOVServices} = useGeneral();

    const currentUser = useCurrentUser();

    const {
      resources: services,
      getAll: getAllServices,
      error: errorServices,
      loading: isLoadingServices,
      update: updateService,
    } = useResource(`/services/in-map-view/${bounds?._southWest?.lat}/${bounds?._southWest?.lng}/${bounds?._northEast?.lat}/${bounds?._northEast?.lng}/${currentUser?._id}`);

  

    useEffect(() => {
      if (!isLoadingServices) {
        getAllServices();
      }
    }, [bounds]);

    useEffect(() => {
      if (services) {
          setOVServices(services);
      }
    }, [services]);

    useEffect(() => {
        if (errorServices) {
            console.log('error',errorServices);
        }
    }, [errorServices]);


    const updateBounds = (bounds) => {
        setBounds(bounds);
    };

  


    return {services, isLoadingServices, errorServices, updateBounds};
}

export default useCurrentPartnerServices;