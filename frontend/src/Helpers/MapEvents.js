
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import useLocalStorage from '../Hooks/useLocalStorage';
import useBounds from '../Hooks/useBounds';
import 'leaflet-search';
import L from 'leaflet';
  
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

        const searchControle = L.control.search({
          position: "topleft",
          layer: L.geoJSON(),
          propertyName: "name",
          marker: false,
          moveToLocation: function (latlng, title, map) {
            map.flyTo(latlng, map.getZoom());
          },
        });

        searchControle.on("search:locationfound", function (e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
        });

        map.addControl(searchControle);


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
  