import { useRef, useState } from 'react';
import useGeneral from './useGeneral';
import { useEffect } from 'react';
const useServicesHistory = () => {

    const {historyOfChanges, setHistoryOfChanges,setSelectedService, selectedService} = useGeneral();
    
    const isServiceInHistory = (service) => {
        return historyOfChanges.find((ser) => ser?._id === service?._id);
    }



    const addServiceToHistory = (service) => {

        setHistoryOfChanges([...historyOfChanges, service]);

    }

    const updateServiceInHistory = (service) => {

        const updatedHistory = historyOfChanges.map((ser) => {
            if(ser?._id === service?._id){
                return service;
            }
            return ser;
        });
        setHistoryOfChanges(updatedHistory);


    }

    
    const updatePosition = (service, newPosition) => {
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

    const selectService = (service) => {
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

    const updateSelectedService = (service) => {
        const isService = isServiceInHistory(service);
        if(isService){
            updateServiceInHistory(service);
        }
        else{
            addServiceToHistory(service);
        }
    }

    const isCurrentServiceSelected = (service) => {
        return selectedService?._id === service?._id;
    }

    const getService = (service) => {
        return historyOfChanges.find((ser) => ser?._id === service?._id);
    }

    const removeServiceFromHistory = (service) => {
        const isService = isServiceInHistory(service);
        if(!isService) return;
        const updatedHistory = historyOfChanges.filter((ser) => ser?._id !== service?._id);
        if(isService)
        {
            setHistoryOfChanges(updatedHistory);
        }
    }

    const updateDB = async (updateService) => {
        if (historyOfChanges?.length > 0) {
            historyOfChanges.forEach(async (service) => {
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