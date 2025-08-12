import { useState, useEffect } from 'react';

export const useStoryData = () => {
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch('/data/story.json');
        const data = await response.json();
        setStoryData(data);
      } catch (error) {
        console.error('Error fetching story data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, []);

  return { storyData, loading, error };
};