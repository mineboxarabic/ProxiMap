
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
  