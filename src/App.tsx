import React, { useState, useEffect } from 'react';
import HomePage from './pages/index';
import WorkPage from './pages/work';
import ProcessPage from './pages/process';
import StoryPage from './pages/story';
import LocationsPage from './pages/locations';
import ContactPage from './pages/contact-dynamic';
import FAQPage from './pages/faq';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/work':
        return <WorkPage />;
      case '/process':
        return <ProcessPage />;
      case '/story':
        return <StoryPage />;
      case '/locations':
        return <LocationsPage />;
      case '/contact':
        return <ContactPage />;
      case '/faq':
        return <FAQPage />;
      default:
        return <HomePage />;
    }
  };

  return renderPage();
}

export default App;
