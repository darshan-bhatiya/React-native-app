import {useEffect, useState} from 'react';
import {RADPID_API_KEY} from 'react-native-dotenv';
import axios from 'axios';

export const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const repidApiKey = RADPID_API_KEY.split(',');

  const fetchData = async () => {
    let lastError = null;
    setIsLoading(true);
    for (const key of repidApiKey) {
      try {
        const options = {
          method: 'GET',
          url: `https://jsearch.p.rapidapi.com/${endpoint}`,
          headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
          params: {...query},
        };

        const response = await axios.request(options);
        setError(null);
        setIsLoading(false);
        setData(response.data.data);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    setError(lastError);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData()
  }, []);

  const refetch = () => {
    fetchData()
  };

  return {refetch, data, error, isLoading};
};
