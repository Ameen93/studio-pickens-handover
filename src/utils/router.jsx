// Simple client-side routing utility
// For production, consider using React Router or Next.js

export const routes = {
  '/': () => import('../pages/index'),
  '/work': () => import('../pages/work'),
  '/process': () => import('../pages/process'),
  '/story': () => import('../pages/story'),
  '/locations': () => import('../pages/locations'),
  '/contact': () => import('../pages/contact'),
  '/faq': () => import('../pages/faq')
};

export const navigate = (path) => {
  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Simple router component for development
export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return children;
};