import { useRef, useState } from 'react';
import useGeneral from './useGeneral';
import { useEffect } from 'react';
const useServicesHistory = () => {

    // @ts-expect-error TS(2339): Property 'historyOfChanges' does not exist on type... Remove this comment to see the full error message
    const {historyOfChanges, setHistoryOfChanges,setSelectedService, selectedService} = useGeneral();
    
    const isServiceInHistory = (service: any) => {
        return historyOfChanges.find((ser: any) => ser?._id === service?._id);
    }



    const addServiceToHistory = (service: any) => {

        setHistoryOfChanges([...historyOfChanges, service]);

    }

    const updateServiceInHistory = (service: any) => {

        const updatedHistory = historyOfChanges.map((ser: any) => {
            if(ser?._id === service?._id){
                return service;
            }
            return ser;
        });
        setHistoryOfChanges(updatedHistory);


    }

    
    const updatePosition = (service: any, newPosition: any) => {
        const serviceInHistory = isServiceInHistory(service);
        const updatedService = { 
            ...service, 
            position: { 
                ...service.position, 
                coordinates: [newPosition.lng, newPosition.lat] 
            }
        };

        if(serviceInHistory){
            updateServiceInHistory(updatedService);
        }
        else{

            addServiceToHistory(updatedService);
        }
    }

    const selectService = (service: any) => {
        //Why do we need to check if the service is in history?
        //Because if it is in history, we want to select the service from history to be able to change the settings of it and update it

        if(!service){
            setSelectedService(null);
            return;
        }

        const isService = isServiceInHistory(service);
        if(isService){
            setSelectedService(isService);
        }
        else{
            setSelectedService(service);
        }
    }

    const updateSelectedService = (service: any) => {
        const isService = isServiceInHistory(service);
        if(isService){
            updateServiceInHistory(service);
        }
        else{
            addServiceToHistory(service);
        }
    }

    const isCurrentServiceSelected = (service: any) => {
        return selectedService?._id === service?._id;
    }

    const getService = (service: any) => {
        return historyOfChanges.find((ser: any) => ser?._id === service?._id);
    }

    const removeServiceFromHistory = (service: any) => {
        const isService = isServiceInHistory(service);
        if(!isService) return;
        const updatedHistory = historyOfChanges.filter((ser: any) => ser?._id !== service?._id);
        if(isService)
        {
            setHistoryOfChanges(updatedHistory);
        }
    }

    const updateDB = async (updateService: any) => {
        if (historyOfChanges?.length > 0) {
            historyOfChanges.forEach(async (service: any) => {
                console.log('service', service);
              await updateService(service);
            });
          }
    }




    const getSelectedService = () => {
         if(!selectedService) return null;
         const isService = isServiceInHistory(selectedService);
       
        if(isService){
            //If the service is in history, return the service from history
            return isService;
        }
        else{
            //If the service is not in history, return the service from the database
            return selectedService;
        }
    }


    const emptyHistory = () => {
        setHistoryOfChanges([]);
    }
  
    useEffect(() => {
        //console.log('historyOfChanges', historyOfChanges);
    }
    , [historyOfChanges]);
 
    return {updatePosition,getSelectedService, isServiceInHistory,selectService, isCurrentServiceSelected, selectedService
    ,getService
    ,updateDB,
    historyOfChanges,
    setSelectedService,
    updateSelectedService,
    removeServiceFromHistory,
    emptyHistory
    };

}

export default useServicesHistory;