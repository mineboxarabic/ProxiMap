import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";

const useInMapView = (isAsked) => {
    const [bounds, setBounds] = useState(null);
    const {oVServices, setOVServices , oVAskedServices, setOVAskedServices, filters} = useGeneral();

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

  
    const applayFiltersToServices = (services) => {

      /*
       categoryId,
        priceRange,
        availability,
        minimumRating,
        serviceType,
        serviceStatus,
      */
      let filteredServices = services.filter(service => {
        let isValid = true;
        console.log(service);
        if(filters.categoryId){
          isValid = isValid && service.categoryId == filters.categoryId;
        }

        if(filters.priceRange){
          isValid = isValid && service.price >= filters.priceRange[0] && service.price <= filters.priceRange[1];
        }
        if(filters.availability){
          isValid = isValid && service.availability;
        }
        if(filters.minimumRating){
          isValid = isValid && service.rating >= filters.minimumRating;
        }
        if(filters.serviceType){
          isValid = isValid && service.serviceType == filters.serviceType;
        }
        if(filters.serviceStatus){
          isValid = isValid && service.status == filters.serviceStatus;
        }

        return isValid;
      });

      return filteredServices;
    }

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

        if (services ) {
          setOVServices(applayFiltersToServices(services));
      }
      }
      else{
        if (services) {
          setOVAskedServices(applayFiltersToServices(services));
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