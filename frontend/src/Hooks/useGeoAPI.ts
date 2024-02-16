import { useEffect, useState } from "react";
import axios from "../api/axios";

const useGeoAPI = () => {
  const apiKey = "36f6faa4305a4893af3198d28e900765";
  const [address, setAddress] = useState("");
  const [suggest, setSuggest] = useState([]);

  const [loading, setLoading] = useState(false);
  const url = `https://api.geoapify.com/v1/geocode/`;

  useEffect(() => {
    console.log(suggest);
  }, [suggest]);

  const getSuggestions = async () => {
    if (!address) return [];
    setLoading(true);
    try {
      const response = await axios.get(
        url + `autocomplete?text=${address}&limit=5&apiKey=${apiKey}`
      );
      const data = await response.data;

      const suggestions = data?.features?.map((item: any) => {
        const prop = item.properties;
        return {
            name: prop.formatted,
            lat: prop.lat,
            lng: prop.lon,
        }
      });
      setSuggest(suggestions);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return [];
    }
  };


  

  useEffect(() => {
    getSuggestions();
  }, [address]);

  return { address, setAddress, getSuggestions, loading, suggest };
};

export default useGeoAPI;
