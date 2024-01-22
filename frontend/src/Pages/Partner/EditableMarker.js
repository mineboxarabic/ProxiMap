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
const EditableMarker = ({service, opacity , sameUser, selected, setSelected}) => 
{
    const lat = service?.position?.coordinates[1] || 0;
    const lng = service?.position?.coordinates[0] || 0;

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState([lat, lng])
    const [hovered, setHovered] = useState(false);
    const [color, setColor] = useState("blue");

    const {selectedService, setSelectedService, historyOfChanges, setHistoryOfChanges} = useGeneral();

    const markerRef = useRef(null)



    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
      }, [])

    const eventHandlers = useMemo(
        () => ({
   
          dragend() {

            const marker = markerRef.current
            if (marker != null) {
 

              setPosition(marker.getLatLng())
            }
          },
          dblclick: ()=>{
            toggleDraggable();
            
          },
            mouseover: () => {
                setHovered(true);
            },
            mouseout: () => {
                setHovered(false);
            },
        }),
       
        [],
      )



      const serviceSet = historyOfChanges.find((ser) => ser?._id === service?._id);

    useEffect(() => {
        //Edit the service position
        if (selectedService?._id === service?._id) {
            console.log('position', position);
            const newService = { ...service };
            newService.position.coordinates[0] = position.lng;
            newService.position.coordinates[1] = position.lat;
            setSelectedService(newService);
        }
    }   
    , [position]);

    useEffect(() => {
        if (hovered) {
            if(draggable) {
                setColor("darkblue");
            }else{
                setColor("#1077EF");

            }

        } else {
            setColor("#78B9EB");


        }
    }, [hovered]);


    useEffect(() => {
        // If this marker is draggable and not already selected, make it selected
        if (draggable && selectedService?._id !== service._id) {
            setSelected(serviceSet ? serviceSet : service);
            setSelectedService(serviceSet ? serviceSet : service);
        }
        // If this marker is not draggable and is currently selected, deselect it
        else if (!draggable && selectedService?._id === service._id) {
            setSelected(null);
            setSelectedService(null);
        }
    }, [draggable]);


    useEffect(() => {
        console.log('selected', selectedService?._id);
        setDraggable(selectedService?._id === service._id);
    }, [selected, service._id]);


    const key = position.toString() + color;
    return(
        <Circle key={key} center={position} radius={
                serviceSet ? serviceSet?.range : service?.range
        } color={color}>
            <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={position} icon={L.icon({
                iconUrl: draggable ? dragableLogo : "https://cdn-icons-png.flaticon.com/512/7711/7711464.png",
                iconSize: draggable ? [50, 50] : [40, 40],
                iconAnchor: draggable ? [25, 45] : [25, 25],
                popupAnchor: [0, -50],
            })}>
    
            </Marker>

        </Circle>
    )


 }
export default EditableMarker;