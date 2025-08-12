import { useState, useEffect } from 'react';

export const useCarousel = (items, options = {}) => {
  const {
    autoPlay = true,
    autoPlayInterval = 4000,
    loop = true
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalItems <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalItems]);

  const goToNext = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
    }
  };

  const goToPrevious = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalItems - 1;

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    isFirst,
    isLast,
    totalItems
  };
};