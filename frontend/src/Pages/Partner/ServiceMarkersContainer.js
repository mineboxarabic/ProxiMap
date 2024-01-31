
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import useCurrentUser from "../../Hooks/useCurrentUser";
import EditableMarker from "./EditableMarker";
import useGeneral from "../../Hooks/useGeneral";
import useServicesHistory from "../../Hooks/useServicesHistory";
  
  const ServicMarkersContainer = ({services, isLoadingServices}) => {


    const {selectedService} = useGeneral();
    //const {historyOfChanges, setHistoryOfChanges} = useGeneral();

    const {historyOfChanges, isServiceInHistory} = useServicesHistory();

    const currentUser = useCurrentUser();


    useEffect(() => {
        /*if (selectedService) {
            if (historyOfChanges.find((service) => service._id === selectedService._id)) {
              const newHistory = historyOfChanges.map((service) => {
                if (service._id === selectedService._id) {
                  return selectedService;
                } else {
                  return service;
                }
              }
              );
                setHistoryOfChanges(newHistory);
            } else {
              setHistoryOfChanges([...historyOfChanges, selectedService]);
            }
        }*/
        
    }
    ,[selectedService]);


    useEffect(() => {
      console.log('historyOfChanges', historyOfChanges);
    }
    ,[historyOfChanges]);

    return (
        <>
              {services.length > 0 ? (
                services.map((service, index) => {
                  const isSameUser = currentUser._id === service.partnerId;
                  return (
                    <EditableMarker key={index} sameUser={isSameUser} service={service} />
                  );
                })
              ) : (
                <h1>Loading...</h1>
              )}
            </>
    );
  };
  
  export default ServicMarkersContainer;
  