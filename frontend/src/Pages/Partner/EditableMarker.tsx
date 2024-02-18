

import { CircleMarker } from "leaflet";
import { Circle, Marker, Popup } from "react-leaflet";


import L from "leaflet";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { Tooltip } from "react-leaflet";


// @ts-expect-error TS(2307): Cannot find module '../../assets/dragableLogo.png'... Remove this comment to see the full error message
import  dragableLogo  from '../../assets/dragableLogo.png';
import useLocalStorage from "../../Hooks/useLocalStorage";
import useGeneral from "../../Hooks/useGeneral";
import '../../Style/editableMap.scss'
import useServicesHistory from "../../Hooks/useServicesHistory";
import "../../Style/Map.scss";



const EditableMarker = ({
    service,
    isAsked
}: any) => 
{


    const {updatePosition, 
        isServiceInHistory, 
        selectService,
        isCurrentServiceSelected,
        selectedService,
        getService,
        updateSelectedService
    } = useServicesHistory();

    const [position, setPosition] = useState({
        lat: isServiceInHistory(service) ? getService(service)?.position?.coordinates?.[1] : service?.position?.coordinates?.[1],
        lng: isServiceInHistory(service) ? getService(service)?.position?.coordinates?.[0] : service?.position?.coordinates?.[0]
    });

    useEffect(() => {
        setPosition({
            lat: isServiceInHistory(service) ? getService(service)?.position?.coordinates?.[1] : service?.position?.coordinates?.[1],
            lng: isServiceInHistory(service) ? getService(service)?.position?.coordinates?.[0] : service?.position?.coordinates?.[0]
        });
    }, [service]);



    const [draggable, setDraggable] = useState(false)
    const [color, setColor] = useState("blue");

    const markerRef = useRef(null)


    const eventHandlers = useMemo(() => (
        {
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                //setPosition(marker.getLatLng());


                // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
                const lat = marker.getLatLng().lat;


                // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
                const lng = marker.getLatLng().lng;
                setPosition({lng,lat});
            }
        },
        dblclick: ()=>{setDraggable((d) => !d) },
        }),
    
        [],
    )


  
    useEffect(() => {
        if(draggable){
            if(isServiceInHistory(service)){
                updateSelectedService({...getService(service), position: {
                        type: "Point",
                    coordinates: [position.lng, position.lat]}});
            }else{
                updateSelectedService({...service, position: {
                        type: "Point",
                    coordinates: [position.lng, position.lat]}});
            }
            
        } 
    }
    , [position]);


    useEffect(() => {
        //If the service is double clicked, it will be selected
        
        if(draggable){
            selectService(service);
        }else if(!draggable && isCurrentServiceSelected(service)){
            selectService(null);
        }
   
    }, [draggable]);


    useEffect(() => {
        setDraggable(isCurrentServiceSelected(service) ? true : false);
    }, [selectedService]);

    useEffect(() => 
    {
        console.log('isAsked', isAsked);
    }, [isAsked]);

    const key = position.toString() + color;
    if(!isAsked) return(
    


        <Circle key={key} center={position} radius={
               isServiceInHistory(service) ? getService(service)?.range : service?.range || 0
            } 
            color={color}
            //Dont show if isAsked is true
            
            className="circle"
        >
            <Marker


            draggable={draggable}
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={position} icon={L.icon({
                iconUrl: draggable ? dragableLogo : "https://cdn-icons-png.flaticon.com/512/7711/7711464.png",
                iconSize: draggable ? [50, 50] : [40, 40],
                iconAnchor: draggable ? [25, 45] : [25, 25],
                popupAnchor: [0, -50],
                className: "marker"
            })} 
            >
            </Marker>

        </Circle>
    
    )
    else return(
        <Marker


        draggable={draggable}
        eventHandlers={eventHandlers}
        ref={markerRef}
        position={position} icon={L.icon({
            iconUrl: draggable ? dragableLogo : "https://cdn-icons-png.flaticon.com/512/7711/7711464.png",
            iconSize: draggable ? [50, 50] : [40, 40],
            iconAnchor: draggable ? [25, 45] : [25, 25],
            popupAnchor: [0, -50],
            className: "marker"
        })} 
        >
        </Marker>
    )


}
export default EditableMarker;