import { useState, useEffect } from "react";
import api, { createRequest } from "../services/api";

export const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);

  // Function to trigger a refetch
  const refresh = () => {
    setRefetch((prev) => prev + 1);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.get(url, options);

        if (isMounted) {
          setData(response.data.data || response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, refetch]);

  return { data, loading, error, refresh };
};

export const useSubmitData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitData = async (url, method, data, contentType = "json") => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Choose appropriate API instance based on content type
      const apiInstance = createRequest(data, contentType);

      const response = await apiInstance({
        url,
        method,
        data,
      });

      setSuccess(true);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { submitData, loading, error, success };
};
