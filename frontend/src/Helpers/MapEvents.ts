
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useLocalStorage from '../Hooks/useLocalStorage';
import useBounds from '../Hooks/useBounds';
import 'leaflet-search';


import L from 'leaflet';
  
export default function MapEvents({
    setBounds,
    setPosition,
    position
}: any) {
    const map = useMap();
    
    const goTo = (lat: any, lng: any) => {
        map.flyTo([lat, lng], map.getZoom());
    }

    useEffect(() => {
        if(!position) return;
        goTo(position.lat, position.lng);
    }, [position]);

    useEffect(() => {
        if (!map) return;
      //Here we find the user location and set the position
      //We also ask for permission to use the location
        map.locate().on("locationfound", function (e: any) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        });
      }, [map]);


    useEffect(() => {
        map.on('moveend', () => {
          //Each time the map is moved, we update the bounds
          //Thie bounds are four coordinates that define the area of the map
          if(typeof setBounds !== 'function') return; 
          setBounds(map.getBounds());
        });    
        return () => {
            map.off('moveend');
        };
    }, [map]);
  
    return null;
  }
  