import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ 
  children, 
  title = 'Studio Pickens', 
  description = 'Premium creative studio delivering visionary concepts for film, television, music, and theatre with meticulous attention to detail.',
  showFooter = true 
}) => {
  React.useEffect(() => {
    // Set page title
    document.title = title;
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    // Set Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = description;
    
    // Add structured data for organization
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Studio Pickens",
        "description": "Premium creative studio delivering visionary concepts for film, television, music, and theatre",
        "url": window.location.origin,
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "283 Wythe Avenue",
            "addressLocality": "Brooklyn",
            "addressRegion": "NY",
            "postalCode": "11249",
            "addressCountry": "US"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "9465 Wilshire Boulevard",
            "addressLocality": "Beverly Hills",
            "addressRegion": "CA",
            "postalCode": "90212",
            "addressCountry": "US"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "17 Langley Court",
            "addressLocality": "London",
            "postalCode": "WC2E 9JY",
            "addressCountry": "GB"
          }
        ],
        "sameAs": [
          "https://instagram.com/studiopickens"
        ]
      });
      document.head.appendChild(structuredData);
    }
  }, [title, description]);

  return (
    <div className="bg-studio-bg w-full">
      <Navbar />
      <main className="w-full pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;