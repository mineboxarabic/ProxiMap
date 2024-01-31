import { useState } from 'react';
import useGeneral from './useGeneral';
const useServicesHistory = () => {

    const {historyOfChanges, setHistoryOfChanges,setSelectedService, selectedService} = useGeneral();
    
    const isServiceInHistory = (service) => {
        return historyOfChanges.find((ser) => ser?._id === service?._id);
    }

    const addServiceToHistory = (service) => {
        setHistoryOfChanges([...historyOfChanges, service]);
    }

    const updateServiceInHistory = (service) => {
        const updatedHistory = historyOfChanges.map(ser =>
            ser?._id === service?._id ? service : ser
        );
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
    
        if (serviceInHistory) {
            //If the service is in history, we update it
           updateServiceInHistory(updatedService);
        } else {
            //If the service is not in history, we add it to the history
            addServiceToHistory(updatedService);
        }
    }

    const selectService = (service) => {
        //Why do we need to check if the service is in history?
        //Because if it is in history, we want to select the service from history to be able to change the settings of it and update it

        const isService = isServiceInHistory(service);
        if(isService){
            setSelectedService(isService);
        }
        else{
            setSelectedService(service);
        }
    }

    const isCurrentServiceSelected = (service) => {
        return selectedService?._id === service?._id;
    }

    const getService = (service) => {
        return historyOfChanges.find((ser) => ser?._id === service?._id);
    }

    const removeServiceFromHistory = (service) => {
        const updatedHistory = historyOfChanges.filter((ser) => ser?._id !== service?._id);
        setHistoryOfChanges(updatedHistory);
    }

    const updateDB = (updateService) => {
        if (historyOfChanges?.length > 0) {
            historyOfChanges.forEach((service) => {
              updateService(service);
            });
          }
    }



    



    return {updatePosition, isServiceInHistory,selectService, isCurrentServiceSelected, selectedService
    ,getService
    ,updateDB,
    historyOfChanges,
    setSelectedService
    };

}

export default useServicesHistory;