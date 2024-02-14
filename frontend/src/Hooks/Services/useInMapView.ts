import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";
import useAxiosPrivate from "../useAxiosPrivate";

const useInMapView = (isAsked: any) => {
    const [bounds, setBounds] = useState(null);
    // @ts-expect-error TS(2339): Property 'oVServices' does not exist on type 'unkn... Remove this comment to see the full error message
    const {oVServices, setOVServices , oVAskedServices, setOVAskedServices, filters} = useGeneral();
    const axiosPrivate = useAxiosPrivate();

    const getURL = () => {
      // @ts-expect-error TS(2339): Property '_southWest' does not exist on type 'neve... Remove this comment to see the full error message
      if(!isAsked) return `/services/in-map-view/${bounds?._southWest?.lat || 0}/${bounds?._southWest?.lng || 0}/${bounds?._northEast?.lat || 0}/${bounds?._northEast?.lng || 0}` 
      // @ts-expect-error TS(2339): Property '_southWest' does not exist on type 'neve... Remove this comment to see the full error message
      return `/askedServices/in-map-view/${bounds?._southWest?.lat || 0}/${bounds?._southWest?.lng || 0}/${bounds?._northEast?.lat || 0}/${bounds?._northEast?.lng || 0}`;
    }

    const [url, setURL] = useState(getURL());
  

    const {
      resources: services,
      getAll: getAllServices,
      error: errorServices,
      loading: isLoadingServices,
      setURL: setURLServices
    } = useResource(url);

    useEffect(() => {
  
       // const url = getURL() + `?categoryId=${filters.categoryId}&priceRange=${filters.priceRange}&availability=${filters.availability}&minimumRating=${filters.minimumRating}&serviceType=${filters.serviceType}&serviceStatus=${filters.serviceStatus}`;
       // console.log(url);
        setURLServices(url);

    }, [url]);

  
    const applayFiltersToServices = (services: any) => {

      /*
       categoryId,
        priceRange,
        availability,
        minimumRating,
        serviceType,
        serviceStatus,
      */
      let filteredServices = services.filter((service: any) => {
        let isValid = true;
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
        if(filters.serviceType && filters.serviceType.length > 0){
      
            isValid = isValid && service.name.toLowerCase().includes(filters.serviceType.toLowerCase()) || service.description.toLowerCase().includes(filters.serviceType.toLowerCase());
  
        }
        if(filters.serviceStatus){
          isValid = isValid && service.status == filters.serviceStatus;
        }

        return isValid;
      });

      return filteredServices;
    }



    useEffect(() => {
      setURL(getURL() + `?categoryId=${filters.categoryId}&priceRange=${filters.priceRange}&availability=${filters.availability}&minimumRating=${filters.minimumRating}&serviceType=${filters.serviceType}&serviceStatus=${filters.serviceStatus}`);

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
          ///setOVServices(applayFiltersToServices(services));
          setOVServices(services);
      }
      }
      else{
        if (services) {
          //setOVAskedServices(applayFiltersToServices(services));
          setOVAskedServices(services);
        }
      }

    }, [services]);

    useEffect(() => {
        if (errorServices) {
            console.log('error',errorServices);
        }
    }, [errorServices]);


    const updateBounds = (bounds: any) => {
        setBounds(bounds);
    };

    useEffect(() => {
      //when the filters change, we need to reapply the filters to the services
      setURL(getURL() + `?categoryId=${filters.categoryId}&priceRange=${filters.priceRange}&availability=${filters.availability}&minimumRating=${filters.minimumRating}&serviceType=${filters.serviceType}&serviceStatus=${filters.serviceStatus}`);
      if (services) {
        if(!isAsked){
          //setOVServices(applayFiltersToServices(services));
          setOVServices(services);
        }
        else{
          //setOVAskedServices(applayFiltersToServices(services));
          setOVAskedServices(services);
        }
      }
      
      const delayDebounceFn = setTimeout(() => {
        if (bounds != null) {
            if (!isLoadingServices) {
                getAllServices();
            }
        }
    }, 500); 

    return () => clearTimeout(delayDebounceFn); 
    }, [filters]);


    return {services, isLoadingServices, errorServices, updateBounds};
}

export default useInMapView;