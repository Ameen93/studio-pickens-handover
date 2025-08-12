import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkGallery from '../WorkGallery';

// Mock the work data
const mockWorkData = {
  projects: [
    {
      id: 1,
      title: 'Project 1',
      client: 'Client A',
      category: 'EDITORIAL',
      year: 2023,
      image: '/images/work/project1.jpg',
      alt: 'Project 1 alt text',
      description: 'Project 1 description',
      featured: true,
      order: 1
    },
    {
      id: 2,
      title: 'Project 2',
      client: 'Client B',
      category: 'FILM & TV',
      year: 2023,
      image: '/images/work/project2.jpg',
      alt: 'Project 2 alt text',
      description: 'Project 2 description',
      featured: false,
      order: 2
    }
  ]
};

describe('WorkGallery Component', () => {
  test('renders all work projects', () => {
    render(<WorkGallery workData={mockWorkData} />);
    
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Client A')).toBeInTheDocument();
    expect(screen.getByText('Client B')).toBeInTheDocument();
  });

  test('renders project images with correct attributes', () => {
    render(<WorkGallery workData={mockWorkData} />);
    
    const image1 = screen.getByAltText('Project 1 alt text');
    const image2 = screen.getByAltText('Project 2 alt text');
    
    expect(image1).toHaveAttribute('src', '/images/work/project1.jpg');
    expect(image2).toHaveAttribute('src', '/images/work/project2.jpg');
  });

  test('filters projects by category', () => {
    render(<WorkGallery workData={mockWorkData} />);
    
    // Find and click EDITORIAL filter
    const editorialFilter = screen.getByText('EDITORIAL');
    fireEvent.click(editorialFilter);
    
    // Should show only EDITORIAL projects
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
  });

  test('shows all projects when "ALL" filter is selected', () => {
    render(<WorkGallery workData={mockWorkData} />);
    
    // Click ALL filter
    const allFilter = screen.getByText('ALL');
    fireEvent.click(allFilter);
    
    // Should show all projects
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  test('handles empty work data', () => {
    render(<WorkGallery workData={{ projects: [] }} />);
    
    expect(screen.getByText('No projects available')).toBeInTheDocument();
  });

  test('displays project categories and years', () => {
    render(<WorkGallery workData={mockWorkData} />);
    
    expect(screen.getByText('EDITORIAL')).toBeInTheDocument();
    expect(screen.getByText('FILM & TV')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  test('applies correct grid layout classes', () => {
    render(<WorkGallery workData={mockWorkData} />);
    
    const gallery = screen.getByTestId('work-gallery');
    expect(gallery).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  test('handles project click events', () => {
    const mockOnProjectClick = jest.fn();
    render(<WorkGallery workData={mockWorkData} onProjectClick={mockOnProjectClick} />);
    
    const project1 = screen.getByText('Project 1').closest('div');
    fireEvent.click(project1);
    
    expect(mockOnProjectClick).toHaveBeenCalledWith(mockWorkData.projects[0]);
  });
});