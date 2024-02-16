
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import useCurrentUser from "../../Hooks/useCurrentUser";
import EditableMarker from "./EditableMarker";
import useGeneral from "../../Hooks/useGeneral";
import useServicesHistory from "../../Hooks/useServicesHistory";
import React from "react";
  
  const ServicMarkersContainer = ({
    services,
    isAsked,
    isLoadingServices
  }: any) => {




    // @ts-expect-error TS(2339): Property 'selectedService' does not exist on type ... Remove this comment to see the full error message
    const {selectedService} = useGeneral();
    //const {historyOfChanges, setHistoryOfChanges} = useGeneral();

    const {historyOfChanges, isServiceInHistory} = useServicesHistory();

    const currentUser = useCurrentUser();




    

    return <>
          {services.length > 0 ? (
            services.map((service: any, index: any) => {
              const isSameUser = currentUser._id === service.partnerId || currentUser._id === service.userId;
              
              return (

                <EditableMarker key={index} sameUser={isSameUser} service={service} isAsked={isAsked} />
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </>;
  };
  
  export default ServicMarkersContainer;
  