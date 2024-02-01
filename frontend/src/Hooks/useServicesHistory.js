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

        const updatedHistory = historyOfChanges.map(ser =>ser?._id === service?._id ? service : ser);


        const selectedService = updatedHistory.find((ser) => ser?._id === service?._id);
        const index = updatedHistory.indexOf(selectedService);
        updatedHistory.splice(index, 1);
        updatedHistory.push(selectedService);
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

        addServiceToHistory(updatedService);
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




    const getSelectedService = () => {
         if(!selectedService) return null;
        if(historyOfChanges.find((ser) => ser?._id === selectedService?._id)){
            //If the service is in history, return the service from history
            return historyOfChanges.find((ser) => ser?._id === selectedService?._id);
        }
        else{
            //If the service is not in history, return the service from the database
            return selectedService;
        }
    }


    useEffect(() => {
        if (selectedService) {

            if (isServiceInHistory(selectedService)) {
                const serviceInHistory = isServiceInHistory(selectedService);
                setSelectedService(serviceInHistory);
            }


            else {
                setSelectedService(selectedService);
            }

            
        }
    }
    ,[selectedService]);
  
  
    
 
    return {updatePosition,getSelectedService, isServiceInHistory,selectService, isCurrentServiceSelected, selectedService
    ,getService
    ,updateDB,
    historyOfChanges,
    setSelectedService
    };

}

export default useServicesHistory;