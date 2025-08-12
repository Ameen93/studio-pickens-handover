import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useStoryData } from '../hooks';

const StoryPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const { storyData, loading, error } = useStoryData();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderItem = (item, circleType) => {
    const isDesktop = window.innerWidth >= 768;
    const device = isDesktop ? 'desktop' : 'mobile';
    
    // Check visibility
    if (!item.visibility[device]) {
      return null;
    }

    // Check if item should be hidden via display: none
    if (item.position[device].display === 'none') {
      return null;
    }

    const position = item.position[device];
    const style = {
      position: 'absolute',
      ...position,
      zIndex: item.type === 'polaroid' ? 10 : 20
    };

    // Remove transform from style object since we'll handle it separately
    const { transform, ...positionStyle } = style;

    if (item.type === 'polaroid') {
      return (
        <div 
          key={item.id}
          className={`absolute ${isDesktop ? 'hidden md:block' : 'md:hidden'}`}
          style={{
            ...positionStyle,
            transform: transform
          }}
        >
          <div className="relative">
            <img
              src={`${process.env.PUBLIC_URL}${item.content.image}`}
              alt={item.content.alt}
              className="h-auto object-contain"
              style={{ width: 'clamp(160px, 16vw, 320px)' }}
            />
            {item.content.year && (
              <div className={`absolute ${isDesktop ? 'bottom-10' : 'bottom-3'} left-1/2 transform -translate-x-1/2`}>
                <span className="font-proxima text-studio-blue font-bold" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
                  {item.content.year}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (item.type === 'text') {
      const rotation = item.rotation ? item.rotation[device] : 0;
      const fontSize = item.fontSize ? item.fontSize[device] : 'clamp(40px, 8vw, 135px)';
      const textLines = item.content.text.split('\\n');
      
      return (
        <div 
          key={item.id}
          className={`absolute ${isDesktop ? 'hidden md:block' : 'md:hidden'} ${textLines.length > 1 ? 'text-center' : ''}`}
          style={{
            ...positionStyle,
            transform: `${transform || ''} rotate(${rotation}deg)`.trim()
          }}
        >
          {textLines.length > 1 ? (
            <div className="flex flex-col items-center">
              {textLines.map((line, index) => (
                <span 
                  key={index}
                  className={`${item.content.font} text-studio-blue`} 
                  style={{ fontSize, lineHeight: '0.3' }}
                >
                  {line}
                </span>
              ))}
            </div>
          ) : (
            <span className={`${item.content.font} text-studio-blue`} style={{ fontSize }}>
              {item.content.text}
            </span>
          )}
        </div>
      );
    }

    if (item.type === 'button') {
      return (
        <div 
          key={item.id}
          className="absolute"
          style={{
            ...positionStyle,
            transform: transform
          }}
        >
          <button
            onClick={() => {
              window.history.pushState({}, '', item.content.action);
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-studio-blue rounded-full flex items-center justify-center hover:bg-studio-orange transition-colors duration-300 group"
            style={{ width: 'clamp(80px, 8vw, 96px)', height: 'clamp(80px, 8vw, 96px)' }}
          >
            <span className="font-proxima-wide text-studio-orange group-hover:text-studio-blue font-bold uppercase transition-colors duration-300" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
              {item.content.text}
            </span>
          </button>
        </div>
      );
    }

    return null;
  };

  const renderCircle = (circle) => {
    const isDesktop = window.innerWidth >= 768;
    const device = isDesktop ? 'desktop' : 'mobile';
    const size = circle.size[device];
    const position = circle.position[device];

    const containerStyle = {
      marginTop: position.marginTop,
      marginLeft: position.marginLeft,
      justifyContent: position.justifyContent
    };

    if (circle.type === 'simple') {
      return (
        <div key={circle.id} className="flex w-full" style={containerStyle}>
          <div className="relative flex items-center justify-center">
            <div
              className="rounded-full border border-studio-blue flex items-center justify-center"
              style={{
                width: size.width,
                height: size.height
              }}
            >
              {circle.content.title && (
                <h1 className="font-proxima-wide font-bold text-studio-blue uppercase text-center" style={{ fontSize: 'clamp(48px, 8vw, 64px)' }}>
                  {circle.content.title}
                </h1>
              )}
              {circle.content.description && (
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg">
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    {circle.content.description}
                  </p>
                </div>
              )}
            </div>
            {circle.items.map(item => renderItem(item, circle.type))}
          </div>
        </div>
      );
    }

    if (circle.type === 'dashed_rotating' || circle.type === 'mixed') {
      const showDashed = circle.type === 'dashed_rotating' || (circle.type === 'mixed' && !isDesktop);
      
      return (
        <div key={circle.id} className="flex w-full" style={containerStyle}>
          <div className="relative flex items-center justify-center">
            <div 
              className="rounded-full"
              style={{
                width: size.width,
                height: size.height
              }}
            />
            
            {showDashed && (
              <svg 
                className="absolute inset-0"
                style={{
                  width: size.width,
                  height: size.height,
                  transform: `rotate(${scrollY * 0.1}deg)`,
                  willChange: 'transform'
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth={isDesktop ? "2" : "1"}
                  strokeDasharray={isDesktop ? "10 10" : "5 5"}
                />
              </svg>
            )}

            {!showDashed && (
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center absolute inset-0"
                style={{
                  width: size.width,
                  height: size.height
                }}
              >
                {circle.content.title && (
                  <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg">
                    <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                      {circle.content.title}
                    </h3>
                    {circle.content.description && (
                      <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                        {circle.content.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {showDashed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6" style={{ width: 'clamp(320px, 65vw, 100%)' }}>
                  {circle.content.title && (
                    <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                      {circle.content.title}
                    </h5>
                  )}
                  {circle.content.description && (
                    <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                      {circle.content.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {circle.items.map(item => renderItem(item, circle.type))}
          </div>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <Layout title="Studio Pickens - Story">
        <section className="bg-studio-bg py-8 pb-32 w-full overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 text-center py-16">
            <div className="text-studio-blue">Loading story...</div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Studio Pickens - Story">
        <section className="bg-studio-bg py-8 pb-32 w-full overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4 text-center py-16">
            <div className="text-red-600">Error loading story: {error}</div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Studio Pickens - Story">
      <section className="bg-studio-bg py-8 pb-32 w-full overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Match navbar's exact flexbox structure */}
          <div className="flex items-center justify-center">
            <div style={{ width: '160px' }}></div>
            <div className="flex justify-center mx-6">
              {storyData?.circles?.[0] && renderCircle(storyData.circles[0])}
            </div>
            <div style={{ width: '180px' }}></div>
          </div>

          {/* Render remaining circles */}
          {storyData?.circles?.slice(1).map((circle, index) => (
            <div key={circle.id}>
              {index === 0 && (
                <div className="flex justify-center w-full" style={{ marginTop: '-80px' }}>
                  <style jsx>{`
                    @media (min-width: 1024px) {
                      .circle2-container {
                        margin-top: -80px !important;
                      }
                    }
                    @media (max-width: 1023px) {
                      .circle2-container {
                        margin-top: 50px !important;
                      }
                    }
                  `}</style>
                </div>
              )}
              
              <div className="circle-container w-full flex">
                {renderCircle(circle)}
              </div>

              {/* Add mobile-only empty circles where needed */}
              {(circle.id === 4 || circle.id === 5) && (
                <div className="flex justify-start w-full md:hidden" style={{ marginTop: '-80px', marginLeft: circle.id === 4 ? '-20px' : '0px' }}>
                  <div className="relative flex items-center justify-center" style={{ transform: circle.id === 5 ? 'translateX(80px)' : 'none' }}>
                    <div 
                      className="rounded-full border border-studio-blue"
                      style={{
                        width: 'clamp(324px, 65vw, 648px)',
                        height: 'clamp(324px, 65vw, 648px)'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default StoryPage;