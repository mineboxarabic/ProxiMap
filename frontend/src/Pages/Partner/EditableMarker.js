import { CircleMarker } from "leaflet";
import { Circle, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { Tooltip } from "react-leaflet";
import  dragableLogo  from '../../assets/dragableLogo.png';
import useLocalStorage from "../../Hooks/useLocalStorage";
import useGeneral from "../../Hooks/useGeneral";
import '../../Style/editableMap.scss'
import useServicesHistory from "../../Hooks/useServicesHistory";
const EditableMarker = ({service, selected, setSelected}) => 
{
    const [position, setPosition] = useState({
        lat: service?.position?.coordinates[1],
        lng: service?.position?.coordinates[0],
    });
    

    const {updatePosition, 
        isServiceInHistory, 
        selectService,
        isCurrentServiceSelected,
        selectedService,
        getService
    } = useServicesHistory();



    const [draggable, setDraggable] = useState(false)
    const [color, setColor] = useState("blue");

    const markerRef = useRef(null)


    const handleHover = (hover) =>{
        setColor(hover ? (draggable ? "darkblue" : "#1077EF") : "#78B9EB");
    }


    const eventHandlers = useMemo(() => (
        {
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                setPosition(marker.getLatLng());
            }
        },
        dblclick: ()=>{setDraggable((d) => !d) },
        }),
    
        [],
    )

    useEffect(() => {
        handleHover(false)
    }, [])
  
    useEffect(() => {
        updatePosition(service, position);
    }
    , [position]);


    useEffect(() => {

        if (draggable) {
            selectService(service);
        }
   
    }, [draggable]);


    useEffect(() => {
        setDraggable(selectedService?._id === service._id);
    }, [selected, service._id]);

    useEffect(() => {
        setDraggable(isCurrentServiceSelected(service) ? true : false);
    }, [selectedService]);

    const key = position.toString() + color;
    return(
        <Circle key={key} center={position} radius={
               isServiceInHistory(service) ? getService(service)?.range : service?.range
        } color={color}
            className="rangeCircle"
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


}
export default EditableMarker;