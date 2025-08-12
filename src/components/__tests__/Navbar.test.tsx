import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock the navigate function
const mockNavigate = jest.fn();

// Mock the NavLink component
jest.mock('../common/NavLink', () => {
  return function MockNavLink({ to, children, ...props }: any) {
    return (
      <a 
        href={to} 
        onClick={(e) => {
          e.preventDefault();
          mockNavigate(to);
        }}
        {...props}
      >
        {children}
      </a>
    );
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('WORK')).toBeInTheDocument();
    expect(screen.getByText('PROCESS')).toBeInTheDocument();
    expect(screen.getByText('STORY')).toBeInTheDocument();
    expect(screen.getByText('LOCATIONS')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  test('shows/hides STUDIO PICKENS title on scroll', () => {
    render(<Navbar />);
    
    // Initially, the title should not be visible (scrolled = false)
    const title = screen.queryByText('STUDIO PICKENS');
    expect(title).not.toBeInTheDocument();
    
    // Simulate scroll event
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    // After scroll, title should be visible
    expect(screen.getByText('STUDIO PICKENS')).toBeInTheDocument();
  });

  test('has correct navigation structure', () => {
    render(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    
    // Check for proper flex layout classes
    expect(navbar).toHaveClass('flex', 'items-center', 'justify-between');
  });

  test('navigation links have correct href attributes', () => {
    render(<Navbar />);
    
    const workLink = screen.getByText('WORK').closest('a');
    const processLink = screen.getByText('PROCESS').closest('a');
    const storyLink = screen.getByText('STORY').closest('a');
    
    expect(workLink).toHaveAttribute('href', '/work');
    expect(processLink).toHaveAttribute('href', '/process');
    expect(storyLink).toHaveAttribute('href', '/story');
  });

  test('handles navigation clicks', () => {
    render(<Navbar />);
    
    const workLink = screen.getByText('WORK');
    fireEvent.click(workLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/work');
  });

  test('responsive design classes are applied', () => {
    render(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('md:flex-row');
  });
});