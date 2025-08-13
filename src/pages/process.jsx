import React from 'react';
import Layout from '../components/Layout';
import { ANIMATIONS } from '../constants/animations';
import { useProcessData, useHeroData } from '../hooks';
import PageBanner from '../components/common/PageBanner';

const ProcessPage = () => {
  const { processData, loading, error } = useProcessData();
  const { heroData, loading: heroLoading } = useHeroData();

  return (
    <Layout title="Studio Pickens - Process">
      {/* Process Page Banner */}
      {loading ? (
        <div className="bg-studio-bg flex items-center justify-center -mt-16" style={{ height: 'clamp(700px, 70vw, 1200px)' }}>
          <div className="text-studio-blue">Loading...</div>
        </div>
      ) : (
        <PageBanner 
          backgroundImage={processData.banner.desktopImage}
          mobileBackgroundImage={processData.banner.mobileImage}
          altText="Process banner background"
          objectFit="contain"
          height="clamp(700px, 70vw, 1200px)"
          className="-mt-16 -mb-24 lg:-mb-32"
          transform={processData.banner.transform}
        >
          {/* Rotating Dashed Circle */}
          <div className="absolute w-full flex justify-center z-5 top-[42%] lg:top-1/2 -translate-y-1/2">
            {/* Mobile Circle */}
            <div 
              className="animate-spin lg:hidden"
              style={{
                width: '342px',
                height: '342px',
                flexShrink: 0,
                borderRadius: '342px',
                border: '1px dashed #08249F',
                animationDuration: '60s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            />
            {/* Desktop Circle (10% larger) */}
            <svg 
              className="animate-spin hidden lg:block"
              style={{
                width: `clamp(420px, 40vw, 700px)`,
                height: `clamp(420px, 40vw, 700px)`,
                animationDuration: '60s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="calc(50% - 2px)"
                fill="none"
                stroke="#0025B8"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
            </svg>
          </div>

          {/* Center Content */}
          <div className="text-center z-30 absolute top-[42%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="font-proxima-wide uppercase text-center" style={{ 
              color: '#08249F',
              fontWeight: 600,
              lineHeight: '100%',
              letterSpacing: '1.44px'
            }}>
              <span className="lg:hidden" style={{ fontSize: '48px' }}>{processData.banner.title}</span>
              <span className="hidden lg:inline" style={{ fontSize: `clamp(64px, 5.5vw, 100px)` }}>{processData.banner.title}</span>
            </h2>
            {processData.banner.subtitle && (
              <p className="font-proxima text-studio-blue mt-4" style={{ fontSize: '18px' }}>
                {processData.banner.subtitle}
              </p>
            )}
          </div>
        </PageBanner>
      )}

      {/* Our Approach Section - Top */}
      <section 
        className="relative flex items-center justify-center bg-nav-blue pt-20 pb-16 md:py-0 min-h-[280px] md:h-[clamp(280px,28vw,320px)]"
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h2 className="font-proxima-wide uppercase text-center mb-4 md:whitespace-nowrap">
              <span 
                className="md:hidden"
                style={{
                  color: '#F8F7F7',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '107%',
                  letterSpacing: '0.84px'
                }}
              >
                Our Approach
              </span>
              <span className="hidden md:inline text-atelier-heading-mobile md:text-h3 text-studio-bg">
                Our Approach
              </span>
            </h2>
            
            <div className="mb-6 max-w-3xl text-center">
              {/* Desktop: single paragraph */}
              <p className="hidden md:block text-body font-proxima text-studio-bg">
                Each piece begins with a custom, hand-stitched foundation, contoured to the client's head. Every strand is knotted by hand, following natural growth patterns – cowlicks, baby hairs, and all. Hair is drawn to length, texturized without chemicals, and colored in-house when needed. The cuticle stays intact for unmatched realism and longevity.
              </p>
              {/* Mobile: two paragraphs */}
              <div className="md:hidden">
                <p className="text-atelier-body-mobile font-proxima text-studio-bg mb-3">
                  Each piece begins with a custom, hand-stitched foundation, contoured to the client's head.
                </p>
                <p className="text-atelier-body-mobile font-proxima text-studio-bg">
                  Every strand is knotted by hand, following natural growth patterns – cowlicks, baby hairs, and all. Hair is drawn to length, texturized without chemicals, and colored in-house when needed. The cuticle stays intact for unmatched realism and longevity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Gallery Section */}
      <section className="pt-16 pb-10 px-4 md:px-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-16">
            <div className="text-studio-blue">Loading process steps...</div>
          </div>
        ) : (
          processData.processSteps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col ${
                  step.alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center mb-16 lg:mb-8 gap-4`}
              >
                <div className={`flex justify-center ${step.alignment === 'right' ? 'lg:justify-center' : 'lg:justify-end lg:pr-16'} w-full lg:w-[55%] lg:order-1 order-2`}>
                  <div 
                    className="relative overflow-hidden rounded-full flex-shrink-0"
                    style={{
                      width: '357px',
                      height: '357px'
                    }}
                  >
                    <img
                      src={step.image.startsWith('/') ? step.image : `${process.env.PUBLIC_URL}${step.image}`}
                      alt={step.alt}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out lg:hidden"
                      style={{ 
                        objectPosition: step.transform?.objectPosition || 'center center',
                        transform: step.transform ? `scale(${step.transform.scale || 1}) translateX(${step.transform.translateX || 0}px) translateY(${step.transform.translateY || 0}px)` : undefined
                      }}
                    />
                  </div>
                  <div 
                    className="relative overflow-hidden rounded-full flex-shrink-0 hidden lg:block"
                    style={{
                      width: '980.17px',
                      height: '980.17px'
                    }}
                  >
                    <img
                      src={step.image.startsWith('/') ? step.image : `${process.env.PUBLIC_URL}${step.image}`}
                      alt={step.alt}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out"
                      style={{ 
                        objectPosition: step.transform?.objectPosition || 'center center',
                        transform: step.transform ? `scale(${step.transform.scale || 1}) translateX(${step.transform.translateX || 0}px) translateY(${step.transform.translateY || 0}px)` : undefined
                      }}
                    />
                  </div>
                </div>
                <div className={`w-full ${step.id === 5 ? 'lg:w-[30%] lg:max-w-[440px]' : step.id === 3 ? 'lg:w-[34%] lg:max-w-[480px]' : 'lg:w-[45%] lg:max-w-[520px]'} ${step.alignment === 'right' ? 'lg:pl-6' : 'lg:pr-6'} lg:order-2 order-1 lg:text-left text-center px-4 lg:px-0`}>
                  <h2 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4 text-[23px] lg:text-[36px]">
                    <span className="lg:hidden">
                      {step.id === 1 ? (
                        <>90% science.<br />10% wigmaking.<br />100% precision.</>
                      ) : (
                        step.title.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < step.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))
                      )}
                    </span>
                    <span className="hidden lg:inline">
                      {step.id === 1 ? (
                        <>90% science.<br />10% wigmaking.<br />100% precision.</>
                      ) : (
                        step.title.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < step.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))
                      )}
                    </span>
                  </h2>
                  <p className={`font-proxima text-studio-blue leading-relaxed ${step.id === 1 ? 'lg:w-[70%]' : step.id === 4 ? 'lg:w-[65%]' : ''}`} style={{ fontSize: '16px' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))
        )}
      </section>

      {/* Thoughtfully Sourced Section - Before Polaroid Carousel */}
      <section 
        className="relative flex items-center justify-center bg-nav-blue pt-20 pb-16 md:py-0 min-h-[280px] md:h-[clamp(280px,28vw,320px)]"
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h2 className="font-proxima-wide uppercase text-center mb-4 md:whitespace-nowrap">
              <span 
                className="md:hidden"
                style={{
                  color: '#F8F7F7',
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: '107%',
                  letterSpacing: '0.84px'
                }}
              >
                Thoughtfully Sourced
              </span>
              <span className="hidden md:inline text-atelier-heading-mobile md:text-h3 text-studio-bg">
                Thoughtfully Sourced
              </span>
            </h2>
            
            <div className="mb-6 max-w-3xl text-center">
              {/* Desktop: single paragraph */}
              <p className="hidden md:block text-body font-proxima text-studio-bg">
                We source hair directly from its country of origin - based on the client's desired texture and tone. Each bundle is hand-selected for quality and character. Nothing is off-the-shelf. Every strand is chosen with purpose, built with precision, and finished to perfection.
              </p>
              {/* Mobile: two paragraphs */}
              <div className="md:hidden">
                <p className="text-atelier-body-mobile font-proxima text-studio-bg mb-3">
                  We source hair directly from its country of origin - based on the client's desired texture and tone.
                </p>
                <p className="text-atelier-body-mobile font-proxima text-studio-bg">
                  Each bundle is hand-selected for quality and character. Nothing is off-the-shelf. Every strand is chosen with purpose, built with precision, and finished to perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Polaroid Carousel Section */}
      <section className="py-16 bg-studio-bg overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll space-x-8 hover:pause-animation">
            {/* First set of polaroids */}
            <div className="flex space-x-8 flex-shrink-0">
              {[
                'process-polaroid1.png', 'process-polaroid2.png', 'process-polaroid3.png', 'process-polaroid4.png',
                'process-polaroid5.png', 'process-polaroid6.png', 'process-polaroid7.png', 'process-polaroid8.png'
              ].map((filename, index) => {
                return (
                  <div key={`polaroid-${index}`} className="flex-shrink-0 w-48 flex justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/process/polaroids/${filename}`}
                      alt={`Process Polaroid ${index + 1}`}
                      className="h-64 w-auto object-contain"
                    />
                  </div>
                );
              })}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-8 flex-shrink-0">
              {[
                'process-polaroid1.png', 'process-polaroid2.png', 'process-polaroid3.png', 'process-polaroid4.png',
                'process-polaroid5.png', 'process-polaroid6.png', 'process-polaroid7.png', 'process-polaroid8.png'
              ].map((filename, index) => {
                return (
                  <div key={`polaroid-duplicate-${index}`} className="flex-shrink-0 w-48 flex justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/process/polaroids/${filename}`}
                      alt={`Process Polaroid ${index + 1}`}
                      className="h-64 w-auto object-contain"
                    />
                  </div>
                );
              })}
            </div>
            {/* Third set for seamless loop */}
            <div className="flex space-x-8 flex-shrink-0">
              {[
                'process-polaroid1.png', 'process-polaroid2.png', 'process-polaroid3.png', 'process-polaroid4.png',
                'process-polaroid5.png', 'process-polaroid6.png', 'process-polaroid7.png', 'process-polaroid8.png'
              ].map((filename, index) => {
                return (
                  <div key={`polaroid-triple-${index}`} className="flex-shrink-0 w-48 flex justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/process/polaroids/${filename}`}
                      alt={`Process Polaroid ${index + 1}`}
                      className="h-64 w-auto object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style jsx>{`
          ${ANIMATIONS.keyframes.scroll}
          
          .animate-scroll {
            animation: scroll 21s linear infinite;
          }
          
          @media (max-width: 768px) {
            .animate-scroll {
              animation: scroll 5.25s linear infinite;
            }
          }
          
          .hover\\:pause-animation:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Team Section - Hidden for now, will be added back later */}
      {false && (
      <section className="py-16 px-4 max-w-6xl mx-auto relative" style={{ minHeight: '800px' }}>
        {/* Decorative Circles - fixed position */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[300px] lg:top-[340px]">
            {/* Small circle */}
            <div className="absolute rounded-full lg:hidden" style={{ 
              width: '207px',
              height: '207px',
              flexShrink: 0,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#08249F',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            <div className="hidden lg:block absolute rounded-full" style={{ 
              width: `clamp(236px, ${236 * 100 / 1920}vw, ${236 * 1.5}px)`, 
              height: `clamp(236px, ${236 * 100 / 1920}vw, ${236 * 1.5}px)`,
              borderWidth: '1.5px',
              borderStyle: 'solid',
              borderColor: '#08249F',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            
            {/* Medium circle */}
            <div className="absolute rounded-full lg:hidden" style={{ 
              width: '264px',
              height: '264px',
              flexShrink: 0,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#08249F',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            <div className="hidden lg:block absolute rounded-full" style={{ 
              width: `clamp(306.92px, ${306.92 * 100 / 1920}vw, ${306.92 * 1.5}px)`, 
              height: `clamp(306.92px, ${306.92 * 100 / 1920}vw, ${306.92 * 1.5}px)`,
              borderWidth: '1.5px',
              borderStyle: 'solid',
              borderColor: '#08249F',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            
            {/* Large circle */}
            <div className="absolute rounded-full lg:hidden" style={{ 
              width: '326px',
              height: '326px',
              flexShrink: 0,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#08249F',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            <div className="hidden lg:block absolute rounded-full" style={{ 
              width: `clamp(377px, ${377 * 100 / 1920}vw, ${377 * 1.5}px)`, 
              height: `clamp(377px, ${377 * 100 / 1920}vw, ${377 * 1.5}px)`,
              borderWidth: '1.5px',
              borderStyle: 'solid',
              borderColor: '#08249F',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-0">
          {/* Title */}
          <h1 className="font-proxima-wide font-bold uppercase text-center lg:text-left mb-12 relative top-6">
            <span 
              className="lg:hidden"
              style={{
                color: '#08249F',
                fontSize: '32px',
                fontWeight: 700,
                lineHeight: '110%',
                letterSpacing: '0.96px'
              }}
            >
              meet our inner circle
            </span>
            <span className="hidden lg:inline text-studio-blue text-[64px]" style={{ lineHeight: '1.1' }}>
              meet our<br />inner circle
            </span>
          </h1>
          
          {/* Images and Subheading */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mt-56 lg:mt-0">
            {/* Left Inner Circle Image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div style={{ maxWidth: '675px', width: '100%' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/process/inner-circle1.jpg`}
                  alt="Inner circle team member 1"
                  className="w-full object-cover"
                />
                <div className="bg-studio-blue px-6 pb-6 pt-8 text-left" style={{ height: '160px' }}>
                  <h3 className="text-studio-orange font-lovtony -mb-4 -mt-4" style={{ fontSize: '108px', lineHeight: '0.7' }}>katie gell</h3>
                  <h4 className="text-white font-proxima-semibold font-semibold text-xs mb-1 mt-2">East Coast Operations</h4>
                  <p className="text-white font-proxima text-xs mt-2">Wigmaker + Designer + Makeup Artist</p>
                </div>
              </div>
            </div>

            {/* Center Subheading */}
            <div className="lg:w-1/4 text-center lg:relative lg:static absolute lg:top-auto lg:left-auto top-[220px] left-1/2 lg:transform-none -translate-x-1/2 -translate-y-1/2 lg:z-auto z-30" style={{ paddingTop: '30px' }}>
              <p className="font-proxima text-center uppercase">
                <span 
                  className="lg:hidden"
                  style={{
                    color: '#08249F',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '110%'
                  }}
                >
                  The trusted hands behind every strand.
                </span>
                <span className="hidden lg:inline text-studio-blue" style={{ fontWeight: 600, fontSize: '24px', lineHeight: '125%', letterSpacing: '4%' }}>
                  The trusted hands behind every strand.
                </span>
              </p>
            </div>

            {/* Right Inner Circle Image */}
            <div className="lg:w-1/2">
              <div style={{ maxWidth: '675px', width: '100%' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/process/inner-circle2.jpg`}
                  alt="Inner circle team member 2"
                  className="w-full object-cover"
                />
                <div className="bg-studio-blue px-6 pb-6 pt-8 text-left" style={{ height: '160px' }}>
                  <h3 className="text-studio-orange font-lovtony -mb-4 -mt-4" style={{ fontSize: '108px', lineHeight: '0.7' }}>mandy lyons</h3>
                  <h4 className="text-white font-proxima-semibold font-semibold text-xs mb-1 mt-2">West Coast Operations</h4>
                  <p className="text-white font-proxima text-xs mt-2">Wigmaker + Hairstylist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </Layout>
  );
};

export default ProcessPage;