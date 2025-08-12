import React, { useMemo, useImperativeHandle, forwardRef } from 'react';
import { WORK_PROJECTS } from '../constants';
import WorkItem from './common/WorkItem';
import MobileWorkItem from './common/MobileWorkItem';

const WorkGallery = React.memo(forwardRef(({ filter = 'ALL MEDIA', onCategoryClick, projects = WORK_PROJECTS }, ref) => {
  // Memoize filter mapping to avoid recreation on each render
  const filterMap = useMemo(() => ({
    'FILM & TV': 'FILM & TV',
    'THEATRE': 'THEATRE',
    'CONCERT': 'CONCERT',
    'EDITORIAL': 'EDITORIAL',
    'LIVE PERFORMANCE': 'LIVE'
  }), []);

  // Memoize filtered projects calculation
  const rawFilteredProjects = useMemo(() => {
    // First filter out MUSIC VIDEO projects
    const projectsWithoutMusicVideo = projects.filter(project => project.category !== 'MUSIC VIDEO');
    
    return filter === 'ALL MEDIA' 
      ? projectsWithoutMusicVideo 
      : projectsWithoutMusicVideo.filter(project => {
          return project.category === filterMap[filter] || project.category === filter;
        });
  }, [filter, filterMap, projects]);

  // Memoize position calculations to avoid expensive recalculations
  const filteredProjects = useMemo(() => {
    // Enhanced layout pattern with proper centering for center-positioned projects
    const positions = [
      { left: 50, side: 'left' },
      { left: 750, side: 'right' },
      { left: 390, side: 'center' }
    ];
    
    const projectsToPosition = filter === 'ALL MEDIA' ? projects : rawFilteredProjects;
    
    return projectsToPosition.map((project, index) => {
      let assignedSide;
      let positionIndex;
      
      // Keep center items centered
      if (project.side === 'center') {
        assignedSide = 'center';
        positionIndex = 2;
      } else {
        // For non-center items, alternate left/right based on their position in the filtered list
        // Count non-center items before this one
        const nonCenterItemsBefore = projectsToPosition.slice(0, index).filter(p => p.side !== 'center').length;
        assignedSide = nonCenterItemsBefore % 2 === 0 ? 'left' : 'right';
        positionIndex = assignedSide === 'left' ? 0 : 1;
      }
      
      const position = positions[positionIndex];
      const top = index * 425;
      
      return {
        ...project,
        left: position.left,
        top: top,
        side: assignedSide,
        originalSide: project.side // Keep track of original side for reference
      };
    });
  }, [filter, rawFilteredProjects]);

  // Memoize gallery height calculation
  const galleryHeight = useMemo(() => {
    if (filteredProjects.length === 0) {
      return 'clamp(600px, 45vw, 600px)';
    }
    
    // Add sufficient bottom padding: 425px for each item + 400px bottom buffer
    const minHeight = Math.max((filteredProjects.length - 1) * 425 + 400, 400);
    const vwHeight = (filteredProjects.length - 1) * 29.51 + 25; // Increase vw buffer
    const maxHeight = (filteredProjects.length - 1) * 425 + 500; // Increase max buffer
    
    return `clamp(${minHeight}px, ${vwHeight}vw, ${maxHeight}px)`;
  }, [filteredProjects.length]);

  // Utility functions for positioning
  const getCirclePosition = (side) => {
    if (side === 'left') return '-left-12';
    if (side === 'right') return '-right-12';
    if (side === 'center') return '-left-12';
    return '-left-12';
  };

  const getTextRotation = (side) => {
    if (side === 'left') return 'rotate(-25deg)';
    if (side === 'right') return 'rotate(25deg)';
    if (side === 'center') return 'rotate(0deg)';
    return 'rotate(-25deg)';
  };

  const getTextHoverRotation = (side) => {
    if (side === 'left') return 'group-hover:rotate(-35deg)';
    if (side === 'right') return 'group-hover:rotate(35deg)';
    if (side === 'center') return 'group-hover:rotate(0deg)';
    return 'group-hover:rotate(-35deg)';
  };

  const getContentPosition = (side) => {
    if (side === 'left') return 'left-full';
    if (side === 'right') return 'right-full';
    if (side === 'center') return 'left-full';
    return 'left-full';
  };

  // Project content data with custom labels
  const projectContent = {
    1: { 
      title: 'THE BEAR', 
      stylist: 'Ally Vickers', 
      photographer: 'Jamie Lee Curtis', 
      date: 'Hulu',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    2: { 
      title: 'HERE WE ARE', 
      stylist: 'Studio Pickens', 
      photographer: 'Jane Krakowski, Jesse Tyler Ferguson, Martha Plimpton', 
      date: 'Broadway and West End Theatre',
      labels: { stylist: 'HAIR AND MAKEUP DESIGN', photographer: 'FEATURING', date: 'PRESENTED AT' }
    },
    3: { 
      title: 'L\'OFFICIEL', 
      stylist: 'Adir Abergel', 
      photographer: 'Nicole Kidman', 
      date: 'Sept 2024',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'ACTRESS', date: 'ISSUE' }
    },
    4: { 
      title: 'THE FIRST LADY', 
      stylist: 'Jaime Leigh McIntosh', 
      photographer: 'Michelle Pfeiffer, Dakota Fanning', 
      date: 'Showtime',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    5: { 
      title: 'LOEWE', 
      stylist: 'Michelle Ceglia', 
      photographer: 'Dan Levy, Aubrey Plaza', 
      date: 'March 2024',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'ACTOR/ACTRESS', date: 'ISSUE' }
    },
    6: { 
      title: 'THE WHALE', 
      stylist: 'Annemarie Bradley', 
      photographer: 'Brendan Fraser', 
      date: 'A24',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'DISTRIBUTED BY' }
    },
    7: { 
      title: 'NINE PERFECT STRANGERS', 
      stylist: 'Nicki Gooley', 
      photographer: 'Christine Baranski', 
      date: 'Hulu',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    8: { 
      title: 'EDITORIAL', 
      stylist: '', 
      photographer: '', 
      date: '',
      labels: { stylist: '', photographer: '', date: '' }
    },
    9: { 
      title: 'THE LAST SHOWGIRL', 
      stylist: 'Katy McClintock', 
      photographer: 'Jamie Lee Curtis', 
      date: 'Independent',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    10: { 
      title: 'STEREOPHONIC', 
      stylist: 'Studio Pickens', 
      photographer: 'Will Brill, Andrew R. Butler And Eli Gelb', 
      date: 'Broadway and West End Theatre',
      labels: { stylist: 'HAIR & MAKEUP DESIGN', photographer: 'FEATURING', date: 'PRESENTED AT' }
    },
    11: { 
      title: 'HOUSE OF DAVID', 
      stylist: 'Chris Glimsdale', 
      photographer: 'Stephen Lang', 
      date: 'Amazon Prime Video',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    12: { 
      title: 'MUSIC VIDEO', 
      stylist: '', 
      photographer: '', 
      date: '',
      labels: { stylist: '', photographer: '', date: '' }
    },
    13: { 
      title: 'THE KILLER', 
      stylist: 'Shannon Bakeman', 
      photographer: 'Nathalie Emmanuel', 
      date: 'Universal Pictures',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    14: { 
      title: 'ROMEO & JULIET', 
      stylist: 'Studio Pickens', 
      photographer: 'Kit Connor, Rachel Zegler', 
      date: 'Broadway and West End Theatre',
      labels: { stylist: 'HAIR & MAKEUP DESIGN', photographer: 'FEATURING', date: 'PRESENTED AT' }
    },
    15: { 
      title: 'BULLET TRAIN', 
      stylist: 'Janine Rath Thompson', 
      photographer: 'Brian Tyree Henry', 
      date: 'Sony Pictures',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'NETWORK' }
    },
    16: { 
      title: 'TEETH', 
      stylist: 'Studio Pickens', 
      photographer: 'Alyse Alan Louis', 
      date: 'Playwrights Horizons',
      labels: { stylist: 'HAIR & MAKEUP DESIGN', photographer: 'CAST', date: 'PRODUCED BY' }
    }
  };

  // Expose scroll-to-category function to parent components
  useImperativeHandle(ref, () => ({
    scrollToCategory: (category) => {
      // Find the first project of the specified category
      const categoryProject = filteredProjects.find(project => project.category === category);
      if (categoryProject) {
        const element = document.getElementById(`work-item-${categoryProject.id}`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }
  }), [filteredProjects]);

  return (
    <section className="bg-studio-bg pt-2 pb-2 relative w-full overflow-visible">
      {/* Desktop Layout */}
      <div className="hidden md:block max-w-[1440px] mx-auto">
        <div 
          className="relative w-full"
          style={{ height: galleryHeight }}
        >
          {filteredProjects.map((project) => (
            <div key={project.id} id={`work-item-${project.id}`}>
              <WorkItem
                project={project}
                content={project.content || projectContent[project.id]}
                getCirclePosition={getCirclePosition}
                getTextRotation={getTextRotation}
                getTextHoverRotation={getTextHoverRotation}
                getContentPosition={getContentPosition}
                onCategoryClick={onCategoryClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 pb-0">
        {filteredProjects.map((project) => (
          <div key={project.id} id={`work-item-${project.id}`}>
            <MobileWorkItem 
              project={project}
              content={project.content || projectContent[project.id]}
              onCategoryClick={onCategoryClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}));

WorkGallery.displayName = 'WorkGallery';

export default WorkGallery;