import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const StoryPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout title="Studio Pickens - Story">
      {/* Story Section */}
      <section className="bg-studio-bg py-8 pb-32 w-full overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Match navbar's exact flexbox structure */}
          <div className="flex items-center justify-center">
            {/* Left spacer - approximate navbar left section width */}
            <div style={{ width: '160px' }}></div>
            
            {/* Center Roots Circle - matches navbar title positioning */}
            <div className="flex justify-center mx-6">
              <div className="relative flex items-center justify-center">
                {/* Blue Outline Circle */}
                <div
                  className="rounded-full border border-studio-blue flex items-center justify-center"
                  style={{
                    width: 'clamp(299px, 70vw, 513px)',
                    height: 'clamp(299px, 70vw, 513px)',
                  }}
                >
                  {/* Roots Title */}
                  <h1
                    className="font-proxima-wide font-bold text-studio-blue uppercase text-center"
                    style={{ fontSize: 'clamp(48px, 8vw, 64px)' }}
                  >
                    Roots
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Right spacer - approximate navbar right section width */}
            <div style={{ width: '180px' }}></div>
          </div>

          {/* First Major Movie Set Circle */}
          <div className="flex justify-center w-full" style={{ marginTop: '-80px' }}>
            <style jsx>{`
              @media (min-width: 1024px) {
                .circle2-container {
                  margin-top: -60px !important;
                }
              }
              @media (max-width: 1023px) {
                .circle2-container {
                  margin-top: 50px !important;
                }
              }
            `}</style>
            </div>
          <div className="circle2-container w-full flex justify-center">
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  className="hidden md:block"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at 9:15 - Desktop Only */}
              <div 
                className="absolute hidden md:block"
                style={{
                  top: '35%',
                  left: '-3%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid1.png`}
                    alt="Story Polaroid 1"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 3:15 - Desktop Only */}
              <div 
                className="absolute hidden md:block"
                style={{
                  top: '60%',
                  right: '-3%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid2.png`}
                    alt="Story Polaroid 2"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 6 o'clock - Bottom - Mobile Only */}
              <div 
                className="absolute md:hidden"
                style={{
                  bottom: '5%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid2.png`}
                    alt="Story Polaroid 2"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Process 2017 text at 1:20 - Mobile Position */}
              <div 
                className="absolute md:hidden"
                style={{
                  top: '15%',
                  right: '30%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>always in</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>the wings</span>
                </div>
              </div>
              
              {/* Process 2017 text at 1:20 - Desktop Position */}
              <div 
                className="absolute hidden md:block"
                style={{
                  top: '20%',
                  right: '6%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', fontWeight: '200' }}>always in the wings</span>
              </div>
              
              {/* Word of mouth spreads text at 7:20 */}
              <div 
                className="absolute text-center hidden md:block"
                style={{
                  bottom: '18%',
                  left: '2%',
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>first obsessions</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>never leave</span>
                </div>
              </div>
              
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-2 md:px-6 w-[95vw] md:w-[65vw] md:max-w-xl">
                  {/* Mobile: Updated to match desktop title */}
                  <h5 className="md:hidden font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                    The Fascination Stage
                  </h5>
                  {/* Desktop: New title */}
                  <h5 className="hidden md:block font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                    The Fascination Stage
                  </h5>
                  {/* Mobile: Updated to match desktop description */}
                  <p className="md:hidden font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Robert has always been captivated by illusion, architecture, and theatre. His early days were filled with a fascination by how things were made and how they could be made better. This curiosity laid the foundation for a mastery of his craft.
                  </p>
                  {/* Desktop: New description */}
                  <p className="hidden md:block font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Robert has always been captivated by illusion, architecture, and theatre. His early days were filled with a fascination by how things were made and how they could be made better. This curiosity laid the foundation for a mastery of his craft.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third Circle - bigger than roots, overlapping first major set */}
          <div className="circle3-container flex justify-center lg:justify-start w-full" style={{ marginTop: 'clamp(-262.5px, -52.5vw, -525px)', marginLeft: 'clamp(0px, 5vw, 120px)' }}>
            <style jsx>{`
              @media (min-width: 1024px) {
                .circle3-container {
                  margin-top: clamp(-262.5px, -52.5vw, -525px) !important;
                  margin-left: clamp(0px, 5vw, 120px) !important;
                }
              }
              @media (max-width: 1023px) {
                .circle3-container {
                  margin-top: -50px !important;
                  margin-left: 0px !important;
                }
              }
            `}</style>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              />
              
              {/* first obsessions never leave text at 8 o'clock - Mobile Only */}
              <div 
                className="absolute md:hidden text-center"
                style={{
                  bottom: '30%',
                  left: '15%',
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>first obsessions</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>never leave</span>
                </div>
              </div>
              
              {/* Polaroid at 6:10 - Desktop Only */}
              <div 
                className="absolute hidden md:block"
                style={{
                  bottom: '5%',
                  left: '45%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 20
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid3.png`}
                    alt="Story Polaroid 3"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Circle - Desktop version (unchanged) */}
          <div className="circle4-container flex justify-center lg:justify-center w-full hidden md:block" style={{ marginTop: 'clamp(-240px, -40vw, -400px)', marginLeft: 'clamp(100px, 10vw, 200px)' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              >
                {/* Circle Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg w-full h-full">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                        The Art of<br />Figuring It Out
                      </h3>
                      <p className="font-proxima text-studio-blue text-center" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                        Robert learned the craft the old-fashioned way: from out-of-print manuals and archival literature. His technique sharpened over time and his skills were later refined alongside some of the industry's most admired artists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* First milestone order text at 5:15 */}
              <div 
                className="absolute whitespace-nowrap"
                style={{
                  bottom: '15%',
                  left: '70%',
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>muscle memory</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>led the way</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Circle - Mobile version (matching circle 2) */}
          <div className="circle4-container flex justify-center w-full md:hidden" style={{ marginTop: '-80px' }}>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  className="hidden md:block"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at 6 o'clock - Bottom */}
              <div 
                className="absolute"
                style={{
                  bottom: '5%',
                  left: '45%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid3.png`}
                    alt="Story Polaroid 3"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6" style={{ width: 'clamp(340px, 70vw, 100%)' }}>
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                    The Art of<br />Figuring It Out
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Robert learned the craft the old-fashioned way: from out-of-print manuals and archival literature. His technique sharpened over time and his skills were later refined alongside some of the industry's most admired artists.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Circle - Mobile only, between circle 4 and 5, offset left, matching circle 3 */}
          <div className="new-circle-container flex justify-start w-full md:hidden" style={{ marginTop: '-80px', marginLeft: '-20px' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              />
              
              {/* muscle memory led the way text at 3 o'clock - Mobile Only */}
              <div 
                className="absolute text-center"
                style={{
                  top: '50%',
                  right: '3%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>muscle memory</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>led the way</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fifth Circle - same as circle 2, centered, overlapping bottom 25% of circle 4 */}
          <div className="circle5-container flex justify-center w-full" style={{ marginTop: 'clamp(-205px, -33vw, -330px)' }}>
            <style jsx>{`
              @media (min-width: 1024px) {
                .circle5-container {
                  margin-top: clamp(-205px, -33vw, -330px) !important;
                }
              }
              @media (max-width: 1023px) {
                .circle5-container {
                  margin-top: -60px !important;
                }
              }
            `}</style>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  className="hidden md:block"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at 9:15 - Desktop Only */}
              <div 
                className="absolute hidden md:block"
                style={{
                  top: '50%',
                  left: '-3%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid4.png`}
                    alt="Story Polaroid 4"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 3:15 - Desktop Only */}
              <div 
                className="absolute hidden md:block"
                style={{
                  top: '65%',
                  right: '3%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid5.png`}
                    alt="Story Polaroid 5"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 6 o'clock - Desktop */}
              <div 
                className="absolute hidden md:block"
                style={{
                  bottom: '-5%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid7.png`}
                    alt="Story Polaroid 7"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 6 o'clock - Mobile Only */}
              <div 
                className="absolute md:hidden"
                style={{
                  bottom: '-10%',
                  left: '55%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid4.png`}
                    alt="Story Polaroid 4"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg">
                  <h3 className="hidden md:block font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                    The First Studio:<br />Beverly Hills
                  </h3>
                  <h5 className="md:hidden font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 24px)', lineHeight: '1.1' }}>
                    The First Studio:<br />Beverly Hills
                  </h5>
                  <p className="md:hidden font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5', maxWidth: '320px' }}>
                    Studio Pickens, then known as Wigmaker Associates, opened its doors in Beverly Hills and quickly caught the attention of stylists, designers, and department heads who valued precision, artistry, and discretion. From day one, the studio became a name whispered in dressing rooms and production trailers.
                  </p>
                  <p className="hidden md:block font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Studio Pickens, then known as Wigmaker Associates, opened its doors in Beverly Hills and quickly caught the attention of stylists, designers, and department heads who valued precision, artistry, and discretion. From day one, the studio became a name whispered in dressing rooms and production trailers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Circle Above Circle 6 - Mobile only, centered and lower */}
          <div className="new-circle-above-6-container flex justify-center w-full md:hidden" style={{ marginTop: '50px' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              />
              
              {/* broadway needed its own text at 7 o'clock - Mobile Only */}
              <div 
                className="absolute text-center"
                style={{
                  bottom: '35%',
                  left: '15%',
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>broadway needed</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>its own</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sixth Circle - Desktop version - HIDDEN ON MOBILE */}
          <div className="circle6-desktop-container flex justify-center w-full hidden md:block" style={{ marginTop: 'clamp(25px, 5vw, 50px)' }}>
            <style jsx>{`
              @media (max-width: 768px) {
                .circle6-desktop-container {
                  display: none !important;
                }
              }
            `}</style>
            <div className="relative flex items-center justify-center" style={{ zIndex: 1 }}>
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'clamp(375px, 75vw, 750px)',
                  height: 'clamp(375px, 75vw, 750px)'
                }}
              >
                {/* Circle Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center px-6 max-w-xl w-full h-full">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                        East Coast by Request
                      </h3>
                      <p className="font-proxima text-studio-blue text-center" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                        As demand grew, so did the footprint. With clients regularly crossing coasts, a second studio opened in New York City, bringing Robert's signature craftsmanship to Broadway's backstage world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Requested by name text at 9:30 o'clock */}
              <div 
                className="absolute text-center"
                style={{
                  top: '35%',
                  left: '21.5%',
                  transform: 'translate(-50%, -50%) rotate(-7.5deg)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>broadway needed</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>its own</span>
                </div>
              </div>

              {/* Polaroid at 9:15 - 2024 */}
              <div 
                className="absolute"
                style={{
                  top: '45%',
                  left: '-5%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid8.png`}
                    alt="Story Polaroid 8"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 3:15 - 2024 */}
              <div 
                className="absolute"
                style={{
                  top: '55%',
                  right: '-5%',
                  transform: 'translate(50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid9.png`}
                    alt="Story Polaroid 9"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>

              
            </div>
          </div>

          {/* Sixth Circle - Mobile version (matching circle 2) - THIS IS THE 8TH CIRCLE FOR MOBILE */}
          <div className="circle6-mobile-container flex justify-center w-full md:hidden" style={{ marginTop: '-50px' }}>
            <div className="relative flex items-center justify-center" style={{ zIndex: 1 }}>
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  className="hidden md:block"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at 6 o'clock - Bottom */}
              <div 
                className="absolute"
                style={{
                  bottom: '5%',
                  left: '43%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid7.png`}
                    alt="Story Polaroid 7"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6" style={{ width: 'clamp(420px, 80vw, 100%)' }}>
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1', maxWidth: '375px' }}>
                    East Coast by<br />Request
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    As demand grew, so did the footprint. With clients regularly crossing coasts, a second studio opened in New York City, bringing Robert's signature craftsmanship to Broadway's backstage world.
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          {/* Seventh Circle - Desktop version (matching circle 3) */}
          <div className="circle7-container flex justify-center lg:justify-start w-full hidden md:block" style={{ marginTop: 'clamp(-180px, -30vw, -300px)', marginLeft: 'clamp(-180px, -15vw, -120px)' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              />
              
              {/* Polaroid at 6:10 - Desktop Only */}
              <div 
                className="absolute"
                style={{
                  bottom: '5%',
                  left: '45%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 20
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid10.png`}
                    alt="Story Polaroid 10"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Text at 3 o'clock */}
              <div 
                className="absolute whitespace-nowrap"
                style={{
                  top: '50%',
                  right: '14%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', fontWeight: '200' }}>seamless under pressure</span>
              </div>
            </div>
          </div>

          {/* Circle 9 - Small full circle offset left (mobile only) */}
          <div className="circle9-mobile-container flex justify-start w-full md:hidden" style={{ marginTop: '-55px' }}>
            <style jsx>{`
              @media (max-width: 768px) {
                .circle9-mobile-container {
                  margin-left: -40px;
                }
              }
            `}</style>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              />
              
            </div>
          </div>

          {/* Eighth Circle - Desktop version (matching circle 4) */}
          <div className="circle8-container flex justify-center lg:justify-center w-full hidden md:block" style={{ marginTop: 'clamp(-250px, -40vw, -350px)', marginLeft: 'clamp(100px, 10vw, 200px)' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              >
                {/* Circle Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg w-full h-full">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                        Broadway Calls,<br />Again
                      </h3>
                      <p className="font-proxima text-studio-blue text-center" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                        As the clientele moved from screen to stage, their hair teams followed. Studio Pickens NYC expanded to meet the moment — crafting performance-ready wigs built for quick changes, strong lighting, and eight-show weeks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Circle 10 - Large dashed circle with Broadway Calls Again content (mobile only) */}
          <div className="circle10-mobile-container flex justify-center w-full md:hidden" style={{ marginTop: '-60px' }}>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at 6 o'clock - Bottom */}
              <div 
                className="absolute"
                style={{
                  bottom: '-2%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid10.png`}
                    alt="Story Polaroid 10"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Seamless under press text - Mobile Only */}
              <div 
                className="absolute text-center"
                style={{
                  top: '16%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>seamless under</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>press</span>
                </div>
              </div>
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6" style={{ maxWidth: '400px' }}>
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                    Broadway Calls,<br />Again
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    As the clientele moved from screen to stage, their hair teams followed. Studio Pickens NYC expanded to meet the moment — crafting performance-ready wigs built for quick changes, strong lighting, and eight-show weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ninth Circle - Desktop version (matching rotating circles) */}
          <div className="circle9-new-container w-full hidden md:block" style={{ marginTop: 'clamp(-100px, -15vw, -150px)', display: 'flex', justifyContent: 'center', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
            <style jsx>{`
              @media (max-width: 768px) {
                .circle9-new-container {
                  display: none !important;
                }
              }
            `}</style>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
              
              {/* Full feature text above left polaroid */}
              <div 
                className="absolute"
                style={{
                  top: '20%',
                  left: '15%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', fontWeight: '200' }}>full feature</span>
              </div>
              
              {/* Polaroid at 9:15 - Desktop Only */}
              <div 
                className="absolute"
                style={{
                  top: '45%',
                  left: '-3%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <a 
                    href="https://www.allure.com/story/ana-de-armas-marilyn-monroe-blonde-transformation?fbclid=PAZXh0bgNhZW0CMTEAAacQMyTFpVUk_FiqRdYa9Kfq1VVVxx-surm1lHgFmJo5oYccYXsOodFM937HDw_aem_4ocuWdFcsaSXpW_QH6870g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity duration-300"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/story/story-polaroid11.png`}
                      alt="Story Polaroid 11"
                      className="h-auto object-contain"
                      style={{ width: 'clamp(160px, 16vw, 320px)' }}
                    />
                  </a>
                </div>
              </div>
              
              {/* Polaroid at 3:15 - Desktop Only */}
              <div 
                className="absolute"
                style={{
                  top: '55%',
                  right: '-3%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="relative">
                  <a 
                    href="https://www.hollywoodreporter.com/lifestyle/style/jamie-lee-curtis-wigmaker-the-bear-hair-1235544655/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity duration-300"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/story/story-polaroid12.png`}
                      alt="Story Polaroid 12"
                      className="h-auto object-contain"
                      style={{ width: 'clamp(160px, 16vw, 320px)' }}
                    />
                  </a>
                </div>
              </div>

              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg w-full h-full">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                      In the Press
                    </h3>
                    <p className="font-proxima text-studio-blue text-center" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                      We let the work speak for itself. A behind-the-scenes feature by Business Insider and collaborations with well-known performers brought Studio Pickens into the wider spotlight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tenth Circle - Desktop version (matching circle 6) */}
          <div className="circle10-container flex justify-center w-full hidden md:block" style={{ marginTop: 'clamp(25px, 5vw, 50px)' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'clamp(375px, 75vw, 750px)',
                  height: 'clamp(375px, 75vw, 750px)'
                }}
              >
                {/* Circle Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg w-full h-full">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(24px, 5vw, 30px)', lineHeight: '1.1' }}>
                        Still Personal with Precision
                      </h3>
                      <p className="font-proxima text-studio-blue text-center" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                        Today, Studio Pickens continues to serve film, television, editorial, and theatre while expanding services for private clients. Whether for the stage, the screen, or everyday expression, every piece is built with care, character, and intention.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text at 9:30 o'clock */}
              <div 
                className="absolute text-center"
                style={{
                  top: '35%',
                  left: '21.5%',
                  transform: 'translate(-50%, -50%) rotate(-7.5deg)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>every detail</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>deliberate</span>
                </div>
              </div>

              {/* Polaroid at 9:15 */}
              <div 
                className="absolute"
                style={{
                  top: '45%',
                  left: '-5%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid14.png`}
                    alt="Story Polaroid 14"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Polaroid at 3:15 */}
              <div 
                className="absolute"
                style={{
                  top: '55%',
                  right: '-5%',
                  transform: 'translate(50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid15.png`}
                    alt="Story Polaroid 15"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>

              {/* Text at 5:30 o'clock */}
              <div 
                className="absolute text-center"
                style={{
                  bottom: '10%',
                  left: '65%',
                  transform: 'translate(-50%, 50%) rotate(-1.64deg)',
                  width: '800px'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>the right piece</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: 'clamp(40px, 8vw, 135px)', lineHeight: '0.5', fontWeight: '200' }}>begins here</span>
                </div>
              </div>
              
              {/* Polaroid positioned to appear above circle - from circle 9 */}
              <div 
                className="absolute"
                style={{
                  top: '-30px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 50
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid13.png`}
                    alt="Story Polaroid 13"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>

              {/* Contact button at 6 o'clock */}
              <div 
                className="absolute"
                style={{
                  bottom: '-48px',
                  left: '50%',
                  transform: 'translate(-50%, 0%)'
                }}
              >
                <button
                  onClick={() => {
                    window.history.pushState({}, '', '/contact');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-studio-blue rounded-full flex items-center justify-center hover:bg-studio-orange transition-colors duration-300 group"
                  style={{ width: 'clamp(80px, 8vw, 96px)', height: 'clamp(80px, 8vw, 96px)' }}
                >
                  <span className="font-proxima-wide text-studio-orange group-hover:text-studio-blue font-bold uppercase transition-colors duration-300" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
                    Contact
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Circle 11 - Dashed circle with In the Press content (mobile only) */}
          <div className="circle11-mobile-container flex justify-center w-full md:hidden" style={{ marginTop: '20px' }}>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at 6 o'clock - Bottom */}
              <div 
                className="absolute"
                style={{
                  bottom: '5%',
                  left: '65%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <a 
                    href="https://www.allure.com/story/ana-de-armas-marilyn-monroe-blonde-transformation?fbclid=PAZXh0bgNhZW0CMTEAAacQMyTFpVUk_FiqRdYa9Kfq1VVVxx-surm1lHgFmJo5oYccYXsOodFM937HDw_aem_4ocuWdFcsaSXpW_QH6870g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity duration-300"
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/story/story-polaroid11.png`}
                      alt="Story Polaroid 11"
                      className="h-auto object-contain"
                      style={{ width: 'clamp(160px, 16vw, 320px)' }}
                    />
                  </a>
                </div>
              </div>
              
              {/* Full feature text - Mobile Only */}
              <div 
                className="absolute text-center"
                style={{
                  bottom: '20%',
                  left: '35%',
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>full feature</span>
              </div>

              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6" style={{ maxWidth: '320px' }}>
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                    In the Press
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    We let the work speak for itself. A behind-the-scenes feature by Business Insider and collaborations with well-known performers brought Studio Pickens into the wider spotlight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Circle 12 - Small full circle offset left (mobile only) */}
          <div className="circle12-mobile-container flex justify-start w-full md:hidden" style={{ marginTop: '-40px', marginLeft: '-40px' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'clamp(324px, 65vw, 648px)',
                  height: 'clamp(324px, 65vw, 648px)'
                }}
              />
            </div>
          </div>





          {/* Circle 13 - Dashed circle with Still Personal Precision content (mobile only) */}
          <div className="circle13-mobile-container flex justify-center w-full md:hidden" style={{ marginTop: '40px' }}>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'clamp(478px, 80vw, 961px)',
                  height: 'clamp(478px, 80vw, 961px)',
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
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  className="md:hidden"
                />
              </svg>
              
              {/* Polaroid at top of circle */}
              <div 
                className="absolute"
                style={{
                  top: '-5%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/story/story-polaroid13.png`}
                    alt="Story Polaroid 13"
                    className="h-auto object-contain"
                    style={{ width: 'clamp(160px, 16vw, 320px)' }}
                  />
                </div>
              </div>
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6">
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(24px, 5vw, 32px)', lineHeight: '1.1' }}>
                    Still Personal<br />with Precision
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(16px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Today, Studio Pickens continues to serve film, television, editorial, and theatre while expanding services for private clients. Whether for the stage, the screen, or everyday expression, every piece is built with care, character, and intention.
                  </p>
                </div>
              </div>
              
              {/* Lovtony text - "the right piece begins here" */}
              <div 
                className="absolute text-center"
                style={{
                  bottom: '20%',
                  left: '45%',
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: '61px', lineHeight: '0.3' }}>the right piece<br />begins here</span>
              </div>
              
              {/* Contact button at 6 o'clock */}
              <div 
                className="absolute"
                style={{
                  bottom: '-35px',
                  left: '50%',
                  transform: 'translate(-50%, 0%)'
                }}
              >
                <button
                  onClick={() => {
                    window.history.pushState({}, '', '/contact');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-studio-blue rounded-full flex items-center justify-center hover:bg-studio-orange transition-colors duration-300 group"
                  style={{ width: 'clamp(80px, 8vw, 96px)', height: 'clamp(80px, 8vw, 96px)' }}
                >
                  <span className="font-proxima-wide text-studio-orange group-hover:text-studio-blue font-bold uppercase transition-colors duration-300" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
                    Contact
                  </span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </section>
    </Layout>
  );
};

export default StoryPage;