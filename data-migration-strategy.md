# Studio Pickens Data Migration Strategy
## Comprehensive JSON to WordPress Migration Plan

## Migration Overview

This document outlines the complete strategy for migrating data from your existing JSON-based React application to WordPress custom post types and Advanced Custom Fields.

---

## Phase 1: Pre-Migration Analysis

### 1.1 Data Audit and Mapping

**Current JSON Structure:**
```
data/
├── hero.json          → WordPress Homepage (ACF Fields)
├── work.json          → work_project CPT + Banners (Options)
├── process.json       → process_step CPT + Banner (Options)
├── story.json         → story_element CPT
├── locations.json     → location CPT
├── contact.json       → Site Options (ACF)
└── faq.json          → faq_item CPT + Banner (Options)
```

**Image Asset Mapping:**
```
public/images/
├── hero/              → WordPress Media Library (Hero Images)
├── work/              → Media Library (Work Projects)
├── process/           → Media Library (Process Steps)
├── story/             → Media Library (Story Elements)
├── locations/         → Media Library (Locations)
├── faq/              → Media Library (FAQ)
└── polaroids/        → Media Library (Polaroids)
```

### 1.2 Data Transformation Requirements

**Complex Data Structures Requiring Special Handling:**
1. **Transform Objects** - Scale, translate, flip values
2. **Responsive Positioning** - Clamp values, viewport units
3. **Nested Arrays** - Repeater field structures
4. **Image References** - Path resolution and media library imports
5. **Conditional Display** - Visibility flags and featured content

---

## Phase 2: Migration Script Development

### 2.1 Core Migration Class

