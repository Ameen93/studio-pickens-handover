import { useState, useEffect } from 'react';

export const useContactData = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('/data/contact.json');
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return { contactData, loading, error };
};