import { useState, useEffect } from "react";
import useResource from "../useResource";
import useLocalStorage from "../useLocalStorage";
import useGeneral from "../useGeneral";
import useAxiosPrivate from "../useAxiosPrivate";
import Service from "../../Classes/Service";
const useInMapView = (isAsked: boolean) => {
    const [bounds, setBounds] = useState<any>(null);


    // @ts-expect-error TS(2339): Property 'oVServices' does not exist on type '{}'.
    const {oVServices, setOVServices , oVAskedServices, setOVAskedServices, filters} = useGeneral();
    const [allServices, setAllServices] = useState<any[]>([]);
    const axiosPrivate = useAxiosPrivate();

    const getURL = () => {


      if(!isAsked) return `/services/in-map-view/${bounds?._southWest?.lat || 0}/${bounds?._southWest?.lng || 0}/${bounds?._northEast?.lat || 0}/${bounds?._northEast?.lng || 0}` 


      return `/askedServices/in-map-view/${bounds?._southWest?.lat || 0}/${bounds?._southWest?.lng || 0}/${bounds?._northEast?.lat || 0}/${bounds?._northEast?.lng || 0}`;
    }

    const [url, setURL] = useState<string>(getURL());
  

    const {
      resources: services ,
      getAll: getAllServices,
      error: errorServices,
      loading: isLoadingServices,
      setURL: setURLServices
    } = useResource<Service>(url);

    useEffect(() => {
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
          setAllServices((prevServices) => [...prevServices, ...services]);
          setOVServices(allServices);
      }
      }
      else{
        if (services) {
          setAllServices((prevServices) => [...prevServices, ...services]);
          setOVAskedServices(allServices);
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