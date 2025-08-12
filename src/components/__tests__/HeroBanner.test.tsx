import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HeroBanner from '../HeroBanner';

// Mock the hooks
jest.mock('../../hooks/useHeroData', () => ({
  __esModule: true,
  default: () => ({
    heroData: {
      title: 'STUDIO PICKENS',
      subtitle: 'Creative Excellence',
      atelierTitle: 'CUSTOM ATELIER WIGS',
      atelierDescription: 'Professional wig services',
      backgroundImages: [
        {
          image: '/images/hero/bg1.jpg',
          alt: 'Background 1',
          transform: { scale: 1, translateX: 0, translateY: 0, flip: false }
        }
      ],
      polaroids: [
        {
          image: '/images/polaroids/p1.jpg',
          alt: 'Polaroid 1',
          rotation: 10,
          position: { top: '10px', left: '10px' }
        }
      ]
    },
    loading: false,
    error: null
  })
}));

describe('HeroBanner Component', () => {
  test('renders hero content correctly', async () => {
    render(<HeroBanner />);
    
    await waitFor(() => {
      expect(screen.getByText('STUDIO PICKENS')).toBeInTheDocument();
      expect(screen.getByText('Creative Excellence')).toBeInTheDocument();
      expect(screen.getByText('CUSTOM ATELIER WIGS')).toBeInTheDocument();
      expect(screen.getByText('Professional wig services')).toBeInTheDocument();
    });
  });

  test('renders background images', async () => {
    render(<HeroBanner />);
    
    await waitFor(() => {
      const backgroundImage = screen.getByAltText('Background 1');
      expect(backgroundImage).toBeInTheDocument();
      expect(backgroundImage).toHaveAttribute('src', '/images/hero/bg1.jpg');
    });
  });

  test('renders polaroids', async () => {
    render(<HeroBanner />);
    
    await waitFor(() => {
      const polaroid = screen.getByAltText('Polaroid 1');
      expect(polaroid).toBeInTheDocument();
      expect(polaroid).toHaveAttribute('src', '/images/polaroids/p1.jpg');
    });
  });

  test('handles loading state', () => {
    // Mock loading state
    jest.resetModules();
    jest.doMock('../../hooks/useHeroData', () => ({
      __esModule: true,
      default: () => ({
        heroData: null,
        loading: true,
        error: null
      })
    }));
    
    const HeroBannerWithMock = require('../HeroBanner').default;
    render(<HeroBannerWithMock />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles error state', () => {
    // Mock error state
    jest.resetModules();
    jest.doMock('../../hooks/useHeroData', () => ({
      __esModule: true,
      default: () => ({
        heroData: null,
        loading: false,
        error: 'Failed to load hero data'
      })
    }));
    
    const HeroBannerWithMock = require('../HeroBanner').default;
    render(<HeroBannerWithMock />);
    
    expect(screen.getByText('Error loading hero data')).toBeInTheDocument();
  });

  test('applies correct styling classes', async () => {
    render(<HeroBanner />);
    
    await waitFor(() => {
      const heroSection = screen.getByText('STUDIO PICKENS').closest('section');
      expect(heroSection).toHaveClass('relative', 'min-h-screen');
    });
  });
});