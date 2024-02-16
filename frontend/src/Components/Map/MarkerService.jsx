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

    //const isSameUser = isAsked ? currentUser._id === service.userId : currentUser._id === service.partnerId
    const [isSameUser, setIsSameUser] = useState(false);


    const [color, setColor] = useState(null);
    const position = {
        lat: service?.position?.coordinates?.[1] || 0,
        lng: service?.position?.coordinates?.[0] || 0,
    };
 
    const getColor = () => {
        //if it's the same user
        if(isAsked){
            //return "gray";
            setColor("gray");
            return "gray";
        }
        if (isSameUser) {

            setColor("#4a7a32");
            return "#4a7a32"
           


        }else{
            setColor("#329FB2");
           return "#329FB2";
 
        }

       
    }
    useEffect(() => {
        getColor();
    }
    , [isAsked, isSameUser, service]);
    useEffect(() => {
        if (isAsked) {
            setIsSameUser(currentUser._id === service?.userId);
        }
        else {
            setIsSameUser(currentUser._id === service?.partnerId);
        }

    }, [currentUser, service, isAsked]);



    const getIcon = () =>{
        if(!isAsked){
            
            return(
                <FmdGoodTwoToneIcon
                    style={{
                        width: "100%",
                        height: "100%",
                        color: color,
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


  
  let key = position + color;
    return (
        <Circle 
        key={key}
            center={position} 
            radius={service?.range || 0}
            
            color={color}
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
