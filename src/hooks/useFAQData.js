import { useState, useEffect } from 'react';

export const useFAQData = () => {
  const [faqData, setFaqData] = useState({
    banner: {
      backgroundImage: {
        desktop: '/images/faq/wig-heads-studio-banner.jpg',
        mobile: '/images/faq/wig-heads-studio-banner.jpg'
      },
      height: '705px',
      objectPosition: '50% 15%',
      transform: {
        scale: 1.2,
        translateX: 0,
        translateY: 0,
        flip: false
      }
    },
    items: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch('/data/faq.json');
        const data = await response.json();
        
        // Ensure we have the required structure
        setFaqData({
          banner: data.banner || {
            backgroundImage: {
              desktop: '/images/faq/wig-heads-studio-banner.jpg',
              mobile: '/images/faq/wig-heads-studio-banner.jpg'
            },
            height: '705px',
            objectPosition: '50% 15%',
            transform: {
              scale: 1.2,
              translateX: 0,
              translateY: 0,
              flip: false
            }
          },
          items: data.items || []
        });
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  return { faqData, loading, error };
};