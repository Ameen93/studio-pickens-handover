import React, { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import WorkGallery from '../components/WorkGallery';
import WorkFilterNav from '../components/WorkFilterNav';
import PageBanner from '../components/common/PageBanner';
import { useWorkData } from '../hooks/useWorkData';

const WorkPage = () => {
  const galleryRef = useRef(null);
  const workGalleryRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL MEDIA');
  const { workData, loading, error, workPageProjects, homeProjects } = useWorkData();
  
  // Combine all projects for filtering
  const allProjects = [...homeProjects, ...workPageProjects];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'ALL MEDIA' 
    ? workPageProjects  // Show only work page items when no filter is selected
    : allProjects.filter(project => {
        return project.category === activeFilter || 
               (activeFilter === 'MUSIC VIDEO' && project.category === 'MUSIC VIDEO') ||
               (activeFilter === 'LIVE PERFORMANCE' && project.category === 'LIVE');
      });

  // Map project categories to filter categories
  const categoryToFilterMap = {
    'FILM & TV': 'FILM & TV',
    'THEATRE': 'THEATRE',
    'CONCERT': 'CONCERT',
    'EDITORIAL': 'EDITORIAL',
    'LIVE': 'LIVE PERFORMANCE'
  };


  // Check for filter parameter in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
      setActiveFilter(filterParam);
    }
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleCategoryClick = (category) => {
    const filterCategory = categoryToFilterMap[category] || category;
    setActiveFilter(filterCategory);
  };

  return (
    <Layout 
      title="Studio Pickens - Our Work"
      description="Explore Studio Pickens portfolio of creative work across film, television, theatre, concerts, and editorial projects. Premium creative solutions with innovative storytelling."
    >
      {/* Work Page Banner */}
      {loading ? (
        <div className="bg-studio-bg flex items-center justify-center" style={{ height: 'clamp(500px, 60vw, 900px)' }}>
          <div className="text-studio-blue">Loading...</div>
        </div>
      ) : (
        <PageBanner 
          backgroundImage={workData.banner.desktopImage}
          mobileBackgroundImage={workData.banner.mobileImage}
          altText="Work banner background"
          objectFit="cover"
          height="clamp(500px, 60vw, 900px)"
          transform={workData.banner.transform}
        >
          {/* Center Content */}
          <div className="flex items-center justify-center h-full w-full">
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="md:bg-transparent bg-studio-bg md:p-0 p-6 md:w-auto w-[400px] mx-auto">
                <h1 className="font-proxima-wide font-bold text-studio-blue uppercase mb-6 text-center md:text-[64px] text-[40px]" style={{ lineHeight: '1.1' }}>
                  {workData.banner.title}
                </h1>
                <p className="font-proxima text-studio-blue max-w-lg text-center mx-auto text-[15px] md:text-[16px]" style={{ lineHeight: '1.4' }}>
                  {workData.banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        </PageBanner>
      )}

      {/* Work Filter Navigation */}
      <WorkFilterNav 
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />

      {/* Work Gallery - Original (Hidden) */}
      {/* <div ref={galleryRef}>
        <WorkGallery filter={activeFilter} onCategoryClick={handleCategoryClick} />
      </div> */}

      {/* Work Gallery - Home Page Version */}
      <div ref={galleryRef}>
        <WorkGallery 
          ref={workGalleryRef}
          onCategoryClick={handleCategoryClick} 
          projects={filteredProjects} 
        />
      </div>
    </Layout>
  );
};

export default WorkPage;