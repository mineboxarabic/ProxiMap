import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";

const useInMapView = (isAsked) => {
    const [bounds, setBounds] = useState(null);
    const {oVServices, setOVServices , oVAskedServices, setOVAskedServices} = useGeneral();

    const [url, setURL] = useState(null);
  
    const getURL = () => {
      if(!isAsked) return `/services/in-map-view/${bounds?._southWest?.lat || 0}/${bounds?._southWest?.lng || 0}/${bounds?._northEast?.lat || 0}/${bounds?._northEast?.lng || 0}` 

      return `/askedServices/in-map-view/${bounds?._southWest?.lat || 0}/${bounds?._southWest?.lng || 0}/${bounds?._northEast?.lat || 0}/${bounds?._northEast?.lng || 0}`;

    }

    const {
      resources: services,
      getAll: getAllServices,
      error: errorServices,
      loading: isLoadingServices,
    } = useResource(getURL());

  

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (bounds != null) {
            if (!isLoadingServices) {
                getAllServices();
            }
        }
    }, 500); 

    return () => clearTimeout(delayDebounceFn); 
    }, [bounds]);

    useEffect(() => {
      if(!isAsked){
        if (services && services.length > 0) {
          setOVServices(services);
      }
      }
      else{
        if (services && services.length > 0) {
          setOVAskedServices(services);
        }
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

export default useInMapView;