import React from 'react';

const BragBar = () => {
  const logos = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/warnerbros-brag.png`,
      alt: 'Warner Bros'
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/vanityfair-brag.png`,
      alt: 'Vanity Fair'
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/hbo-brag.png`,
      alt: 'HBO'
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/bazaar-brag.png`,
      alt: 'Bazaar'
    },
    {
      id: 5,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/vogue-brag.png`,
      alt: 'Vogue'
    },
    {
      id: 6,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/paramount-brag.png`,
      alt: 'Paramount'
    },
    {
      id: 7,
      src: `${process.env.PUBLIC_URL}/images/work/brag-bar/appletv-brag.png`,
      alt: 'Apple TV'
    }
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section 
      className="bg-studio-bg relative w-full overflow-hidden flex items-center"
      style={{ height: '120px' }}
    >
      <div 
        className="flex absolute top-0 left-0"
        style={{
          width: `${duplicatedLogos.length * 200}px`,
          animation: 'scroll 15s linear infinite',
          animationPlayState: 'running',
          height: '120px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex justify-center items-center"
            style={{ 
              width: '200px',
              height: '120px',
              paddingTop: '30px',
              paddingBottom: '30px'
            }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="object-contain"
              style={{
                maxHeight: '60px',
                maxWidth: '140px'
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${logos.length * 200}px);
          }
        }
      `}</style>
    </section>
  );
};

export default BragBar;