import { useState, useEffect } from 'react';

export const useLocationsData = () => {
  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const response = await fetch('/data/locations.json');
        const data = await response.json();
        setLocationsData(data);
      } catch (error) {
        console.error('Error fetching locations data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationsData();
  }, []);

  return { locationsData, loading, error };
};