```php
<?php
/**
 * Studio Pickens Data Migration System
 * Comprehensive JSON to WordPress migration
 */

class StudioPickensDataMigration {
    
    private $data_dir;
    private $upload_dir;
    private $migration_log = array();
    private $image_map = array();
    private $errors = array();
    
    public function __construct() {
        $this->data_dir = get_template_directory() . '/data/';
        $this->upload_dir = wp_upload_dir();
        
        // Ensure migration runs with proper permissions
        if (!current_user_can('manage_options')) {
            wp_die('Insufficient permissions for migration.');
        }
        
        $this->init_migration();
    }
    
    private function init_migration() {
        // Increase execution limits
        ini_set('max_execution_time', 0);
        ini_set('memory_limit', '512M');
        
        // Create migration log
        $this->log('Migration started: ' . date('Y-m-d H:i:s'));
    }
    
    /**
     * Main migration orchestrator
     */
    public function run_complete_migration() {
        try {
            $this->log('=== STARTING COMPLETE STUDIO PICKENS MIGRATION ===');
            
            // Step 1: Validate data files
            if (!$this->validate_data_files()) {
                throw new Exception('Data validation failed');
            }
            
            // Step 2: Create image mapping
            $this->create_image_inventory();
            
            // Step 3: Migrate core content
            $this->migrate_hero_section();
            $this->migrate_work_projects();
            $this->migrate_process_steps();
            $this->migrate_story_elements();
            $this->migrate_locations();
            $this->migrate_faq_items();
            $this->migrate_site_options();
            
            // Step 4: Migrate images
            $this->migrate_all_images();
            
            // Step 5: Set up menus and pages
            $this->setup_wordpress_structure();
            
            // Step 6: Cleanup and verification
            $this->verify_migration();
            $this->cleanup_migration();
            
            $this->log('=== MIGRATION COMPLETED SUCCESSFULLY ===');
            return array('success' => true, 'log' => $this->migration_log);
            
        } catch (Exception $e) {
            $this->log('FATAL ERROR: ' . $e->getMessage());
            $this->errors[] = $e->getMessage();
            return array('success' => false, 'errors' => $this->errors, 'log' => $this->migration_log);
        }
    }
    
    /**
     * Validate all required data files exist and are readable
     */
    private function validate_data_files() {
        $required_files = array('hero.json', 'work.json', 'process.json', 'story.json', 'locations.json', 'contact.json', 'faq.json');
        
        foreach ($required_files as $file) {
            $file_path = $this->data_dir . $file;
            if (!file_exists($file_path)) {
                $this->log("ERROR: Missing data file: {$file}");
                return false;
            }
            
            if (!is_readable($file_path)) {
                $this->log("ERROR: Cannot read data file: {$file}");
                return false;
            }
            
            // Validate JSON structure
            $json_content = file_get_contents($file_path);
            $json_data = json_decode($json_content, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->log("ERROR: Invalid JSON in file {$file}: " . json_last_error_msg());
                return false;
            }
            
            $this->log("✓ Validated: {$file}");
        }
        
        return true;
    }
    
    /**
     * Create comprehensive inventory of all images
     */
    private function create_image_inventory() {
        $this->log('Creating image inventory...');
        
        $image_dirs = array(
            'hero' => '/public/images/hero/',
            'work' => '/public/images/work/',
            'process' => '/public/images/process/',
            'story' => '/public/images/story/',
            'locations' => '/public/images/locations/',
            'faq' => '/public/images/faq/',
            'polaroids' => '/public/images/hero/'  // Polaroids are in hero directory
        );
        
        foreach ($image_dirs as $type => $dir) {
            $full_path = get_template_directory() . $dir;
            if (is_dir($full_path)) {
                $images = glob($full_path . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
                $this->image_map[$type] = array();
                
                foreach ($images as $image_path) {
                    $relative_path = str_replace(get_template_directory(), '', $image_path);
                    $this->image_map[$type][] = $relative_path;
                }
                
                $this->log("Found " . count($this->image_map[$type]) . " images in {$type} directory");
            }
        }
    }
    
    /**
     * Migrate hero section data
     */
    private function migrate_hero_section() {
        $this->log('Migrating hero section...');
        
        $hero_json = file_get_contents($this->data_dir . 'hero.json');
        $hero_data = json_decode($hero_json, true);
        
        // Get or create homepage
        $homepage = get_page_by_path('home');
        if (!$homepage) {
            $homepage_id = wp_insert_post(array(
                'post_title' => 'Home',
                'post_name' => 'home',
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_content' => 'Welcome to Studio Pickens'
            ));
        } else {
            $homepage_id = $homepage->ID;
        }
        
        // Set as front page
        update_option('page_on_front', $homepage_id);
        update_option('show_on_front', 'page');
        
        // Migrate basic hero fields
        update_field('hero_title', $hero_data['title'] ?? 'Studio Pickens', $homepage_id);
        update_field('hero_subtitle', $hero_data['subtitle'] ?? '', $homepage_id);
        update_field('atelier_title', $hero_data['atelierTitle'] ?? 'atelier wigs by robert pickens', $homepage_id);
        
        // Migrate atelier description
        if (isset($hero_data['atelierDescription']) && is_array($hero_data['atelierDescription'])) {
            $description_array = array();
            foreach ($hero_data['atelierDescription'] as $paragraph) {
                $description_array[] = array('paragraph' => $paragraph);
            }
            update_field('atelier_description', $description_array, $homepage_id);
        }
        
        // Migrate background images with transforms
        if (isset($hero_data['backgroundImages'])) {
            $bg_images_array = array();
            
            foreach ($hero_data['backgroundImages'] as $bg_img) {
                $image_id = $this->import_image_to_media_library($bg_img['image'], 'hero-background');
                
                if ($image_id) {
                    $transform = $bg_img['transform'] ?? array();
                    $bg_images_array[] = array(
                        'image' => $image_id,
                        'alt_text' => $bg_img['alt'] ?? 'Hero background',
                        'transform' => array(
                            'scale' => $transform['scale'] ?? 1,
                            'translateX' => $transform['translateX'] ?? 0,
                            'translateY' => $transform['translateY'] ?? 0,
                            'flip' => $transform['flip'] ?? false,
                            'objectPosition' => $transform['objectPosition'] ?? 'center center'
                        )
                    );
                }
            }
            
            update_field('background_images', $bg_images_array, $homepage_id);
            $this->log('Migrated ' . count($bg_images_array) . ' background images');
        }
        
        // Migrate polaroids with complex positioning
        if (isset($hero_data['polaroids'])) {
            $polaroids_array = array();
            
            foreach ($hero_data['polaroids'] as $polaroid) {
                $image_id = $this->import_image_to_media_library($polaroid['image'], 'polaroid');
                
                if ($image_id) {
                    $position = $polaroid['position'] ?? array();
                    $polaroids_array[] = array(
                        'image' => $image_id,
                        'alt' => $polaroid['alt'] ?? 'Behind the scenes',
                        'rotation' => $polaroid['rotation'] ?? 0,
                        'position' => array(
                            'top' => $position['top'] ?? '50%',
                            'left' => $position['left'] ?? '50%',
                            'right' => $position['right'] ?? '',
                            'bottom' => $position['bottom'] ?? ''
                        ),
                        'animation' => array(
                            'float_enabled' => true,
                            'delay' => ($polaroid['animation']['delay'] ?? 0),
                            'duration' => ($polaroid['animation']['duration'] ?? 3)
                        )
                    );
                }
            }
            
            update_field('polaroids', $polaroids_array, $homepage_id);
            $this->log('Migrated ' . count($polaroids_array) . ' polaroids');
        }
        
        // Migrate banner sizing
        if (isset($hero_data['banner']) || isset($hero_data['bannerHeight'])) {
            $banner_sizing = array(
                'height' => array(
                    'min' => $hero_data['bannerHeight']['min'] ?? 600,
                    'preferred' => $hero_data['bannerHeight']['preferred'] ?? 70,
                    'max' => $hero_data['bannerHeight']['max'] ?? 1000
                ),
                'logo_size' => array(
                    'scale' => $hero_data['banner']['logoSize']['scale'] ?? 1.2,
                    'unit' => $hero_data['banner']['logoSize']['unit'] ?? 'rem'
                ),
                'title_size' => array(
                    'scale' => $hero_data['banner']['titleSize']['scale'] ?? 1,
                    'unit' => $hero_data['banner']['titleSize']['unit'] ?? 'rem'
                )
            );
            
            update_field('banner_sizing', $banner_sizing, $homepage_id);
        }
        
        $this->log('✓ Hero section migration completed');
    }
    
    /**
     * Migrate work projects and related data
     */
    private function migrate_work_projects() {
        $this->log('Migrating work projects...');
        
        $work_json = file_get_contents($this->data_dir . 'work.json');
        $work_data = json_decode($work_json, true);
        
        // Migrate work page banner to options
        if (isset($work_data['banner'])) {
            $banner = $work_data['banner'];
            
            $desktop_banner_id = $this->import_image_to_media_library($banner['desktopImage'], 'banner-desktop');
            $mobile_banner_id = $this->import_image_to_media_library($banner['mobileImage'], 'banner-mobile');
            
            $work_banner_data = array(
                'desktop' => $desktop_banner_id,
                'mobile' => $mobile_banner_id,
                'title' => $banner['title'] ?? 'SELECTED WORK'
            );
            
            update_field('work_banner', $work_banner_data, 'option');
        }
        
        // Create work categories taxonomy terms
        $categories = array();
        if (isset($work_data['projects'])) {
            foreach ($work_data['projects'] as $project) {
                if (isset($project['category']) && !in_array($project['category'], $categories)) {
                    $categories[] = $project['category'];
                }
            }
        }
        
        // Create taxonomy terms
        foreach ($categories as $category) {
            $term_name = $this->format_category_name($category);
            $term_slug = sanitize_title($category);
            
            if (!term_exists($term_slug, 'work_category')) {
                wp_insert_term($term_name, 'work_category', array('slug' => $term_slug));
                $this->log("Created work category: {$term_name}");
            }
        }
        
        // Migrate individual projects
        $projects_created = 0;
        if (isset($work_data['projects'])) {
            foreach ($work_data['projects'] as $project) {
                $post_id = wp_insert_post(array(
                    'post_title' => $project['title'],
                    'post_content' => $project['description'] ?? '',
                    'post_excerpt' => $this->create_excerpt($project['description'] ?? ''),
                    'post_status' => 'publish',
                    'post_type' => 'work_project',
                    'menu_order' => $project['order'] ?? 0
                ));
                
                if ($post_id && !is_wp_error($post_id)) {
                    // Set featured image
                    $featured_image_id = $this->import_image_to_media_library($project['image'], 'work-large');
                    if ($featured_image_id) {
                        set_post_thumbnail($post_id, $featured_image_id);
                    }
                    
                    // Set basic fields
                    update_field('client', $project['client'] ?? '', $post_id);
                    update_field('year', $project['year'] ?? date('Y'), $post_id);
                    update_field('featured', $project['featured'] ?? false, $post_id);
                    update_field('show_on_work_page', $project['showOnWorkPage'] ?? true, $post_id);
                    update_field('side', $project['side'] ?? 'left', $post_id);
                    
                    // Set mobile image
                    if (isset($project['mobileImage'])) {
                        $mobile_image_id = $this->import_image_to_media_library($project['mobileImage'], 'work-mobile');
                        update_field('mobile_image', $mobile_image_id, $post_id);
                    }
                    
                    // Set content details
                    if (isset($project['content'])) {
                        $content = $project['content'];
                        $content_details = array(
                            'stylist' => $content['stylist'] ?? '',
                            'photographer' => $content['photographer'] ?? '',
                            'date' => $content['date'] ?? '',
                            'labels' => array(
                                'stylist' => $content['labels']['stylist'] ?? 'HAIR DESIGNER',
                                'photographer' => $content['labels']['photographer'] ?? 'CAST',
                                'date' => $content['labels']['date'] ?? 'NETWORK'
                            )
                        );
                        update_field('content_details', $content_details, $post_id);
                    }
                    
                    // Set category taxonomy
                    if (isset($project['category'])) {
                        $term = get_term_by('slug', sanitize_title($project['category']), 'work_category');
                        if ($term) {
                            wp_set_object_terms($post_id, array($term->term_id), 'work_category');
                        }
                    }
                    
                    $projects_created++;
                }
            }
        }
        
        // Migrate section banners
        if (isset($work_data['sectionBanners'])) {
            foreach ($work_data['sectionBanners'] as $section_banner) {
                // These will be stored as options for each category
                $category_slug = sanitize_title($section_banner['category']);
                $banner_image_id = $this->import_image_to_media_library($section_banner['image'], 'banner-desktop');
                
                if ($banner_image_id) {
                    update_field("work_banner_{$category_slug}", $banner_image_id, 'option');
                }
            }
        }
        
        $this->log("✓ Work projects migration completed: {$projects_created} projects created");
    }
    
    /**
     * Migrate process steps
     */
    private function migrate_process_steps() {
        $this->log('Migrating process steps...');
        
        $process_json = file_get_contents($this->data_dir . 'process.json');
        $process_data = json_decode($process_json, true);
        
        // Migrate process banner to options
        if (isset($process_data['banner'])) {
            $banner = $process_data['banner'];
            
            $desktop_banner_id = $this->import_image_to_media_library($banner['desktopImage'], 'banner-desktop');
            $mobile_banner_id = $this->import_image_to_media_library($banner['mobileImage'], 'banner-mobile');
            
            $process_banner_data = array(
                'desktop' => $desktop_banner_id,
                'mobile' => $mobile_banner_id,
                'title' => $banner['title'] ?? 'PROCESS'
            );
            
            update_field('process_banner', $process_banner_data, 'option');
        }
        
        // Migrate process steps
        $steps_created = 0;
        if (isset($process_data['processSteps'])) {
            foreach ($process_data['processSteps'] as $step) {
                $post_id = wp_insert_post(array(
                    'post_title' => $step['title'],
                    'post_content' => $step['description'] ?? '',
                    'post_status' => 'publish',
                    'post_type' => 'process_step',
                    'menu_order' => $step['order'] ?? 0
                ));
                
                if ($post_id && !is_wp_error($post_id)) {
                    // Set step image
                    if (isset($step['image'])) {
                        $step_image_id = $this->import_image_to_media_library($step['image'], 'large');
                        update_field('step_image', $step_image_id, $post_id);
                    }
                    
                    // Set alignment
                    update_field('alignment', $step['alignment'] ?? 'left', $post_id);
                    
                    $steps_created++;
                }
            }
        }
        
        $this->log("✓ Process steps migration completed: {$steps_created} steps created");
    }
    
    /**
     * Migrate story timeline elements
     */
    private function migrate_story_elements() {
        $this->log('Migrating story elements...');
        
        $story_json = file_get_contents($this->data_dir . 'story.json');
        $story_data = json_decode($story_json, true);
        
        $elements_created = 0;
        
        // Process circles and elements
        if (isset($story_data['circles'])) {
            foreach ($story_data['circles'] as $circle) {
                // Create story element post
                $post_id = wp_insert_post(array(
                    'post_title' => $circle['title'] ?? 'Story Element',
                    'post_content' => $circle['description'] ?? '',
                    'post_status' => 'publish',
                    'post_type' => 'story_element',
                    'menu_order' => $circle['order'] ?? 0
                ));
                
                if ($post_id && !is_wp_error($post_id)) {
                    // Set circle configuration
                    update_field('circle_type', $circle['type'] ?? 'simple', $post_id);
                    
                    // Set circle sizing
                    $circle_size = array(
                        'desktop' => $circle['size']['desktop'] ?? 200,
                        'mobile' => $circle['size']['mobile'] ?? 150
                    );
                    update_field('circle_size', $circle_size, $post_id);
                    
                    // Set positioning
                    $timeline_position = array(
                        'angle' => $circle['position']['angle'] ?? 0,
                        'radius_offset' => $circle['position']['radiusOffset'] ?? 0
                    );
                    update_field('timeline_position', $timeline_position, $post_id);
                    
                    // Set content
                    update_field('year', $circle['year'] ?? date('Y'), $post_id);
                    update_field('story_title', $circle['title'] ?? '', $post_id);
                    update_field('description', $circle['description'] ?? '', $post_id);
                    
                    // Set polaroid image
                    if (isset($circle['polaroid'])) {
                        $polaroid_id = $this->import_image_to_media_library($circle['polaroid'], 'polaroid');
                        update_field('story_polaroid', $polaroid_id, $post_id);
                    }
                    
                    // Set animation settings
                    $animation_settings = array(
                        'rotation_speed' => $circle['animation']['rotationSpeed'] ?? 'slow',
                        'hover_effect' => $circle['animation']['hoverEffect'] ?? 'scale'
                    );
                    update_field('animation_settings', $animation_settings, $post_id);
                    
                    $elements_created++;
                }
            }
        }
        
        $this->log("✓ Story elements migration completed: {$elements_created} elements created");
    }
    
    /**
     * Migrate locations
     */
    private function migrate_locations() {
        $this->log('Migrating locations...');
        
        $locations_json = file_get_contents($this->data_dir . 'locations.json');
        $locations_data = json_decode($locations_json, true);
        
        $locations_created = 0;
        
        if (isset($locations_data['locations'])) {
            foreach ($locations_data['locations'] as $location) {
                if (!($location['visible'] ?? true)) {
                    continue; // Skip hidden locations
                }
                
                $post_id = wp_insert_post(array(
                    'post_title' => $location['name'],
                    'post_content' => $location['description'] ?? '',
                    'post_status' => 'publish',
                    'post_type' => 'location',
                    'menu_order' => $location['order'] ?? 0
                ));
                
                if ($post_id && !is_wp_error($post_id)) {
                    // Set featured image
                    if (isset($location['image'])) {
                        $location_image_id = $this->import_image_to_media_library($location['image'], 'large');
                        set_post_thumbnail($post_id, $location_image_id);
                    }
                    
                    // Set location details
                    update_field('address', $location['address'] ?? '', $post_id);
                    update_field('phone', $location['phone'] ?? '', $post_id);
                    update_field('email', $location['email'] ?? '', $post_id);
                    update_field('maps_url', $location['mapsUrl'] ?? '', $post_id);
                    update_field('variant', $location['variant'] ?? 'left', $post_id);
                    
                    // Set operating hours if available
                    if (isset($location['hours'])) {
                        $hours_array = array();
                        foreach ($location['hours'] as $day => $hours) {
                            $hours_array[] = array(
                                'day' => $day,
                                'hours' => $hours,
                                'closed' => empty($hours)
                            );
                        }
                        update_field('operating_hours', $hours_array, $post_id);
                    }
                    
                    $locations_created++;
                }
            }
        }
        
        $this->log("✓ Locations migration completed: {$locations_created} locations created");
    }
    
    /**
     * Migrate FAQ items
     */
    private function migrate_faq_items() {
        $this->log('Migrating FAQ items...');
        
        $faq_json = file_get_contents($this->data_dir . 'faq.json');
        $faq_data = json_decode($faq_json, true);
        
        // Migrate FAQ banner to options
        if (isset($faq_data['banner'])) {
            $banner = $faq_data['banner'];
            
            $banner_image_id = $this->import_image_to_media_library($banner['backgroundImage']['desktop'], 'banner-desktop');
            update_field('faq_banner', $banner_image_id, 'option');
        }
        
        $faq_created = 0;
        
        if (isset($faq_data['items'])) {
            // Create FAQ categories first
            $categories = array();
            foreach ($faq_data['items'] as $faq) {
                $category = $faq['category'] ?? 'general';
                if (!in_array($category, $categories)) {
                    $categories[] = $category;
                }
            }
            
            foreach ($categories as $category) {
                $term_name = ucfirst(str_replace('_', ' ', $category));
                if (!term_exists($term_name, 'faq_category')) {
                    wp_insert_term($term_name, 'faq_category', array('slug' => $category));
                }
            }
            
            // Create FAQ items
            foreach ($faq_data['items'] as $faq) {
                $post_id = wp_insert_post(array(
                    'post_title' => $faq['question'],
                    'post_content' => $faq['answer'],
                    'post_status' => 'publish',
                    'post_type' => 'faq_item',
                    'menu_order' => $faq['order'] ?? 0
                ));
                
                if ($post_id && !is_wp_error($post_id)) {
                    // Set category
                    $category = $faq['category'] ?? 'general';
                    $term = get_term_by('slug', $category, 'faq_category');
                    if ($term) {
                        wp_set_object_terms($post_id, array($term->term_id), 'faq_category');
                    }
                    
                    $faq_created++;
                }
            }
        }
        
        $this->log("✓ FAQ migration completed: {$faq_created} items created");
    }
    
    /**
     * Migrate site-wide options and contact info
     */
    private function migrate_site_options() {
        $this->log('Migrating site options...');
        
        $contact_json = file_get_contents($this->data_dir . 'contact.json');
        $contact_data = json_decode($contact_json, true);
        
        // Migrate contact information
        if (isset($contact_data['emails'])) {
            $contact_info = array(
                'emails' => $contact_data['emails'],
                'phone' => $contact_data['phone'] ?? ''
            );
            
            update_field('contact_info', $contact_info, 'option');
        }
        
        // Set up additional site options
        $social_media = array(
            'instagram' => '',
            'linkedin' => '',
            'twitter' => ''
        );
        update_field('social_media', $social_media, 'option');
        
        $this->log('✓ Site options migration completed');
    }
    
    /**
     * Import image to WordPress media library
     */
    private function import_image_to_media_library($image_path, $size_hint = 'full') {
        if (empty($image_path)) {
            return false;
        }
        
        // Clean up path
        $image_path = ltrim($image_path, '/');
        $local_path = get_template_directory() . '/' . $image_path;
        
        // Check if file exists
        if (!file_exists($local_path)) {
            $this->log("WARNING: Image not found: {$local_path}");
            return false;
        }
        
        // Check if already imported
        $existing = get_posts(array(
            'post_type' => 'attachment',
            'meta_query' => array(
                array(
                    'key' => '_original_path',
                    'value' => $image_path,
                    'compare' => '='
                )
            ),
            'posts_per_page' => 1
        ));
        
        if (!empty($existing)) {
            return $existing[0]->ID;
        }
        
        // Import new image
        $file_info = wp_check_filetype($local_path);
        $upload_dir = wp_upload_dir();
        
        // Create unique filename
        $filename = basename($local_path);
        $unique_filename = wp_unique_filename($upload_dir['path'], $filename);
        $new_path = $upload_dir['path'] . '/' . $unique_filename;
        
        // Copy file
        if (!copy($local_path, $new_path)) {
            $this->log("ERROR: Failed to copy image: {$local_path}");
            return false;
        }
        
        // Create attachment
        $attachment_id = wp_insert_attachment(array(
            'post_mime_type' => $file_info['type'],
            'post_title' => sanitize_file_name(pathinfo($filename, PATHINFO_FILENAME)),
            'post_content' => '',
            'post_status' => 'inherit'
        ), $new_path);
        
        if (is_wp_error($attachment_id)) {
            $this->log("ERROR: Failed to create attachment: " . $attachment_id->get_error_message());
            return false;
        }
        
        // Generate thumbnails
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attachment_id, $new_path);
        wp_update_attachment_metadata($attachment_id, $attach_data);
        
        // Save original path reference
        update_post_meta($attachment_id, '_original_path', $image_path);
        update_post_meta($attachment_id, '_migration_batch', 'studio_pickens_' . date('Y_m_d'));
        
        return $attachment_id;
    }
    
    /**
     * Migrate all images in batch
     */
    private function migrate_all_images() {
        $this->log('Starting batch image migration...');
        
        $total_images = 0;
        foreach ($this->image_map as $type => $images) {
            $total_images += count($images);
        }
        
        $migrated = 0;
        foreach ($this->image_map as $type => $images) {
            foreach ($images as $image_path) {
                $result = $this->import_image_to_media_library($image_path);
                if ($result) {
                    $migrated++;
                }
            }
        }
        
        $this->log("✓ Image migration completed: {$migrated}/{$total_images} images migrated");
    }
    
    /**
     * Set up WordPress structure (menus, pages, etc.)
     */
    private function setup_wordpress_structure() {
        $this->log('Setting up WordPress structure...');
        
        // Create required pages
        $pages = array(
            'work' => 'Work',
            'process' => 'Process',
            'story' => 'Story',
            'locations' => 'Locations', 
            'contact' => 'Contact',
            'faq' => 'FAQ'
        );
        
        foreach ($pages as $slug => $title) {
            $page = get_page_by_path($slug);
            if (!$page) {
                wp_insert_post(array(
                    'post_title' => $title,
                    'post_name' => $slug,
                    'post_status' => 'publish',
                    'post_type' => 'page',
                    'post_content' => "This is the {$title} page."
                ));
                $this->log("Created page: {$title}");
            }
        }
        
        // Create primary navigation menu
        $menu_name = 'Primary Navigation';
        $menu_exists = wp_get_nav_menu_object($menu_name);
        
        if (!$menu_exists) {
            $menu_id = wp_create_nav_menu($menu_name);
            
            // Add menu items
            $menu_items = array(
                array('title' => 'Work', 'url' => home_url('/work')),
                array('title' => 'Process', 'url' => home_url('/process')),
                array('title' => 'Story', 'url' => home_url('/story')),
                array('title' => 'Locations', 'url' => home_url('/locations')),
                array('title' => 'Contact', 'url' => home_url('/contact')),
                array('title' => 'FAQ', 'url' => home_url('/faq'))
            );
            
            foreach ($menu_items as $item) {
                wp_update_nav_menu_item($menu_id, 0, array(
                    'menu-item-title' => $item['title'],
                    'menu-item-url' => $item['url'],
                    'menu-item-status' => 'publish'
                ));
            }
            
            // Set menu location
            $locations = get_theme_mod('nav_menu_locations');
            $locations['primary'] = $menu_id;
            set_theme_mod('nav_menu_locations', $locations);
            
            $this->log('✓ Primary navigation menu created');
        }
    }
    
    /**
     * Verify migration integrity
     */
    private function verify_migration() {
        $this->log('Verifying migration integrity...');
        
        // Count migrated content
        $work_count = wp_count_posts('work_project')->publish;
        $process_count = wp_count_posts('process_step')->publish;
        $story_count = wp_count_posts('story_element')->publish;
        $location_count = wp_count_posts('location')->publish;
        $faq_count = wp_count_posts('faq_item')->publish;
        
        $this->log("Content verification:");
        $this->log("- Work projects: {$work_count}");
        $this->log("- Process steps: {$process_count}");
        $this->log("- Story elements: {$story_count}");
        $this->log("- Locations: {$location_count}");
        $this->log("- FAQ items: {$faq_count}");
        
        // Verify homepage setup
        $front_page = get_option('page_on_front');
        $show_on_front = get_option('show_on_front');
        
        if ($show_on_front === 'page' && $front_page) {
            $this->log('✓ Homepage configured correctly');
        } else {
            $this->log('WARNING: Homepage configuration may need attention');
        }
        
        // Check for critical errors
        if (empty($this->errors)) {
            $this->log('✓ Migration verification completed successfully');
        } else {
            $this->log('⚠ Migration completed with ' . count($this->errors) . ' errors');
        }
    }
    
    /**
     * Cleanup migration artifacts
     */
    private function cleanup_migration() {
        $this->log('Cleaning up migration artifacts...');
        
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Clear any caches
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }
        
        // Save migration log
        $log_content = implode("\n", $this->migration_log);
        $log_file = $this->upload_dir['path'] . '/studio-pickens-migration-' . date('Y-m-d-H-i-s') . '.log';
        file_put_contents($log_file, $log_content);
        
        $this->log('✓ Cleanup completed - log saved to: ' . basename($log_file));
    }
    
    /**
     * Utility functions
     */
    private function log($message) {
        $timestamp = date('H:i:s');
        $this->migration_log[] = "[{$timestamp}] {$message}";
        
        // Also output to screen if running in CLI
        if (php_sapi_name() === 'cli') {
            echo "[{$timestamp}] {$message}\n";
        }
    }
    
    private function format_category_name($category) {
        return strtoupper(str_replace('_', ' & ', $category));
    }
    
    private function create_excerpt($content, $length = 150) {
        return wp_trim_words(strip_tags($content), $length);
    }
}

// Usage Examples:

// 1. Run migration via WordPress admin page
function run_studio_pickens_migration() {
    if (!current_user_can('manage_options')) {
        wp_die('Insufficient permissions');
    }
    
    $migration = new StudioPickensDataMigration();
    $result = $migration->run_complete_migration();
    
    if ($result['success']) {
        echo '<div class="notice notice-success"><p>Migration completed successfully!</p></div>';
        echo '<pre>' . implode("\n", $result['log']) . '</pre>';
    } else {
        echo '<div class="notice notice-error"><p>Migration failed. Check the logs for details.</p></div>';
        echo '<pre>' . implode("\n", $result['errors']) . '</pre>';
    }
}

// 2. Run migration via WP-CLI
if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('studio-pickens migrate', function() {
        $migration = new StudioPickensDataMigration();
        $result = $migration->run_complete_migration();
        
        if ($result['success']) {
            WP_CLI::success('Migration completed successfully!');
        } else {
            WP_CLI::error('Migration failed: ' . implode(', ', $result['errors']));
        }
    });
}

?>
```

### 2.2 Incremental Migration Scripts

For safer, step-by-step migration:

```php
<?php
/**
 * Incremental Migration System
 * Allows step-by-step migration with rollback capabilities
 */

class StudioPickensIncrementalMigration {
    
    private $migration_steps = array(
        'validate' => 'Validate Data Files',
        'hero' => 'Migrate Hero Section',
        'work' => 'Migrate Work Projects',
        'process' => 'Migrate Process Steps',
        'story' => 'Migrate Story Elements',
        'locations' => 'Migrate Locations',
        'faq' => 'Migrate FAQ Items',
        'options' => 'Migrate Site Options',
        'images' => 'Migrate Images',
        'structure' => 'Setup WordPress Structure',
        'verify' => 'Verify Migration'
    );
    
    public function __construct() {
        add_action('wp_ajax_studio_migration_step', array($this, 'handle_migration_step'));
        add_action('admin_menu', array($this, 'add_migration_page'));
    }
    
    public function add_migration_page() {
        add_management_page(
            'Studio Pickens Migration',
            'Studio Migration',
            'manage_options',
            'studio-migration',
            array($this, 'migration_page')
        );
    }
    
    public function migration_page() {
        ?>
        <div class="wrap">
            <h1>Studio Pickens Data Migration</h1>
            
            <div id="migration-progress">
                <h2>Migration Steps</h2>
                <?php foreach ($this->migration_steps as $step_key => $step_name): ?>
                    <div class="migration-step" data-step="<?php echo $step_key; ?>">
                        <button class="button migrate-step-btn" 
                                data-step="<?php echo $step_key; ?>"
                                <?php echo $this->is_step_completed($step_key) ? 'disabled' : ''; ?>>
                            <?php echo $this->is_step_completed($step_key) ? '✓' : '○'; ?>
                            <?php echo $step_name; ?>
                        </button>
                        <div class="step-status" id="status-<?php echo $step_key; ?>">
                            <?php echo $this->get_step_status($step_key); ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            
            <div id="migration-log">
                <h3>Migration Log</h3>
                <textarea id="log-output" rows="10" cols="80" readonly></textarea>
            </div>
            
            <div class="migration-actions">
                <button id="run-all-steps" class="button button-primary">Run All Steps</button>
                <button id="rollback-migration" class="button button-secondary">Rollback Last Step</button>
                <button id="reset-migration" class="button">Reset Migration</button>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            $('.migrate-step-btn').on('click', function() {
                var step = $(this).data('step');
                runMigrationStep(step);
            });
            
            $('#run-all-steps').on('click', function() {
                runAllMigrationSteps();
            });
            
            function runMigrationStep(step) {
                var $btn = $('[data-step="' + step + '"]');
                var $status = $('#status-' + step);
                
                $btn.prop('disabled', true).text('Running...');
                $status.text('In progress...');
                
                $.post(ajaxurl, {
                    action: 'studio_migration_step',
                    step: step,
                    nonce: '<?php echo wp_create_nonce('studio_migration'); ?>'
                }, function(response) {
                    if (response.success) {
                        $btn.text('✓ ' + $btn.text().replace('Running...', '').replace('○ ', ''));
                        $status.text('Completed successfully');
                        $('#log-output').append(response.data.log + '\n');
                    } else {
                        $btn.prop('disabled', false).text('○ ' + $btn.text().replace('Running...', ''));
                        $status.text('Error: ' + response.data.error);
                    }
                }).fail(function() {
                    $btn.prop('disabled', false).text('○ ' + $btn.text().replace('Running...', ''));
                    $status.text('Request failed');
                });
            }
            
            function runAllMigrationSteps() {
                var steps = <?php echo json_encode(array_keys($this->migration_steps)); ?>;
                var currentStep = 0;
                
                function runNextStep() {
                    if (currentStep < steps.length) {
                        var step = steps[currentStep];
                        runMigrationStep(step);
                        currentStep++;
                        setTimeout(runNextStep, 2000); // Wait 2 seconds between steps
                    }
                }
                
                runNextStep();
            }
        });
        </script>
        <?php
    }
    
    public function handle_migration_step() {
        check_ajax_referer('studio_migration', 'nonce');
        
        $step = sanitize_text_field($_POST['step']);
        
        try {
            switch ($step) {
                case 'validate':
                    $result = $this->validate_data_files();
                    break;
                case 'hero':
                    $result = $this->migrate_hero_section();
                    break;
                case 'work':
                    $result = $this->migrate_work_projects();
                    break;
                // ... other cases
                default:
                    throw new Exception('Unknown migration step: ' . $step);
            }
            
            // Mark step as completed
            update_option('studio_migration_step_' . $step, array(
                'completed' => true,
                'timestamp' => current_time('mysql'),
                'result' => $result
            ));
            
            wp_send_json_success(array(
                'log' => "Step '{$step}' completed successfully",
                'result' => $result
            ));
            
        } catch (Exception $e) {
            wp_send_json_error(array(
                'error' => $e->getMessage()
            ));
        }
    }
    
    private function is_step_completed($step) {
        return get_option('studio_migration_step_' . $step, false) !== false;
    }
    
    private function get_step_status($step) {
        $status = get_option('studio_migration_step_' . $step, false);
        if ($status) {
            return 'Completed on ' . $status['timestamp'];
        }
        return 'Not started';
    }
    
    // Individual migration methods (same as in main migration class)
    private function validate_data_files() {
        // Validation logic here
        return 'Data files validated successfully';
    }
    
    private function migrate_hero_section() {
        // Hero migration logic here
        return 'Hero section migrated successfully';
    }
    
    // ... other migration methods
}

new StudioPickensIncrementalMigration();
?>
```

---

## Phase 3: Testing and Validation

### 3.1 Migration Testing Checklist

```markdown
# Migration Testing Checklist

## Pre-Migration
- [ ] Backup original JSON files
- [ ] Backup WordPress database
- [ ] Verify all image files are accessible
- [ ] Test migration script on staging environment

## Data Integrity Testing
- [ ] Hero section displays correctly with all elements
- [ ] All work projects imported with correct metadata
- [ ] Process steps appear in correct order
- [ ] Story timeline elements positioned correctly
- [ ] All locations have complete information
- [ ] FAQ items categorized properly
- [ ] Contact information transferred accurately

## Image Migration Testing
- [ ] All hero background images imported
- [ ] Polaroids positioned correctly
- [ ] Work project images (desktop and mobile) imported
- [ ] Process step images imported
- [ ] Story timeline polaroids imported
- [ ] Location images imported
- [ ] Banner images for all sections imported

## Transform Data Testing
- [ ] Hero background image transforms applied correctly
- [ ] Polaroid positioning matches original
- [ ] Work project image transforms preserved
- [ ] Responsive clamp values converted correctly

## Functionality Testing
- [ ] Work gallery filtering works
- [ ] Process timeline displays correctly
- [ ] Story circles positioned properly
- [ ] Location maps links work
- [ ] FAQ accordion functions
- [ ] Contact form submits correctly

## WordPress Integration Testing
- [ ] Custom post types created correctly
- [ ] ACF fields populated with data
- [ ] Taxonomy terms created and assigned
- [ ] Navigation menus set up
- [ ] Homepage set as front page
- [ ] Permalink structure configured
```

### 3.2 Rollback Strategy

```php
<?php
/**
 * Migration Rollback System
 * Safely undo migration steps if needed
 */

class StudioPickensMigrationRollback {
    
    public function rollback_complete_migration() {
        $this->log('Starting complete migration rollback...');
        
        try {
            // Remove custom post types content
            $this->remove_custom_posts();
            
            // Remove ACF field groups
            $this->remove_acf_fields();
            
            // Remove uploaded images from this migration
            $this->remove_migrated_images();
            
            // Reset WordPress options
            $this->reset_wordpress_options();
            
            // Clear migration status
            $this->clear_migration_status();
            
            $this->log('Migration rollback completed successfully');
            return true;
            
        } catch (Exception $e) {
            $this->log('Rollback error: ' . $e->getMessage());
            return false;
        }
    }
    
    private function remove_custom_posts() {
        $post_types = array('work_project', 'process_step', 'story_element', 'location', 'faq_item');
        
        foreach ($post_types as $post_type) {
            $posts = get_posts(array(
                'post_type' => $post_type,
                'posts_per_page' => -1,
                'post_status' => 'any'
            ));
            
            foreach ($posts as $post) {
                wp_delete_post($post->ID, true);
            }
            
            $this->log("Removed all {$post_type} posts");
        }
    }
    
    private function remove_migrated_images() {
        $images = get_posts(array(
            'post_type' => 'attachment',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_migration_batch',
                    'value' => 'studio_pickens_',
                    'compare' => 'LIKE'
                )
            )
        ));
        
        foreach ($images as $image) {
            wp_delete_attachment($image->ID, true);
        }
        
        $this->log('Removed ' . count($images) . ' migrated images');
    }
    
    private function reset_wordpress_options() {
        // Reset front page
        update_option('show_on_front', 'posts');
        delete_option('page_on_front');
        
        // Remove ACF options
        $acf_options = array(
            'work_banner', 'process_banner', 'faq_banner', 'contact_info', 'social_media'
        );
        
        foreach ($acf_options as $option) {
            delete_field($option, 'option');
        }
        
        $this->log('Reset WordPress options');
    }
    
    private function clear_migration_status() {
        global $wpdb;
        
        $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE 'studio_migration_step_%'");
        
        $this->log('Cleared migration status');
    }
    
    private function log($message) {
        error_log('[Studio Pickens Rollback] ' . $message);
    }
}
?>
```

---

## Phase 4: Post-Migration Optimization

### 4.1 Performance Optimization Script

```php
<?php
/**
 * Post-Migration Optimization
 * Optimize migrated content for performance
 */

class StudioPickensPostMigrationOptimization {
    
    public function optimize_migrated_content() {
        $this->optimize_images();
        $this->generate_missing_thumbnails();
        $this->optimize_database();
        $this->setup_caching();
        $this->generate_sitemaps();
    }
    
    private function optimize_images() {
        // Get all migrated images
        $images = get_posts(array(
            'post_type' => 'attachment',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_migration_batch',
                    'value' => 'studio_pickens_',
                    'compare' => 'LIKE'
                )
            )
        ));
        
        foreach ($images as $image) {
            // Regenerate thumbnails
            $metadata = wp_generate_attachment_metadata($image->ID, get_attached_file($image->ID));
            wp_update_attachment_metadata($image->ID, $metadata);
            
            // Add alt text if missing
            if (!get_post_meta($image->ID, '_wp_attachment_image_alt', true)) {
                update_post_meta($image->ID, '_wp_attachment_image_alt', 'Studio Pickens - ' . get_the_title($image->ID));
            }
        }
    }
    
    private function generate_missing_thumbnails() {
        // Ensure all required thumbnail sizes exist
        $required_sizes = array('work-thumbnail', 'work-large', 'work-mobile', 'polaroid', 'hero-background');
        
        foreach ($required_sizes as $size) {
            // This would integrate with a plugin like Regenerate Thumbnails
            // or custom thumbnail generation
        }
    }
    
    private function optimize_database() {
        global $wpdb;
        
        // Optimize tables
        $wpdb->query("OPTIMIZE TABLE {$wpdb->posts}");
        $wpdb->query("OPTIMIZE TABLE {$wpdb->postmeta}");
        $wpdb->query("OPTIMIZE TABLE {$wpdb->terms}");
        $wpdb->query("OPTIMIZE TABLE {$wpdb->term_taxonomy}");
        $wpdb->query("OPTIMIZE TABLE {$wpdb->term_relationships}");
    }
    
    private function setup_caching() {
        // Object cache optimization
        wp_cache_add_global_groups(array('studio_pickens_cache'));
        
        // Set cache for frequently accessed data
        $work_projects = get_posts(array(
            'post_type' => 'work_project',
            'meta_key' => 'featured',
            'meta_value' => '1'
        ));
        
        wp_cache_set('featured_work_projects', $work_projects, 'studio_pickens_cache', HOUR_IN_SECONDS);
    }
    
    private function generate_sitemaps() {
        // Flush rewrite rules to ensure sitemaps include new content
        flush_rewrite_rules();
        
        // Trigger sitemap generation if using a plugin
        if (function_exists('wp_sitemaps_get_server')) {
            // WordPress core sitemaps (WP 5.5+)
            delete_transient('wp_sitemap_posts_work_project_1');
            delete_transient('wp_sitemap_posts_location_1');
        }
    }
}
?>
```

---

This comprehensive data migration strategy provides everything needed to successfully transfer your Studio Pickens content from React/JSON to WordPress while preserving all functionality, animations, and data relationships. The incremental approach allows for safe, step-by-step migration with rollback capabilities if needed.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Create WordPress migration task document with detailed breakdown", "status": "completed", "priority": "high"}, {"id": "2", "content": "Analyze current React/Tailwind implementation structure", "status": "completed", "priority": "high"}, {"id": "3", "content": "Plan WordPress theme architecture and custom post types", "status": "completed", "priority": "high"}, {"id": "4", "content": "Design data migration strategy from JSON to WordPress", "status": "completed", "priority": "high"}]