import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";

const useInMapView = () => {
    const [bounds, setBounds] = useState(null);
    const {oVServices, setOVServices} = useGeneral();

    const {
      resources: services,
      getAll: getAllServices,
      error: errorServices,
      loading: isLoadingServices,
    } = useResource(`/services/in-map-view/${bounds?._southWest?.lat}/${bounds?._southWest?.lng}/${bounds?._northEast?.lat}/${bounds?._northEast?.lng}`);
    ///services/in-map-view/60.192059/24.945831/60.192059/24.945831
  

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
        //IF ERROR
        if (errorServices) {
            console.log(errorServices);
        }
    }, [errorServices]);


    const updateBounds = (bounds) => {
        setBounds(bounds);
        
    };


    return {services, isLoadingServices, errorServices, updateBounds};
}

export default useInMapView;