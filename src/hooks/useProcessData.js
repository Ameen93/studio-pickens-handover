import { useState, useEffect } from 'react';

export const useProcessData = () => {
  const [processData, setProcessData] = useState({
    banner: {
      title: 'Process',
      subtitle: '',
      desktopImage: '/images/process/banner/Desktop_PROCESS Hero Banner v2.png',
      mobileImage: '/images/process/banner/Mobile_Hero Banner_process.png',
      transform: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        flip: false
      },
      circleScale: 1,
      headingScale: {
        mobile: 1,
        desktop: 1
      }
    },
    processSteps: [],
    teamCircles: {
      position: {
        top: '340px'
      },
      size: 1,
      gap: 20,
      strokeWidth: 2
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        const response = await fetch('/data/process.json');
        const data = await response.json();
        
        // Ensure we have the required structure
        setProcessData({
          banner: {
            ...data.banner,
            transform: data.banner.transform || {
              scale: 1,
              translateX: 0,
              translateY: 0,
              flip: false
            },
            circleScale: data.banner.circleScale || 1,
            headingScale: data.banner.headingScale || {
              mobile: 1,
              desktop: 1
            }
          },
          processSteps: data.processSteps || [],
          teamCircles: data.teamCircles || {
            position: {
              top: '340px'
            },
            size: 1,
            gap: 20,
            strokeWidth: 2
          }
        });
      } catch (err) {
        console.error('Error fetching process data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
  }, []);

  return { processData, loading, error };
};