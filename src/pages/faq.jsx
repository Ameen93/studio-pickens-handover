import React from 'react';
import Layout from '../components/Layout';
import FAQSection from '../components/FAQSection';
import PageBanner from '../components/common/PageBanner';
import { TYPOGRAPHY_CLASSES } from '../constants/typography';

const FAQPage = () => {

  return (
    <Layout title="Studio Pickens - Frequently Asked Questions">
      {/* FAQ Page Banner */}
      <PageBanner 
        backgroundImage="faq/wig-heads-studio-banner.jpg"
        altText="Studio Pickens wig heads and hair samples - FAQ banner"
        height="705px"
        objectPosition="50% 15%"
        transform={{
          scale: 1.2,
          translateX: 0,
          translateY: 0,
          flip: false
        }}
      >
        {/* Centered FAQ Title */}
        <div className="text-center z-20" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 className="font-proxima-wide font-bold text-studio-blue uppercase" style={{ fontSize: 'clamp(32px, 8vw, 100px)' }}>
            FAQ
          </h1>
        </div>
      </PageBanner>

      {/* FAQ Section */}
      <FAQSection />
    </Layout>
  );
};

export default FAQPage;