import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    Circle,
    CircleMarker,
  } from "react-leaflet";
  import { Box } from "@mui/system";
  import "leaflet/dist/leaflet.css";
  import { useEffect, useState } from "react";
  import L from "leaflet";

  import MapEvents from "../../Helpers/MapEvents";
  import useInMapView from "../../Hooks/Services/useInMapView";
  import ServiceList from "../../Components/ServiceList";
  import ServiceDetailsDrawer from "../../Components/ServiceDetailsDrawer";
  import MapSearchBar from "../../Components/MapSearchBar";
  import { Alert } from "@mui/material";
  import useCurrentUser from "../../Hooks/useCurrentUser";
import useCurrentPartnerServices from "../../Hooks/Services/useCurrentPartnerServices";
import EditableMarker from "./EditableMarker";
import useGeneral from "../../Hooks/useGeneral";
import useLocalStorage from "../../Hooks/useLocalStorage";
  
  const ServicMarkersContainer = ({services, isLoadingServices}) => {


    const [selected, setSelected] = useState(null);
    const {selectedService, setSelectedService} = useGeneral();

    const [changeHistory, setChangeHistory] = useState([]);
    const {historyOfChanges, setHistoryOfChanges} = useGeneral();


  
  
    const currentUser = useCurrentUser();
    //Change value to historyOfChanges

    useEffect(() => {
        if (services && selectedService) {
            //if selectedService is already in the history, we don't add it again but we update it
            if (changeHistory.find((service) => service._id === selectedService._id)) {
                const newHistory = changeHistory.map((service) => {
                    if (service._id === selectedService._id) {
                        return selectedService;
                    } else {
                        return service;
                    }
                });
                setChangeHistory(newHistory);
            } else {
                setChangeHistory([...changeHistory, selectedService]);
            }
        }
    }
    ,[selectedService]);

    useEffect(() => {
        setHistoryOfChanges(changeHistory);
    }
    ,[changeHistory]);

    useEffect(() => {
        console.log('changeHistory', historyOfChanges);
    }
    ,[historyOfChanges]);

    return (
        <>
              {services.length > 0 ? (
                services.map((service, index) => {
                  const isSameUser = currentUser._id === service.partnerId;
                  return (
                    <EditableMarker key={index} sameUser={isSameUser} service={service} selected={selected} setSelected={setSelected}  />
                  );
                })
              ) : (
                <h1>Loading...</h1>
              )}
            </>
    );
  };
  
  export default ServicMarkersContainer;
  