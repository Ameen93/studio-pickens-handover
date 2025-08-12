import React, { useRef } from 'react';
import Layout from '../components/Layout';
import HeroBanner from '../components/HeroBanner';
import WorkGallery from '../components/WorkGallery';
import WorkBanners from '../components/WorkBanners';
import BragBar from '../components/BragBar';
import { Button } from '../components/ui';
import { useHeroData, useWorkData } from '../hooks';

const HomePage = () => {
  const galleryRef = useRef(null);
  const workGalleryRef = useRef(null);
  const { heroData, loading } = useHeroData();
  const { homeProjects } = useWorkData();

  // Map project categories to filter categories (same as work page)
  const categoryToFilterMap = {
    'FILM & TV': 'FILM & TV',
    'THEATRE': 'THEATRE',
    'CONCERT': 'CONCERT',
    'EDITORIAL': 'EDITORIAL',
    'LIVE': 'LIVE PERFORMANCE'
  };

  const handleBannerClick = (category) => {
    // Navigate to work page with the filter as URL parameter
    window.history.pushState({}, '', `/work?filter=${encodeURIComponent(category)}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleCategoryClick = (category) => {
    const filterCategory = categoryToFilterMap[category] || category;
    // Navigate to work page with the filter as URL parameter
    window.history.pushState({}, '', `/work?filter=${encodeURIComponent(filterCategory)}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <Layout title="Studio Pickens - Creative Excellence">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Atelier Wigs Section */}
      <section 
        className="relative flex items-center justify-center bg-nav-blue py-2 md:py-0"
        style={{ 
          height: 'clamp(280px, 28vw, 320px)'
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h2 
              className="text-atelier-heading-mobile md:text-h3 font-proxima-wide uppercase mb-4 md:whitespace-nowrap text-center text-studio-bg"
            >
              {loading ? 'Loading...' : (heroData.atelierTitle || 'ATELIER WIGS BY ROBERT PICKENS')}
            </h2>
            
            <div className="mb-6 max-w-3xl text-center">
              {loading ? (
                <p className="text-body md:text-body sm:text-atelier-body-mobile font-proxima text-studio-bg">
                  Loading...
                </p>
              ) : (
                Array.isArray(heroData.atelierDescription) ? (
                  heroData.atelierDescription.map((paragraph, index) => (
                    <p 
                      key={index}
                      className="text-body md:text-body sm:text-atelier-body-mobile font-proxima text-studio-bg mb-1 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-body md:text-body sm:text-atelier-body-mobile font-proxima text-studio-bg">
                    {heroData.atelierDescription || 'Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.'}
                  </p>
                )
              )}
            </div>
            
            <Button 
              href="/process" 
              variant="link"
              className="text-button-link md:text-button-link sm:text-atelier-link-mobile font-proxima-semibold"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <div ref={galleryRef} style={{ paddingTop: '56px' }}>
        <WorkGallery 
          ref={workGalleryRef}
          onCategoryClick={handleCategoryClick} 
          projects={homeProjects} 
        />
      </div>

      {/* Work Banners */}
      <WorkBanners onBannerClick={handleBannerClick} />

      {/* Brag Bar */}
      <BragBar />

    </Layout>
  );
};

export default HomePage;