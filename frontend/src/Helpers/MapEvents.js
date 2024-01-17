
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useLocalStorage from '../Hooks/useLocalStorage';
import useBounds from '../Hooks/useBounds';
  
export default function MapEvents({
    setBounds,
    setPosition
}) {
    const map = useMap();
    

    useEffect(() => {
        if (!map) return;
    
     
        map.locate().on("locationfound", function (e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        });
      }, [map]);


    useEffect(() => {
        map.on('moveend', () => {
            setBounds(map.getBounds());
        });    
        return () => {
            map.off('moveend');
        };
    }, [map]);
  
    return null;
  }
  