import { Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useCurrentUser from '../../Hooks/useCurrentUser';
import logo from '../../assets/logo.png';
import sameUserLogo from '../../assets/sameUserLogo.png';
import { useEffect, useMemo, useState } from 'react';

const MarkerService = ({ service }) => {
    const currentUser = useCurrentUser();
    const [hover, setHover] = useState(false);

    const isSameUser = currentUser._id === service.partnerId;
    const position = {
        lat: service?.position?.coordinates?.[1] || 0,
        lng: service?.position?.coordinates?.[0] || 0,
    };
    const handleHover = (hov) => {

      setHover(hov);
  };

    const icon = L.icon({
        iconUrl: isSameUser ? sameUserLogo : logo,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -50],
    });

    const eventHandlers = useMemo(() => (
      {
      mouseover: () => {handleHover(true);},
      mouseout: () => {handleHover(false)},
      }),
  
      [],
  )

  
  let key = position + hover;
    return (
        <Circle 
        key={key}
            center={position} 
            radius={service?.range || 0}
            color={isSameUser ? hover ? "lightgreen" : "green" : hover ? "#1077EF" : "#78B9EB"}
        >
            <Marker
                position={position} 
                icon={icon}
                eventHandlers={eventHandlers}
            >
                <Popup>
                    <h2>{service?.name}</h2>
                    <h3>{service?.description}</h3>
                </Popup>
            </Marker>
            <Popup>
                <h2>
                    {service.name} can go for {service.range}M from
                    his house
                </h2>
            </Popup>
        </Circle>
    );
};

export default MarkerService;
