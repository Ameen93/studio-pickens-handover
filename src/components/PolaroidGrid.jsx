import React from 'react';

const PolaroidGrid = () => {
  const polaroids = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/polaroids/polaroid4.JPG`,
      alt: 'Behind the scenes shot 1',
      caption: 'ON SET'
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/polaroids/polaroid5.JPG`,
      alt: 'Behind the scenes shot 2',
      caption: 'CREATIVE PROCESS'
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/polaroids/polaroid6.JPG`,
      alt: 'Behind the scenes shot 3',
      caption: 'COLLABORATION'
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/polaroids/polaroid7.JPG`,
      alt: 'Behind the scenes shot 4',
      caption: 'FINAL RESULT'
    },
    {
      id: 5,
      src: `${process.env.PUBLIC_URL}/images/polaroids/polaroid8.JPG`,
      alt: 'Behind the scenes shot 5',
      caption: 'TEAM WORK'
    },
    {
      id: 6,
      src: `${process.env.PUBLIC_URL}/images/polaroids/polaroid9.JPG`,
      alt: 'Behind the scenes shot 6',
      caption: 'INNOVATION'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-proxima font-bold text-3xl md:text-4xl text-studio-blue tracking-studio uppercase mb-4">
            BEHIND THE SCENES
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {polaroids.map((polaroid, index) => (
            <div
              key={polaroid.id}
              className="bg-white p-4 shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{
                transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 1)}deg)`
              }}
            >
              <div className="aspect-square bg-gray-200 mb-4">
                <img
                  src={polaroid.src}
                  alt={polaroid.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase">
                  {polaroid.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolaroidGrid;