# Studio Pickens WordPress Theme Architecture
## Complete Technical Blueprint

## Theme Structure Overview

```
studio-pickens/
├── style.css                 # Main theme stylesheet
├── functions.php            # Theme functions and hooks
├── index.php               # Main template fallback
├── front-page.php          # Homepage template
├── header.php              # Site header
├── footer.php              # Site footer
├── 404.php                 # Error page
├── search.php              # Search results
├── screenshot.png          # Theme preview
│
├── template-parts/         # Reusable template components
│   ├── navbar.php          # Navigation with scroll effects
│   ├── hero.php            # Hero section
│   ├── hero-carousel.php   # Mobile carousel
│   ├── work-showcase.php   # Homepage work display
│   ├── polaroid-grid.php   # Polaroid arrangements
│   ├── process-timeline.php # Process visualization
│   ├── story-circles.php   # Story interactive elements
│   ├── location-cards.php  # Location displays
│   ├── faq-accordion.php   # FAQ items
│   ├── contact-form.php    # Contact form
│   └── footer-content.php  # Footer sections
│
├── page-templates/         # Custom page templates
│   ├── page-work.php       # Work gallery page
│   ├── page-process.php    # Process page
│   ├── page-story.php      # Story page
│   ├── page-locations.php  # Locations page
│   ├── page-contact.php    # Contact page
│   └── page-faq.php        # FAQ page
│
├── single-templates/       # Custom post templates
│   ├── single-work_project.php  # Individual work project
│   ├── archive-work_project.php # Work gallery archive
│   └── single-location.php      # Individual location
│
├── assets/                 # Source files
│   ├── css/
│   │   ├── main.css        # Compiled Tailwind
│   │   └── admin.css       # Admin styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript
│   │   ├── animations.js   # Animation logic
│   │   ├── carousel.js     # Carousel functionality
│   │   ├── modal.js        # Modal systems
│   │   └── admin.js        # Admin enhancements
│   └── images/
│       ├── placeholders/   # Default images
│       └── icons/          # SVG icons
│
├── inc/                    # PHP includes
│   ├── custom-post-types.php    # CPT definitions
│   ├── custom-fields.php        # ACF field groups
│   ├── theme-setup.php          # Theme configuration
│   ├── enqueue-scripts.php      # Asset loading
│   ├── ajax-handlers.php        # AJAX endpoints
│   ├── image-handling.php       # Image utilities
│   ├── performance.php          # Optimization
│   ├── security.php             # Security enhancements
│   └── admin-customizations.php # Admin UI changes
│
├── acf-json/               # ACF field definitions
│   ├── group_hero_section.json
│   ├── group_work_project.json
│   ├── group_process_step.json
│   ├── group_story_element.json
│   ├── group_location.json
│   ├── group_faq_item.json
│   └── group_site_options.json
│
├── languages/              # Translation files
│   ├── studio-pickens.pot
│   └── readme.txt
│
├── build/                  # Compiled assets
│   ├── css/
│   └── js/
│
├── src/                    # Source files for build
│   ├── scss/
│   ├── js/
│   └── tailwind/
│
├── migration/              # Migration utilities
│   ├── migrate-data.php
│   ├── image-migration.php
│   └── cleanup-tools.php
│
└── documentation/          # Theme docs
    ├── setup-guide.md
    ├── customization.md
    └── content-management.md
```

---

## Core WordPress Integration

### 1. Custom Post Types Architecture

**Custom Post Types:**
```php
// inc/custom-post-types.php

class StudioPickensPostTypes {
    
    public function __construct() {
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));
    }
    
    public function register_post_types() {
        // Work Projects
        register_post_type('work_project', array(
            'labels' => array(
                'name' => 'Work Projects',
                'singular_name' => 'Work Project',
                'add_new' => 'Add New Project',
                'add_new_item' => 'Add New Work Project',
                'edit_item' => 'Edit Work Project',
                'new_item' => 'New Work Project',
                'view_item' => 'View Work Project',
                'search_items' => 'Search Work Projects',
                'not_found' => 'No work projects found',
                'not_found_in_trash' => 'No work projects found in trash'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'work'),
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes'),
            'menu_icon' => 'dashicons-portfolio',
            'show_in_rest' => true,
            'hierarchical' => false,
            'capability_type' => 'post',
            'map_meta_cap' => true
        ));
        
        // Process Steps
        register_post_type('process_step', array(
            'labels' => array(
                'name' => 'Process Steps',
                'singular_name' => 'Process Step',
                'add_new' => 'Add New Step',
                'edit_item' => 'Edit Process Step'
            ),
            'public' => true,
            'has_archive' => false,
            'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
            'menu_icon' => 'dashicons-list-view',
            'show_in_rest' => true,
            'hierarchical' => true
        ));
        
        // Story Elements
        register_post_type('story_element', array(
            'labels' => array(
                'name' => 'Story Elements',
                'singular_name' => 'Story Element',
                'add_new' => 'Add Story Element'
            ),
            'public' => true,
            'has_archive' => false,
            'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
            'menu_icon' => 'dashicons-clock',
            'show_in_rest' => true
        ));
        
        // Locations
        register_post_type('location', array(
            'labels' => array(
                'name' => 'Locations',
                'singular_name' => 'Location',
                'add_new' => 'Add New Location'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'locations'),
            'supports' => array('title', 'editor', 'thumbnail'),
            'menu_icon' => 'dashicons-location',
            'show_in_rest' => true
        ));
        
        // FAQ Items
        register_post_type('faq_item', array(
            'labels' => array(
                'name' => 'FAQ Items',
                'singular_name' => 'FAQ Item',
                'add_new' => 'Add New FAQ'
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'faq'),
            'supports' => array('title', 'editor', 'page-attributes'),
            'menu_icon' => 'dashicons-editor-help',
            'show_in_rest' => true
        ));
    }
    
    public function register_taxonomies() {
        // Work Categories
        register_taxonomy('work_category', 'work_project', array(
            'labels' => array(
                'name' => 'Work Categories',
                'singular_name' => 'Work Category'
            ),
            'hierarchical' => true,
            'public' => true,
            'show_in_rest' => true,
            'rewrite' => array('slug' => 'work-category')
        ));
        
        // FAQ Categories
        register_taxonomy('faq_category', 'faq_item', array(
            'labels' => array(
                'name' => 'FAQ Categories',
                'singular_name' => 'FAQ Category'
            ),
            'hierarchical' => true,
            'public' => true,
            'show_in_rest' => true
        ));
    }
}

new StudioPickensPostTypes();
```

### 2. Advanced Custom Fields Configuration

**Field Groups Structure:**
```php
// inc/custom-fields.php

class StudioPickensFields {
    
    public function __construct() {
        add_action('acf/init', array($this, 'register_field_groups'));
        add_action('acf/init', array($this, 'register_options_pages'));
    }
    
    public function register_options_pages() {
        if (function_exists('acf_add_options_page')) {
            acf_add_options_page(array(
                'page_title' => 'Studio Pickens Settings',
                'menu_title' => 'Theme Options',
                'menu_slug' => 'studio-pickens-settings',
                'capability' => 'edit_posts',
                'icon_url' => 'dashicons-admin-customizer'
            ));
            
            acf_add_options_sub_page(array(
                'page_title' => 'Global Banners',
                'menu_title' => 'Banners',
                'parent_slug' => 'studio-pickens-settings'
            ));
            
            acf_add_options_sub_page(array(
                'page_title' => 'Contact Information',
                'menu_title' => 'Contact Info',
                'parent_slug' => 'studio-pickens-settings'
            ));
        }
    }
    
    public function register_field_groups() {
        
        // Hero Section Fields
        acf_add_local_field_group(array(
            'key' => 'group_hero_section',
            'title' => 'Hero Section',
            'fields' => array(
                // Basic Content
                array(
                    'key' => 'field_hero_title',
                    'label' => 'Main Title',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'default_value' => 'Studio Pickens',
                    'placeholder' => 'Enter main title',
                    'instructions' => 'The main hero title displayed prominently'
                ),
                array(
                    'key' => 'field_hero_subtitle',
                    'label' => 'Subtitle',
                    'name' => 'hero_subtitle',
                    'type' => 'text',
                    'placeholder' => 'Enter subtitle'
                ),
                array(
                    'key' => 'field_atelier_title',
                    'label' => 'Atelier Title',
                    'name' => 'atelier_title',
                    'type' => 'text',
                    'default_value' => 'atelier wigs by robert pickens'
                ),
                array(
                    'key' => 'field_atelier_description',
                    'label' => 'Atelier Description',
                    'name' => 'atelier_description',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_paragraph',
                            'label' => 'Paragraph',
                            'name' => 'paragraph',
                            'type' => 'textarea'
                        )
                    ),
                    'min' => 1,
                    'layout' => 'block'
                ),
                
                // Background Images with Transform Controls
                array(
                    'key' => 'field_background_images',
                    'label' => 'Background Images',
                    'name' => 'background_images',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_bg_image',
                            'label' => 'Image',
                            'name' => 'image',
                            'type' => 'image',
                            'return_format' => 'array',
                            'preview_size' => 'medium'
                        ),
                        array(
                            'key' => 'field_bg_alt_text',
                            'label' => 'Alt Text',
                            'name' => 'alt_text',
                            'type' => 'text'
                        ),
                        // Transform Controls Group
                        array(
                            'key' => 'field_bg_transform',
                            'label' => 'Transform Controls',
                            'name' => 'transform',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_bg_scale',
                                    'label' => 'Scale',
                                    'name' => 'scale',
                                    'type' => 'range',
                                    'min' => 0.5,
                                    'max' => 3,
                                    'step' => 0.1,
                                    'default_value' => 1,
                                    'append' => 'x'
                                ),
                                array(
                                    'key' => 'field_bg_translate_x',
                                    'label' => 'Translate X',
                                    'name' => 'translateX',
                                    'type' => 'range',
                                    'min' => -200,
                                    'max' => 200,
                                    'step' => 5,
                                    'default_value' => 0,
                                    'append' => 'px'
                                ),
                                array(
                                    'key' => 'field_bg_translate_y',
                                    'label' => 'Translate Y',
                                    'name' => 'translateY',
                                    'type' => 'range',
                                    'min' => -200,
                                    'max' => 200,
                                    'step' => 5,
                                    'default_value' => 0,
                                    'append' => 'px'
                                ),
                                array(
                                    'key' => 'field_bg_flip',
                                    'label' => 'Flip Horizontal',
                                    'name' => 'flip',
                                    'type' => 'true_false',
                                    'default_value' => 0
                                ),
                                array(
                                    'key' => 'field_bg_object_position',
                                    'label' => 'Object Position',
                                    'name' => 'objectPosition',
                                    'type' => 'select',
                                    'choices' => array(
                                        'center center' => 'Center Center',
                                        'center top' => 'Center Top',
                                        'center bottom' => 'Center Bottom',
                                        'left center' => 'Left Center',
                                        'right center' => 'Right Center',
                                        'left top' => 'Left Top',
                                        'right top' => 'Right Top',
                                        'left bottom' => 'Left Bottom',
                                        'right bottom' => 'Right Bottom'
                                    ),
                                    'default_value' => 'center center'
                                )
                            ),
                            'layout' => 'block'
                        )
                    ),
                    'min' => 1,
                    'layout' => 'block',
                    'button_label' => 'Add Background Image'
                ),
                
                // Polaroids with Positioning
                array(
                    'key' => 'field_polaroids',
                    'label' => 'Polaroids',
                    'name' => 'polaroids',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_polaroid_image',
                            'label' => 'Polaroid Image',
                            'name' => 'image',
                            'type' => 'image',
                            'return_format' => 'array'
                        ),
                        array(
                            'key' => 'field_polaroid_alt',
                            'label' => 'Alt Text',
                            'name' => 'alt',
                            'type' => 'text',
                            'default_value' => 'Behind the scenes'
                        ),
                        array(
                            'key' => 'field_polaroid_rotation',
                            'label' => 'Rotation',
                            'name' => 'rotation',
                            'type' => 'range',
                            'min' => -45,
                            'max' => 45,
                            'step' => 1,
                            'default_value' => 10,
                            'append' => '°'
                        ),
                        // Responsive Position Controls
                        array(
                            'key' => 'field_polaroid_position',
                            'label' => 'Position',
                            'name' => 'position',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_pos_top',
                                    'label' => 'Top Position',
                                    'name' => 'top',
                                    'type' => 'text',
                                    'placeholder' => 'e.g., clamp(10px, 1.39vw, 20px)',
                                    'instructions' => 'CSS position value (supports clamp, %, px, vw)'
                                ),
                                array(
                                    'key' => 'field_pos_left',
                                    'label' => 'Left Position',
                                    'name' => 'left',
                                    'type' => 'text',
                                    'placeholder' => 'e.g., clamp(10px, 1.39vw, 20px)'
                                ),
                                array(
                                    'key' => 'field_pos_right',
                                    'label' => 'Right Position',
                                    'name' => 'right',
                                    'type' => 'text',
                                    'placeholder' => 'Leave empty if using left'
                                ),
                                array(
                                    'key' => 'field_pos_bottom',
                                    'label' => 'Bottom Position',
                                    'name' => 'bottom',
                                    'type' => 'text',
                                    'placeholder' => 'Leave empty if using top'
                                )
                            )
                        ),
                        // Animation Controls
                        array(
                            'key' => 'field_polaroid_animation',
                            'label' => 'Animation Settings',
                            'name' => 'animation',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_float_enabled',
                                    'label' => 'Enable Float Animation',
                                    'name' => 'float_enabled',
                                    'type' => 'true_false',
                                    'default_value' => 1
                                ),
                                array(
                                    'key' => 'field_animation_delay',
                                    'label' => 'Animation Delay',
                                    'name' => 'delay',
                                    'type' => 'range',
                                    'min' => 0,
                                    'max' => 5,
                                    'step' => 0.1,
                                    'default_value' => 0,
                                    'append' => 's'
                                ),
                                array(
                                    'key' => 'field_animation_duration',
                                    'label' => 'Animation Duration',
                                    'name' => 'duration',
                                    'type' => 'range',
                                    'min' => 1,
                                    'max' => 10,
                                    'step' => 0.5,
                                    'default_value' => 3,
                                    'append' => 's'
                                )
                            )
                        )
                    ),
                    'min' => 0,
                    'layout' => 'block',
                    'button_label' => 'Add Polaroid'
                ),
                
                // Banner Sizing Controls
                array(
                    'key' => 'field_banner_sizing',
                    'label' => 'Banner Sizing',
                    'name' => 'banner_sizing',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_banner_height',
                            'label' => 'Banner Height Settings',
                            'name' => 'height',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_height_min',
                                    'label' => 'Minimum Height',
                                    'name' => 'min',
                                    'type' => 'number',
                                    'default_value' => 600,
                                    'append' => 'px'
                                ),
                                array(
                                    'key' => 'field_height_preferred',
                                    'label' => 'Preferred Height',
                                    'name' => 'preferred',
                                    'type' => 'number',
                                    'default_value' => 70,
                                    'append' => 'vh'
                                ),
                                array(
                                    'key' => 'field_height_max',
                                    'label' => 'Maximum Height',
                                    'name' => 'max',
                                    'type' => 'number',
                                    'default_value' => 1000,
                                    'append' => 'px'
                                )
                            )
                        ),
                        array(
                            'key' => 'field_logo_size',
                            'label' => 'Logo Size',
                            'name' => 'logo_size',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_logo_scale',
                                    'label' => 'Scale',
                                    'name' => 'scale',
                                    'type' => 'range',
                                    'min' => 0.5,
                                    'max' => 3,
                                    'step' => 0.1,
                                    'default_value' => 1.2
                                ),
                                array(
                                    'key' => 'field_logo_unit',
                                    'label' => 'Unit',
                                    'name' => 'unit',
                                    'type' => 'select',
                                    'choices' => array(
                                        'rem' => 'rem',
                                        'em' => 'em',
                                        'px' => 'px',
                                        'vw' => 'vw'
                                    ),
                                    'default_value' => 'rem'
                                )
                            )
                        ),
                        array(
                            'key' => 'field_title_size',
                            'label' => 'Title Size',
                            'name' => 'title_size',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_title_scale',
                                    'label' => 'Scale',
                                    'name' => 'scale',
                                    'type' => 'range',
                                    'min' => 0.5,
                                    'max' => 3,
                                    'step' => 0.1,
                                    'default_value' => 1
                                ),
                                array(
                                    'key' => 'field_title_unit',
                                    'label' => 'Unit',
                                    'name' => 'unit',
                                    'type' => 'select',
                                    'choices' => array(
                                        'rem' => 'rem',
                                        'em' => 'em',
                                        'px' => 'px',
                                        'vw' => 'vw'
                                    ),
                                    'default_value' => 'rem'
                                )
                            )
                        )
                    )
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'page_template',
                        'operator' => '==',
                        'value' => 'front-page.php'
                    )
                ),
                array(
                    array(
                        'param' => 'page',
                        'operator' => '==',
                        'value' => get_option('page_on_front')
                    )
                )
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label'
        ));
        
        // Work Project Fields
        acf_add_local_field_group(array(
            'key' => 'group_work_project',
            'title' => 'Work Project Details',
            'fields' => array(
                // Basic Project Info
                array(
                    'key' => 'field_project_client',
                    'label' => 'Client',
                    'name' => 'client',
                    'type' => 'text',
                    'required' => 1
                ),
                array(
                    'key' => 'field_project_year',
                    'label' => 'Year',
                    'name' => 'year',
                    'type' => 'number',
                    'min' => 2000,
                    'max' => date('Y') + 5,
                    'required' => 1
                ),
                
                // Category and Display Options
                array(
                    'key' => 'field_project_featured',
                    'label' => 'Featured on Homepage',
                    'name' => 'featured',
                    'type' => 'true_false',
                    'default_value' => 0,
                    'instructions' => 'Show this project on the homepage work showcase'
                ),
                array(
                    'key' => 'field_project_show_work_page',
                    'label' => 'Show on Work Page',
                    'name' => 'show_on_work_page',
                    'type' => 'true_false',
                    'default_value' => 1
                ),
                array(
                    'key' => 'field_project_side',
                    'label' => 'Homepage Display Side',
                    'name' => 'side',
                    'type' => 'select',
                    'choices' => array(
                        'left' => 'Left',
                        'right' => 'Right'
                    ),
                    'default_value' => 'left',
                    'conditional_logic' => array(
                        array(
                            array(
                                'field' => 'field_project_featured',
                                'operator' => '==',
                                'value' => '1'
                            )
                        )
                    )
                ),
                
                // Images
                array(
                    'key' => 'field_project_mobile_image',
                    'label' => 'Mobile Image',
                    'name' => 'mobile_image',
                    'type' => 'image',
                    'return_format' => 'array',
                    'instructions' => 'Optimized image for mobile display'
                ),
                
                // Content Details
                array(
                    'key' => 'field_project_content',
                    'label' => 'Project Details',
                    'name' => 'content_details',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_content_stylist',
                            'label' => 'Hair Designer',
                            'name' => 'stylist',
                            'type' => 'text'
                        ),
                        array(
                            'key' => 'field_content_photographer',
                            'label' => 'Cast/Photographer',
                            'name' => 'photographer',
                            'type' => 'text'
                        ),
                        array(
                            'key' => 'field_content_date',
                            'label' => 'Network/Publication',
                            'name' => 'date',
                            'type' => 'text'
                        ),
                        // Custom Labels
                        array(
                            'key' => 'field_content_labels',
                            'label' => 'Custom Labels',
                            'name' => 'labels',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_label_stylist',
                                    'label' => 'Stylist Label',
                                    'name' => 'stylist',
                                    'type' => 'text',
                                    'default_value' => 'HAIR DESIGNER'
                                ),
                                array(
                                    'key' => 'field_label_photographer',
                                    'label' => 'Photographer Label',
                                    'name' => 'photographer',
                                    'type' => 'text',
                                    'default_value' => 'CAST'
                                ),
                                array(
                                    'key' => 'field_label_date',
                                    'label' => 'Date/Network Label',
                                    'name' => 'date',
                                    'type' => 'text',
                                    'default_value' => 'NETWORK'
                                )
                            )
                        )
                    )
                ),
                
                // Gallery
                array(
                    'key' => 'field_project_gallery',
                    'label' => 'Project Gallery',
                    'name' => 'project_gallery',
                    'type' => 'gallery',
                    'return_format' => 'array'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'work_project'
                    )
                )
            )
        ));
        
        // Continue with other field groups...
        $this->register_process_fields();
        $this->register_story_fields();
        $this->register_location_fields();
        $this->register_faq_fields();
        $this->register_site_options_fields();
    }
    
    private function register_process_fields() {
        acf_add_local_field_group(array(
            'key' => 'group_process_step',
            'title' => 'Process Step Details',
            'fields' => array(
                array(
                    'key' => 'field_process_description',
                    'label' => 'Step Description',
                    'name' => 'step_description',
                    'type' => 'wysiwyg',
                    'toolbar' => 'basic',
                    'media_upload' => 0
                ),
                array(
                    'key' => 'field_process_image',
                    'label' => 'Step Image',
                    'name' => 'step_image',
                    'type' => 'image',
                    'return_format' => 'array'
                ),
                array(
                    'key' => 'field_process_alignment',
                    'label' => 'Content Alignment',
                    'name' => 'alignment',
                    'type' => 'select',
                    'choices' => array(
                        'left' => 'Left',
                        'right' => 'Right',
                        'center' => 'Center'
                    ),
                    'default_value' => 'left'
                ),
                array(
                    'key' => 'field_process_icon',
                    'label' => 'Step Icon',
                    'name' => 'step_icon',
                    'type' => 'image',
                    'return_format' => 'array',
                    'instructions' => 'Optional decorative icon for the step'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'process_step'
                    )
                )
            )
        ));
    }
    
    private function register_story_fields() {
        acf_add_local_field_group(array(
            'key' => 'group_story_element',
            'title' => 'Story Element',
            'fields' => array(
                // Circle Configuration
                array(
                    'key' => 'field_circle_type',
                    'label' => 'Circle Type',
                    'name' => 'circle_type',
                    'type' => 'select',
                    'choices' => array(
                        'simple' => 'Simple Circle',
                        'dashed_rotating' => 'Dashed Rotating',
                        'mixed' => 'Mixed Elements'
                    ),
                    'default_value' => 'simple'
                ),
                array(
                    'key' => 'field_circle_size',
                    'label' => 'Circle Size',
                    'name' => 'circle_size',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_desktop_size',
                            'label' => 'Desktop Size',
                            'name' => 'desktop',
                            'type' => 'number',
                            'default_value' => 200,
                            'append' => 'px'
                        ),
                        array(
                            'key' => 'field_mobile_size',
                            'label' => 'Mobile Size',
                            'name' => 'mobile',
                            'type' => 'number',
                            'default_value' => 150,
                            'append' => 'px'
                        )
                    )
                ),
                
                // Positioning
                array(
                    'key' => 'field_story_position',
                    'label' => 'Position on Timeline',
                    'name' => 'timeline_position',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_angle',
                            'label' => 'Angle on Circle',
                            'name' => 'angle',
                            'type' => 'range',
                            'min' => 0,
                            'max' => 360,
                            'step' => 1,
                            'default_value' => 0,
                            'append' => '°'
                        ),
                        array(
                            'key' => 'field_radius_offset',
                            'label' => 'Radius Offset',
                            'name' => 'radius_offset',
                            'type' => 'range',
                            'min' => -100,
                            'max' => 100,
                            'step' => 5,
                            'default_value' => 0,
                            'append' => 'px'
                        )
                    )
                ),
                
                // Content
                array(
                    'key' => 'field_story_year',
                    'label' => 'Year',
                    'name' => 'year',
                    'type' => 'number'
                ),
                array(
                    'key' => 'field_story_title',
                    'label' => 'Story Title',
                    'name' => 'story_title',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_story_description',
                    'label' => 'Description',
                    'name' => 'description',
                    'type' => 'textarea'
                ),
                
                // Associated Media
                array(
                    'key' => 'field_story_polaroid',
                    'label' => 'Story Polaroid',
                    'name' => 'story_polaroid',
                    'type' => 'image',
                    'return_format' => 'array'
                ),
                array(
                    'key' => 'field_story_media',
                    'label' => 'Additional Media',
                    'name' => 'additional_media',
                    'type' => 'gallery',
                    'return_format' => 'array'
                ),
                
                // Animation Settings
                array(
                    'key' => 'field_story_animation',
                    'label' => 'Animation Settings',
                    'name' => 'animation_settings',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_rotation_speed',
                            'label' => 'Rotation Speed',
                            'name' => 'rotation_speed',
                            'type' => 'select',
                            'choices' => array(
                                'slow' => 'Slow (30s)',
                                'medium' => 'Medium (20s)',
                                'fast' => 'Fast (10s)',
                                'none' => 'No Rotation'
                            ),
                            'default_value' => 'slow'
                        ),
                        array(
                            'key' => 'field_hover_effect',
                            'label' => 'Hover Effect',
                            'name' => 'hover_effect',
                            'type' => 'select',
                            'choices' => array(
                                'scale' => 'Scale Up',
                                'glow' => 'Glow Effect',
                                'bounce' => 'Bounce',
                                'none' => 'No Effect'
                            ),
                            'default_value' => 'scale'
                        )
                    )
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'story_element'
                    )
                )
            )
        ));
    }
    
    private function register_location_fields() {
        acf_add_local_field_group(array(
            'key' => 'group_location',
            'title' => 'Location Details',
            'fields' => array(
                array(
                    'key' => 'field_location_address',
                    'label' => 'Address',
                    'name' => 'address',
                    'type' => 'textarea',
                    'rows' => 4
                ),
                array(
                    'key' => 'field_location_phone',
                    'label' => 'Phone Number',
                    'name' => 'phone',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_location_email',
                    'label' => 'Email',
                    'name' => 'email',
                    'type' => 'email'
                ),
                array(
                    'key' => 'field_location_maps_url',
                    'label' => 'Google Maps URL',
                    'name' => 'maps_url',
                    'type' => 'url',
                    'instructions' => 'Link to Google Maps location'
                ),
                array(
                    'key' => 'field_location_variant',
                    'label' => 'Display Variant',
                    'name' => 'variant',
                    'type' => 'select',
                    'choices' => array(
                        'left' => 'Image Left, Content Right',
                        'right' => 'Content Left, Image Right',
                        'full' => 'Full Width'
                    ),
                    'default_value' => 'left'
                ),
                array(
                    'key' => 'field_location_hours',
                    'label' => 'Operating Hours',
                    'name' => 'operating_hours',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_day',
                            'label' => 'Day',
                            'name' => 'day',
                            'type' => 'select',
                            'choices' => array(
                                'monday' => 'Monday',
                                'tuesday' => 'Tuesday',
                                'wednesday' => 'Wednesday',
                                'thursday' => 'Thursday',
                                'friday' => 'Friday',
                                'saturday' => 'Saturday',
                                'sunday' => 'Sunday'
                            )
                        ),
                        array(
                            'key' => 'field_hours',
                            'label' => 'Hours',
                            'name' => 'hours',
                            'type' => 'text',
                            'placeholder' => '9:00 AM - 6:00 PM'
                        ),
                        array(
                            'key' => 'field_closed',
                            'label' => 'Closed',
                            'name' => 'closed',
                            'type' => 'true_false'
                        )
                    ),
                    'min' => 0,
                    'layout' => 'table'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'location'
                    )
                )
            )
        ));
    }
    
    private function register_faq_fields() {
        acf_add_local_field_group(array(
            'key' => 'group_faq_item',
            'title' => 'FAQ Details',
            'fields' => array(
                array(
                    'key' => 'field_faq_answer',
                    'label' => 'Answer',
                    'name' => 'answer',
                    'type' => 'wysiwyg',
                    'toolbar' => 'basic',
                    'instructions' => 'The question is the post title'
                ),
                array(
                    'key' => 'field_faq_icon',
                    'label' => 'FAQ Icon',
                    'name' => 'faq_icon',
                    'type' => 'image',
                    'return_format' => 'array'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'faq_item'
                    )
                )
            )
        ));
    }
    
    private function register_site_options_fields() {
        acf_add_local_field_group(array(
            'key' => 'group_site_options',
            'title' => 'Site Options',
            'fields' => array(
                // Global Banners
                array(
                    'key' => 'field_work_banner',
                    'label' => 'Work Page Banner',
                    'name' => 'work_banner',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_work_banner_desktop',
                            'label' => 'Desktop Banner',
                            'name' => 'desktop',
                            'type' => 'image'
                        ),
                        array(
                            'key' => 'field_work_banner_mobile',
                            'label' => 'Mobile Banner',
                            'name' => 'mobile',
                            'type' => 'image'
                        ),
                        array(
                            'key' => 'field_work_banner_title',
                            'label' => 'Banner Title',
                            'name' => 'title',
                            'type' => 'text',
                            'default_value' => 'SELECTED WORK'
                        )
                    )
                ),
                
                // Contact Information
                array(
                    'key' => 'field_contact_info',
                    'label' => 'Contact Information',
                    'name' => 'contact_info',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_contact_emails',
                            'label' => 'Email Addresses',
                            'name' => 'emails',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_email_press',
                                    'label' => 'Press Email',
                                    'name' => 'press',
                                    'type' => 'email'
                                ),
                                array(
                                    'key' => 'field_email_brooklyn',
                                    'label' => 'Brooklyn Email',
                                    'name' => 'brooklyn',
                                    'type' => 'email'
                                ),
                                array(
                                    'key' => 'field_email_beverly_hills',
                                    'label' => 'Beverly Hills Email',
                                    'name' => 'beverly_hills',
                                    'type' => 'email'
                                )
                            )
                        ),
                        array(
                            'key' => 'field_contact_phone',
                            'label' => 'Phone Number',
                            'name' => 'phone',
                            'type' => 'text'
                        )
                    )
                ),
                
                // Social Media
                array(
                    'key' => 'field_social_media',
                    'label' => 'Social Media',
                    'name' => 'social_media',
                    'type' => 'group',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_instagram',
                            'label' => 'Instagram URL',
                            'name' => 'instagram',
                            'type' => 'url'
                        ),
                        array(
                            'key' => 'field_linkedin',
                            'label' => 'LinkedIn URL',
                            'name' => 'linkedin',
                            'type' => 'url'
                        ),
                        array(
                            'key' => 'field_twitter',
                            'label' => 'Twitter URL',
                            'name' => 'twitter',
                            'type' => 'url'
                        )
                    )
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'studio-pickens-settings'
                    )
                )
            )
        ));
    }
}

new StudioPickensFields();
```

### 3. Template Hierarchy and Structure

**Template Loading Strategy:**
```php
// inc/theme-setup.php

class StudioPickensThemeSetup {
    
    public function __construct() {
        add_action('after_setup_theme', array($this, 'theme_setup'));
        add_action('wp_enqueue_scripts', array($this, 'theme_scripts'));
        add_filter('template_include', array($this, 'custom_template_hierarchy'));
    }
    
    public function theme_setup() {
        // Theme supports
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
        add_theme_support('html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
        ));
        add_theme_support('custom-logo');
        add_theme_support('customize-selective-refresh-widgets');
        
        // Image sizes
        add_image_size('work-thumbnail', 600, 400, true);
        add_image_size('work-large', 1200, 800, true);
        add_image_size('work-mobile', 400, 600, true);
        add_image_size('polaroid', 300, 300, false);
        add_image_size('polaroid-large', 400, 400, false);
        add_image_size('hero-background', 1920, 1080, true);
        add_image_size('banner-desktop', 1920, 600, true);
        add_image_size('banner-mobile', 768, 400, true);
        
        // Navigation menus
        register_nav_menus(array(
            'primary' => 'Primary Navigation',
            'footer' => 'Footer Navigation'
        ));
        
        // Content width
        if (!isset($content_width)) {
            $content_width = 1200;
        }
    }
    
    public function theme_scripts() {
        // Styles
        wp_enqueue_style('studio-pickens-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
        wp_enqueue_style('tailwind-css', get_template_directory_uri() . '/build/css/main.css', array(), wp_get_theme()->get('Version'));
        
        // Scripts
        wp_enqueue_script('studio-pickens-main', get_template_directory_uri() . '/build/js/main.js', array('jquery'), wp_get_theme()->get('Version'), true);
        wp_enqueue_script('studio-pickens-animations', get_template_directory_uri() . '/build/js/animations.js', array('jquery'), wp_get_theme()->get('Version'), true);
        
        // Localize script
        wp_localize_script('studio-pickens-main', 'studioAjax', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('studio_nonce'),
            'siteUrl' => home_url(),
            'themeUrl' => get_template_directory_uri()
        ));
        
        // Conditional scripts
        if (is_singular('work_project') || is_post_type_archive('work_project')) {
            wp_enqueue_script('studio-pickens-work', get_template_directory_uri() . '/build/js/work-gallery.js', array('jquery'), wp_get_theme()->get('Version'), true);
        }
        
        if (is_page_template('page-templates/page-process.php')) {
            wp_enqueue_script('studio-pickens-process', get_template_directory_uri() . '/build/js/process-timeline.js', array('jquery'), wp_get_theme()->get('Version'), true);
        }
        
        if (is_page_template('page-templates/page-story.php')) {
            wp_enqueue_script('studio-pickens-story', get_template_directory_uri() . '/build/js/story-circles.js', array('jquery'), wp_get_theme()->get('Version'), true);
        }
    }
    
    public function custom_template_hierarchy($template) {
        // Custom template routing
        if (is_front_page()) {
            $front_page_template = locate_template('front-page.php');
            if ($front_page_template) {
                return $front_page_template;
            }
        }
        
        // Work project templates
        if (is_singular('work_project')) {
            $work_template = locate_template('single-templates/single-work_project.php');
            if ($work_template) {
                return $work_template;
            }
        }
        
        if (is_post_type_archive('work_project')) {
            $work_archive = locate_template('single-templates/archive-work_project.php');
            if ($work_archive) {
                return $work_archive;
            }
        }
        
        return $template;
    }
}

new StudioPickensThemeSetup();
```

### 4. AJAX Handlers and API Integration

```php
// inc/ajax-handlers.php

class StudioPickensAjax {
    
    public function __construct() {
        // Work gallery AJAX
        add_action('wp_ajax_filter_work_projects', array($this, 'filter_work_projects'));
        add_action('wp_ajax_nopriv_filter_work_projects', array($this, 'filter_work_projects'));
        
        add_action('wp_ajax_get_work_modal', array($this, 'get_work_modal'));
        add_action('wp_ajax_nopriv_get_work_modal', array($this, 'get_work_modal'));
        
        // Contact form
        add_action('wp_ajax_submit_contact_form', array($this, 'submit_contact_form'));
        add_action('wp_ajax_nopriv_submit_contact_form', array($this, 'submit_contact_form'));
        
        // Image lazy loading
        add_action('wp_ajax_load_images', array($this, 'load_images'));
        add_action('wp_ajax_nopriv_load_images', array($this, 'load_images'));
    }
    
    public function filter_work_projects() {
        check_ajax_referer('studio_nonce', 'nonce');
        
        $category = sanitize_text_field($_POST['category']);
        $paged = intval($_POST['paged']) ?: 1;
        
        $args = array(
            'post_type' => 'work_project',
            'posts_per_page' => 12,
            'paged' => $paged,
            'meta_query' => array(
                array(
                    'key' => 'show_on_work_page',
                    'value' => '1',
                    'compare' => '='
                )
            )
        );
        
        if ($category !== 'all') {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'work_category',
                    'field' => 'slug',
                    'terms' => $category
                )
            );
        }
        
        $query = new WP_Query($args);
        
        ob_start();
        if ($query->have_posts()):
            while ($query->have_posts()): $query->the_post();
                get_template_part('template-parts/work-item');
            endwhile;
        endif;
        wp_reset_postdata();
        
        $html = ob_get_clean();
        
        wp_send_json_success(array(
            'html' => $html,
            'found_posts' => $query->found_posts,
            'max_pages' => $query->max_num_pages
        ));
    }
    
    public function get_work_modal() {
        check_ajax_referer('studio_nonce', 'nonce');
        
        $post_id = intval($_POST['post_id']);
        $post = get_post($post_id);
        
        if (!$post || $post->post_type !== 'work_project') {
            wp_send_json_error('Invalid project');
        }
        
        $client = get_field('client', $post_id);
        $year = get_field('year', $post_id);
        $content_details = get_field('content_details', $post_id);
        $gallery = get_field('project_gallery', $post_id);
        
        ob_start();
        ?>
        <div class="work-modal-content">
            <div class="modal-header mb-6">
                <h2 class="font-proxima-wide font-bold text-3xl text-studio-blue uppercase mb-2">
                    <?php echo esc_html($post->post_title); ?>
                </h2>
                <div class="text-gray-600">
                    <span class="font-semibold"><?php echo esc_html($client); ?></span>
                    <span class="mx-2">•</span>
                    <span><?php echo esc_html($year); ?></span>
                </div>
            </div>
            
            <?php if ($gallery): ?>
                <div class="modal-gallery mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <?php foreach ($gallery as $image): ?>
                            <div class="gallery-item">
                                <img src="<?php echo esc_url($image['sizes']['large']); ?>" 
                                     alt="<?php echo esc_attr($image['alt']); ?>"
                                     class="w-full h-64 object-cover rounded-lg">
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
            
            <div class="modal-content">
                <?php echo apply_filters('the_content', $post->post_content); ?>
            </div>
            
            <?php if ($content_details): ?>
                <div class="modal-details mt-6 pt-6 border-t border-gray-200">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <?php if ($content_details['stylist']): ?>
                            <div>
                                <h4 class="font-proxima-wide font-bold text-sm uppercase text-studio-blue">
                                    <?php echo esc_html($content_details['labels']['stylist'] ?: 'Hair Designer'); ?>
                                </h4>
                                <p><?php echo esc_html($content_details['stylist']); ?></p>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($content_details['photographer']): ?>
                            <div>
                                <h4 class="font-proxima-wide font-bold text-sm uppercase text-studio-blue">
                                    <?php echo esc_html($content_details['labels']['photographer'] ?: 'Cast'); ?>
                                </h4>
                                <p><?php echo esc_html($content_details['photographer']); ?></p>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($content_details['date']): ?>
                            <div>
                                <h4 class="font-proxima-wide font-bold text-sm uppercase text-studio-blue">
                                    <?php echo esc_html($content_details['labels']['date'] ?: 'Network'); ?>
                                </h4>
                                <p><?php echo esc_html($content_details['date']); ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
        <?php
        
        $html = ob_get_clean();
        wp_send_json_success(array('html' => $html));
    }
    
    public function submit_contact_form() {
        check_ajax_referer('studio_nonce', 'nonce');
        
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $subject = sanitize_text_field($_POST['subject']);
        $message = sanitize_textarea_field($_POST['message']);
        
        // Validation
        if (empty($name) || empty($email) || empty($message)) {
            wp_send_json_error('Please fill in all required fields.');
        }
        
        if (!is_email($email)) {
            wp_send_json_error('Please enter a valid email address.');
        }
        
        // Send email
        $to = get_field('contact_emails', 'option')['press'] ?: get_option('admin_email');
        $email_subject = 'Contact Form: ' . $subject;
        $email_message = "Name: {$name}\n";
        $email_message .= "Email: {$email}\n";
        $email_message .= "Subject: {$subject}\n\n";
        $email_message .= "Message:\n{$message}";
        
        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: ' . $name . ' <' . $email . '>',
            'Reply-To: ' . $email
        );
        
        $sent = wp_mail($to, $email_subject, $email_message, $headers);
        
        if ($sent) {
            wp_send_json_success('Thank you! Your message has been sent.');
        } else {
            wp_send_json_error('Sorry, there was an error sending your message. Please try again.');
        }
    }
}

new StudioPickensAjax();
```

This comprehensive WordPress theme architecture provides a solid foundation for recreating your Studio Pickens site while maintaining all the complex functionality, animations, and premium user experience. The structure is modular, scalable, and follows WordPress best practices.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Create WordPress migration task document with detailed breakdown", "status": "completed", "priority": "high"}, {"id": "2", "content": "Analyze current React/Tailwind implementation structure", "status": "completed", "priority": "high"}, {"id": "3", "content": "Plan WordPress theme architecture and custom post types", "status": "completed", "priority": "high"}, {"id": "4", "content": "Design data migration strategy from JSON to WordPress", "status": "in_progress", "priority": "high"}]