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
const EditableMarker = ({service, selected, setSelected}) => 
{
    const [position, setPosition] = useState({
        lat: service?.position?.coordinates[1] || 0,
        lng: service?.position?.coordinates[0] || 0,
    });
    
    const {selectedService, setSelectedService, historyOfChanges, setHistoryOfChanges} = useGeneral();
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



    const serviceSet = historyOfChanges.find((ser) => ser?._id === service?._id);


    const updateServcePostion = () => {
            if(serviceSet){
                const newService = { ...serviceSet, position: { ...serviceSet.position, coordinates: [position.lng, position.lat] } };
                
                setHistoryOfChanges([...historyOfChanges.filter((ser) => ser?._id !== service?._id), newService])
            }
            else{
                const newService = { ...service, position: { ...service.position, coordinates: [position.lng, position.lat] } };
                setHistoryOfChanges([...historyOfChanges, newService]);
            }
    }

    const manageSelectionStatus = () => {
        const serviceSet = historyOfChanges.find((ser) => ser?._id === service?._id);
        //we check if the service is draggable and if it is not the selected service
        //We check if it's not selected service so that we unselect it when we double click on it again
        if (draggable && selectedService?._id !== service._id) {
            //if the service exists in the history of changes we put it in the selected service
            if (serviceSet) {
                setSelectedService(serviceSet);
            } else {
                setSelectedService(service);
            }
        } else if (!draggable && selectedService?._id === service._id) {
            setSelectedService(null);
        }
    }; 

    useEffect(() => {
        handleHover(false)
    }, [])
  
    useEffect(() => {
       updateServcePostion();
    }
    , [position]);


    useEffect(() => {
        manageSelectionStatus();
    }, [draggable]);


    useEffect(() => {
        setDraggable(selectedService?._id === service._id);
    }, [selected, service._id]);

    useEffect(() => {
        setDraggable(prev =>{
        if(selectedService == null) return false;
        return selectedService._id === service._id;
        })
    }, [selectedService]);

    const key = position.toString() + color;
    return(
        <Circle key={key} center={position} radius={
                serviceSet ? serviceSet?.range : service?.range
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