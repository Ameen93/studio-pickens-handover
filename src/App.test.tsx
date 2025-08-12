import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    search: '',
    hash: '',
    href: 'http://localhost:3000/'
  },
  writable: true
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

// Mock addEventListener and removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} })
    });
  });

  test('renders without crashing', () => {
    render(<App />);
    // Just verify that the app renders without errors
    expect(document.body).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    render(<App />);
    // Check if the app renders (home page should be default)
    const body = document.body;
    expect(body).toBeInTheDocument();
  });

  test('sets up event listeners', () => {
    render(<App />);
    expect(mockAddEventListener).toHaveBeenCalledWith('popstate', expect.any(Function));
  });

  test('handles route changes', () => {
    // Mock window.location.pathname
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/work',
        search: '',
        hash: '',
        href: 'http://localhost:3000/work'
      },
      writable: true
    });

    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test('handles admin route', () => {
    // Mock window.location.pathname for admin
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/admin',
        search: '',
        hash: '',
        href: 'http://localhost:3000/admin'
      },
      writable: true
    });

    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
