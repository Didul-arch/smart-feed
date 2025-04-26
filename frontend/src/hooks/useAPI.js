import { useState, useEffect } from 'React';
import axios from 'axios';

export const useFetchData = (endPoint, baseUrl) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    setState(prev => ({ ...prev, loading:true }));

    axios.get(`${baseUrl}/${endPoint}`)
      .then((response) => {
        setState({
          data: response.data,
          loading: false,
          error: null
        });
      })
      .catch((err) => {
        setState({
          data: null,
          loading: false,
          error: err.message
        });
      })
  }, [endpoint, baseUrl]);
  
  return state;
}
