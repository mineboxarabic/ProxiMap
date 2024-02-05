import { Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useCurrentUser from '../../Hooks/useCurrentUser';
import logo from '../../assets/logo.png';
import sameUserLogo from '../../assets/sameUserLogo.png';
import { useEffect, useMemo, useState } from 'react';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import {renderToStaticMarkup} from 'react-dom/server';
import '../../Style/Map.scss';

//Same user: circle: #599965  icon: #4a7a32

const MarkerService = ({ service, isAsked }) => {
    const currentUser = useCurrentUser();

    const isSameUser = isAsked ? currentUser._id === service.userId : currentUser._id === service.partnerId
    const [color, setColor] = useState("#78B9EB");
    const position = {
        lat: service?.position?.coordinates?.[1] || 0,
        lng: service?.position?.coordinates?.[0] || 0,
    };
 
    const getColor = () => {
        //if it's the same user
        if (isSameUser) {

            return "#4a7a32"
            //if it's the same user and it's an asked service
            if(isAsked){
                return "gray";
            }

        }else{

            //setColor("#78B9EB");
            return "#78B9EB";
            if(isAsked){
           //     setColor("gray");
             return "gray";
            }
        }
    }

    const getIcon = () =>{
        if(!isAsked){

            return(
                <FmdGoodTwoToneIcon
                    style={{
                        width: "100%",
                        height: "100%",
                        color: getColor(),
                        cursor: "pointer",
                    }}
                    />
            )

        }
        else{

            return(
                <AddLocationTwoToneIcon
                    style={{
                        width: "100%",
                        height: "100%",
                        color: color,
                        cursor: "pointer",
                    }}
                    />
            )

        }
       
    }


    


    const iconMarkup = renderToStaticMarkup(getIcon());
    const customIcon = L.divIcon({
        className: 'remove-background',
        html: iconMarkup,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -50],
    });


  
  let key = position;
    return (
        <Circle 
        key={key}
            center={position} 
            radius={service?.range || 0}
            
            color={getColor()}
            fillOpacity={0.2}
            weight={2}
           //className={'circle',"notSameUser"}
           //two classes



        >
        
            <Marker
                position={position} 
                icon={customIcon}
           
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
