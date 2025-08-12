import React from 'react';
import TypeSection from './sections/TypeSection';
import TypeExample from './sections/TypeExample';
import { TYPOGRAPHY_CLASSES, COMMON_COMBINATIONS } from '../constants/typography';

const TypographyGuide = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 bg-studio-bg">
      <div className="space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className={`${COMMON_COMBINATIONS.pageTitle} text-h1 md:text-h1 sm:text-h1-mobile mb-4`}>
            Typography System
          </h1>
          <p className={`${TYPOGRAPHY_CLASSES.bodyText} text-body-lg md:text-body-lg sm:text-body-lg-mobile`}>
            Complete typography scale for Studio Pickens brand identity
          </p>
        </div>

        {/* Headings Section */}
        <TypeSection title="Headings">
          <TypeExample 
            element="h1"
            className="text-h1 md:text-h1 sm:text-h1-mobile font-proxima-wide text-studio-blue uppercase"
            description="text-h1 / text-h1-mobile · Proxima Nova Extra Wide · 600/500 · 80px/40px"
          >
            H1 Heading Sample
          </TypeExample>

          <TypeExample 
            element="h2"
            className="text-h2 md:text-h2 sm:text-h2-mobile font-proxima-wide text-studio-blue uppercase"
            description="text-h2 / text-h2-mobile · Proxima Nova Extra Wide · 600/500 · 64px/32px"
          >
            H2 Heading Sample
          </TypeExample>

          <TypeExample 
            element="h3"
            className="text-h3 md:text-h3 sm:text-h3-mobile font-proxima-wide text-studio-blue uppercase"
            description="text-h3 / text-h3-mobile · Proxima Nova Extra Wide · 600/500 · 48px/24px"
          >
            H3 Heading Sample
          </TypeExample>
        </TypeSection>

        {/* Subheadings Section */}
        <TypeSection title="Subheadings">
          <TypeExample 
            element="p"
            className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-blue uppercase"
            description="text-sub-lg / text-sub-lg-mobile · Proxima Nova Extra Wide · 500 · 24px/20px"
          >
            Sub Large Sample Text
          </TypeExample>

          <TypeExample 
            element="p"
            className="text-sub md:text-sub sm:text-sub-mobile font-proxima-wide text-studio-blue uppercase"
            description="text-sub / text-sub-mobile · Proxima Nova Extra Wide · 500 · 16px/14px"
          >
            Sub Regular Sample Text
          </TypeExample>
        </TypeSection>

        {/* Body Text Section */}
        <TypeSection title="Body Text">
          <TypeExample 
            element="p"
            className="text-body-lg md:text-body-lg sm:text-body-lg-mobile font-proxima text-studio-blue"
            description="text-body-lg / text-body-lg-mobile · Proxima Nova · 400 · 16px/14px"
          >
            Body Large: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </TypeExample>

          <TypeExample 
            element="p"
            className="text-body md:text-body sm:text-body-mobile font-proxima text-studio-blue"
            description="text-body / text-body-mobile · Proxima Nova · 400 · 14px/12px"
          >
            Body Regular: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </TypeExample>

          <TypeExample 
            element="p"
            className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue"
            description="text-small / text-small-mobile · Proxima Nova · 400 · 12px/10px"
          >
            Small Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
          </TypeExample>
        </TypeSection>

        {/* Buttons & Interactive Elements */}
        <TypeSection title="Buttons & Interactive">
          <TypeExample description="text-button · Proxima Nova · 500 · 13px">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="text-button font-proxima text-white bg-studio-blue px-6 py-3 uppercase">
                Box Button
              </button>
              <button className="text-button font-proxima text-studio-blue border-2 border-studio-blue px-6 py-3 uppercase hover:bg-studio-blue hover:text-white">
                Outline Button
              </button>
            </div>
          </TypeExample>

          <TypeExample 
            element="a"
            className="text-button-link font-proxima text-studio-blue underline decoration-studio-orange decoration-2 underline-offset-4"
            description="text-button-link · Proxima Nova · 500 · 14px"
          >
            Link Button Sample
          </TypeExample>

          <TypeExample description="text-tag · Proxima Nova · 500 · 12px">
            <div className="flex flex-wrap gap-2">
              <span className="text-tag font-proxima text-studio-blue bg-studio-orange/10 px-3 py-1 uppercase">
                Film & TV
              </span>
              <span className="text-tag font-proxima text-studio-blue bg-studio-orange/10 px-3 py-1 uppercase">
                Music
              </span>
              <span className="text-tag font-proxima text-studio-blue bg-studio-orange/10 px-3 py-1 uppercase">
                Theatre
              </span>
            </div>
          </TypeExample>
        </TypeSection>

        {/* Spacing Examples */}
        <TypeSection title="Spacing System (Multiples of 8)">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[2, 4, 6, 8, 10, 12, 16, 20].map((space) => (
              <div key={space} className="text-center">
                <div 
                  className="bg-studio-orange/20 border-2 border-studio-orange mx-auto"
                  style={{ width: `${space * 4}px`, height: `${space * 4}px` }}
                ></div>
                <p className="text-small font-proxima text-studio-blue mt-2">
                  {space} = {space * 4}px
                </p>
              </div>
            ))}
          </div>
        </TypeSection>

        {/* Usage Examples */}
        <TypeSection title="Usage Examples">
          <div className="bg-white p-8 rounded-lg border border-studio-blue/10">
            <h3 className="text-h3 md:text-h3 sm:text-h3-mobile font-proxima-wide text-studio-blue uppercase mb-4">
              Sample Content Block
            </h3>
            <p className="text-sub md:text-sub sm:text-sub-mobile font-proxima-wide text-studio-orange uppercase mb-6">
              Creative Excellence
            </p>
            <p className="text-body-lg md:text-body-lg sm:text-body-lg-mobile font-proxima text-studio-blue mb-6">
              Studio Pickens delivers premium creative solutions for film, television, music, and theatre. Our team brings visionary concepts to life with meticulous attention to detail and innovative storytelling.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="text-button font-proxima text-white bg-studio-blue px-6 py-3 uppercase">
                View Our Work
              </button>
              <a href="#" className="text-button-link font-proxima text-studio-blue underline decoration-studio-orange decoration-2 underline-offset-4">
                Learn More
              </a>
            </div>
          </div>
        </TypeSection>

      </div>
    </div>
  );
};

export default TypographyGuide;