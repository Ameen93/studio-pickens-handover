# Studio Pickens WordPress Implementation Guide
## Step-by-Step Instructions for Migration

## Prerequisites

Before starting, ensure you have:
- WordPress development environment (Local, XAMPP, or similar)
- Advanced Custom Fields (ACF) Pro plugin
- Custom Post Type UI plugin
- Code editor (VS Code recommended)
- Git for version control

---

## Phase 1: WordPress Environment Setup

### Step 1.1: Install WordPress Locally
```bash
# Using Local by Flywheel (recommended)
1. Download Local from https://localwp.com/
2. Create new site: "studio-pickens-wp"
3. Choose preferred environment (latest PHP, MySQL, Nginx)
4. Set up SSL certificate for local HTTPS

# Alternative: Using XAMPP
1. Install XAMPP
2. Start Apache and MySQL
3. Create database "studio_pickens_wp"
4. Download WordPress, extract to htdocs/studio-pickens
```

### Step 1.2: Install Required Plugins
```bash
# Via WordPress admin:
1. Advanced Custom Fields Pro
2. Custom Post Type UI
3. WP Migrate DB (for deployment)
4. Yoast SEO (optional)

# Via Composer (advanced):
composer require wpackagist-plugin/advanced-custom-fields
```

### Step 1.3: Theme Setup
```bash
# Create theme directory
cd wp-content/themes/
mkdir studio-pickens
cd studio-pickens

# Create basic files
touch style.css
touch functions.php
touch index.php
mkdir assets js css images template-parts
```

### Step 1.4: Set Up Build Tools
```bash
# Initialize package.json
npm init -y

# Install Tailwind CSS and build tools
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer
npm install -D @babel/core @babel/preset-env babel-loader webpack webpack-cli

# Initialize Tailwind
npx tailwindcss init -p

# Create webpack.config.js (see below)
```

**webpack.config.js:**
```javascript
const path = require('path');

module.exports = {
  entry: {
    main: './assets/js/main.js',
    admin: './assets/js/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
```

---

## Phase 2: Theme Foundation

### Step 2.1: Basic Theme Files

**style.css:**
```css
/*
Theme Name: Studio Pickens
Description: Premium creative studio WordPress theme
Version: 1.0
Author: Your Name
*/

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Studio Pickens styles will be added here */
```

**functions.php:**
```php
<?php
// Theme setup
function studio_pickens_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list'));
    
    // Add image sizes
    add_image_size('work-thumbnail', 600, 400, true);
    add_image_size('work-large', 1200, 800, true);
    add_image_size('polaroid', 300, 300, false);
}
add_action('after_setup_theme', 'studio_pickens_setup');

// Enqueue styles and scripts
function studio_pickens_scripts() {
    wp_enqueue_style('studio-pickens-style', get_stylesheet_uri());
    wp_enqueue_style('tailwind', get_template_directory_uri() . '/dist/main.css');
    wp_enqueue_script('studio-pickens-js', get_template_directory_uri() . '/dist/main.bundle.js', array('jquery'), '1.0', true);
    
    // Localize script for AJAX
    wp_localize_script('studio-pickens-js', 'studio_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('studio_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'studio_pickens_scripts');
?>
```

### Step 2.2: Configure Tailwind

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    './*.php',
    './template-parts/*.php',
    './assets/js/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'studio-bg': '#F8F7F7',
        'studio-blue': '#0025B8',
        'studio-orange': '#FF7E46',
        'nav-blue': '#08249F'
      },
      fontFamily: {
        'proxima': ['proxima-nova', 'sans-serif'],
        'proxima-wide': ['proxima-nova-extra-wide', 'sans-serif'],
        'script': ['Lovtony', 'cursive']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}
```

---

## Phase 3: Custom Post Types & Fields

### Step 3.1: Register Custom Post Types

Add to **functions.php:**
```php
// Register Custom Post Types
function studio_pickens_post_types() {
    // Work Projects
    register_post_type('work_project', array(
        'public' => true,
        'labels' => array(
            'name' => 'Work Projects',
            'singular_name' => 'Work Project'
        ),
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'thumbnail'),
        'has_archive' => true,
        'rewrite' => array('slug' => 'work'),
        'show_in_rest' => true
    ));
    
    // Process Steps
    register_post_type('process_step', array(
        'public' => true,
        'labels' => array(
            'name' => 'Process Steps',
            'singular_name' => 'Process Step'
        ),
        'menu_icon' => 'dashicons-list-view',
        'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
        'hierarchical' => false,
        'show_in_rest' => true
    ));
    
    // Story Timeline
    register_post_type('story_element', array(
        'public' => true,
        'labels' => array(
            'name' => 'Story Elements',
            'singular_name' => 'Story Element'
        ),
        'menu_icon' => 'dashicons-clock',
        'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
        'show_in_rest' => true
    ));
    
    // Locations
    register_post_type('location', array(
        'public' => true,
        'labels' => array(
            'name' => 'Locations',
            'singular_name' => 'Location'
        ),
        'menu_icon' => 'dashicons-location',
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true
    ));
    
    // FAQs
    register_post_type('faq', array(
        'public' => true,
        'labels' => array(
            'name' => 'FAQs',
            'singular_name' => 'FAQ'
        ),
        'menu_icon' => 'dashicons-editor-help',
        'supports' => array('title', 'editor', 'page-attributes'),
        'show_in_rest' => true
    ));
}
add_action('init', 'studio_pickens_post_types');
```

### Step 3.2: Advanced Custom Fields Setup

**Work Project Fields (ACF JSON):**
```json
{
  "key": "group_work_project",
  "title": "Work Project Fields",
  "fields": [
    {
      "key": "field_client",
      "label": "Client",
      "name": "client",
      "type": "text"
    },
    {
      "key": "field_category", 
      "label": "Category",
      "name": "category",
      "type": "select",
      "choices": {
        "film_tv": "FILM & TV",
        "theatre": "THEATRE",
        "editorial": "EDITORIAL",
        "red_carpet": "RED CARPET"
      }
    },
    {
      "key": "field_year",
      "label": "Year",
      "name": "year",
      "type": "number"
    },
    {
      "key": "field_featured",
      "label": "Featured on Homepage",
      "name": "featured",
      "type": "true_false"
    },
    {
      "key": "field_mobile_image",
      "label": "Mobile Image",
      "name": "mobile_image",
      "type": "image"
    },
    {
      "key": "field_content_details",
      "label": "Content Details",
      "name": "content_details",
      "type": "group",
      "sub_fields": [
        {
          "key": "field_stylist",
          "label": "Hair Designer",
          "name": "stylist",
          "type": "text"
        },
        {
          "key": "field_photographer",
          "label": "Cast/Photographer",
          "name": "photographer", 
          "type": "text"
        },
        {
          "key": "field_network",
          "label": "Network/Publication",
          "name": "network",
          "type": "text"
        }
      ]
    }
  ],
  "location": [
    [
      {
        "param": "post_type",
        "operator": "==",
        "value": "work_project"
      }
    ]
  ]
}
```

### Step 3.3: Create ACF Field Groups via PHP

Add to **functions.php:**
```php
// Create ACF Fields programmatically
function studio_pickens_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        
        // Hero Section Fields
        acf_add_local_field_group(array(
            'key' => 'group_hero_section',
            'title' => 'Hero Section',
            'fields' => array(
                array(
                    'key' => 'field_hero_title',
                    'label' => 'Main Title',
                    'name' => 'hero_title',
                    'type' => 'text',
                    'default_value' => 'Studio Pickens'
                ),
                array(
                    'key' => 'field_hero_subtitle',
                    'label' => 'Subtitle',
                    'name' => 'hero_subtitle',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_atelier_title',
                    'label' => 'Atelier Title',
                    'name' => 'atelier_title',
                    'type' => 'text',
                    'default_value' => 'atelier wigs by robert pickens'
                ),
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
                            'type' => 'image'
                        ),
                        array(
                            'key' => 'field_transform_scale',
                            'label' => 'Scale',
                            'name' => 'transform_scale',
                            'type' => 'range',
                            'min' => 0.5,
                            'max' => 2,
                            'step' => 0.1,
                            'default_value' => 1
                        ),
                        array(
                            'key' => 'field_transform_x',
                            'label' => 'Translate X',
                            'name' => 'transform_x',
                            'type' => 'range',
                            'min' => -100,
                            'max' => 100,
                            'default_value' => 0
                        ),
                        array(
                            'key' => 'field_transform_y',
                            'label' => 'Translate Y',
                            'name' => 'transform_y',
                            'type' => 'range',
                            'min' => -100,
                            'max' => 100,
                            'default_value' => 0
                        )
                    )
                ),
                array(
                    'key' => 'field_polaroids',
                    'label' => 'Polaroids',
                    'name' => 'polaroids',
                    'type' => 'repeater',
                    'sub_fields' => array(
                        array(
                            'key' => 'field_polaroid_image',
                            'label' => 'Image',
                            'name' => 'image',
                            'type' => 'image'
                        ),
                        array(
                            'key' => 'field_polaroid_rotation',
                            'label' => 'Rotation',
                            'name' => 'rotation',
                            'type' => 'range',
                            'min' => -45,
                            'max' => 45,
                            'default_value' => 0
                        ),
                        array(
                            'key' => 'field_polaroid_position',
                            'label' => 'Position',
                            'name' => 'position',
                            'type' => 'group',
                            'sub_fields' => array(
                                array(
                                    'key' => 'field_pos_top',
                                    'label' => 'Top',
                                    'name' => 'top',
                                    'type' => 'text'
                                ),
                                array(
                                    'key' => 'field_pos_left',
                                    'label' => 'Left',
                                    'name' => 'left',
                                    'type' => 'text'
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
                )
            )
        ));
    }
}
add_action('acf/init', 'studio_pickens_acf_fields');
```

---

## Phase 4: Template Development

### Step 4.1: Main Templates

**index.php:**
```php
<?php get_header(); ?>

<main class="min-h-screen bg-studio-bg">
    <?php get_template_part('template-parts/hero'); ?>
    <?php get_template_part('template-parts/work-showcase'); ?>
    <?php get_template_part('template-parts/polaroid-grid'); ?>
</main>

<?php get_footer(); ?>
```

**header.php:**
```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php get_template_part('template-parts/navbar'); ?>
```

**footer.php:**
```php
<?php get_template_part('template-parts/footer-content'); ?>

<?php wp_footer(); ?>
</body>
</html>
```

### Step 4.2: Template Parts

**template-parts/navbar.php:**
```php
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="main-navbar">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-6 md:py-8">
            
            <!-- Left Navigation -->
            <div class="flex space-x-8 transition-all duration-500" id="nav-left">
                <a href="<?php echo home_url('/work'); ?>" class="nav-link">WORK</a>
                <a href="<?php echo home_url('/process'); ?>" class="nav-link">PROCESS</a>
                <a href="<?php echo home_url('/story'); ?>" class="nav-link">STORY</a>
            </div>
            
            <!-- Center Title (appears on scroll) -->
            <div class="absolute left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-500" id="nav-title">
                <a href="<?php echo home_url(); ?>" class="font-proxima-wide font-bold text-white text-lg tracking-wide uppercase">
                    Studio Pickens
                </a>
            </div>
            
            <!-- Right Navigation -->
            <div class="flex space-x-8 transition-all duration-500" id="nav-right">
                <a href="<?php echo home_url('/locations'); ?>" class="nav-link">LOCATIONS</a>
                <a href="<?php echo home_url('/contact'); ?>" class="nav-link">CONTACT</a>
                <a href="<?php echo home_url('/faq'); ?>" class="nav-link">FAQ</a>
            </div>
            
        </div>
    </div>
</nav>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('main-navbar');
    const navTitle = document.getElementById('nav-title');
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    
    let isScrolled = false;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const shouldShowTitle = scrollY > 100;
        
        if (shouldShowTitle && !isScrolled) {
            // Show title, adjust nav positions
            navTitle.style.opacity = '1';
            navLeft.style.transform = 'translateX(-20px)';
            navRight.style.transform = 'translateX(20px)';
            isScrolled = true;
        } else if (!shouldShowTitle && isScrolled) {
            // Hide title, reset nav positions
            navTitle.style.opacity = '0';
            navLeft.style.transform = 'translateX(0)';
            navRight.style.transform = 'translateX(0)';
            isScrolled = false;
        }
    });
});
</script>
```

**template-parts/hero.php:**
```php
<?php
$hero_title = get_field('hero_title') ?: 'Studio Pickens';
$hero_subtitle = get_field('hero_subtitle') ?: '';
$atelier_title = get_field('atelier_title') ?: 'atelier wigs by robert pickens';
$background_images = get_field('background_images');
$polaroids = get_field('polaroids');
?>

<section class="relative min-h-screen overflow-hidden" id="hero-section">
    
    <!-- Background Images -->
    <?php if ($background_images): ?>
        <?php foreach ($background_images as $index => $bg_image): ?>
            <div class="absolute inset-0 hero-bg-image" 
                 data-index="<?php echo $index; ?>"
                 style="transform: scale(<?php echo $bg_image['transform_scale']; ?>) 
                               translateX(<?php echo $bg_image['transform_x']; ?>px) 
                               translateY(<?php echo $bg_image['transform_y']; ?>px);">
                <?php echo wp_get_attachment_image($bg_image['image']['ID'], 'full', false, [
                    'class' => 'w-full h-full object-cover'
                ]); ?>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
    
    <!-- Hero Content -->
    <div class="relative z-10 flex items-center justify-center min-h-screen">
        <div class="text-center text-white">
            <h1 class="font-proxima-wide font-bold text-6xl md:text-8xl tracking-wide uppercase mb-4 hero-title" 
                id="hero-main-title">
                <?php echo esc_html($hero_title); ?>
            </h1>
            
            <?php if ($hero_subtitle): ?>
                <p class="font-proxima text-xl md:text-2xl mb-8 hero-subtitle">
                    <?php echo esc_html($hero_subtitle); ?>
                </p>
            <?php endif; ?>
            
            <p class="font-script text-3xl md:text-4xl hero-atelier">
                <?php echo esc_html($atelier_title); ?>
            </p>
        </div>
    </div>
    
    <!-- Polaroids -->
    <?php if ($polaroids): ?>
        <div class="absolute inset-0 pointer-events-none" id="polaroid-container">
            <?php foreach ($polaroids as $index => $polaroid): ?>
                <div class="absolute polaroid animate-float" 
                     style="top: <?php echo $polaroid['position']['top']; ?>; 
                            left: <?php echo $polaroid['position']['left']; ?>; 
                            transform: rotate(<?php echo $polaroid['rotation']; ?>deg); 
                            animation-delay: <?php echo ($index * 0.5); ?>s;">
                    <?php echo wp_get_attachment_image($polaroid['image']['ID'], 'polaroid', false, [
                        'class' => 'shadow-lg'
                    ]); ?>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
    
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.getElementById('hero-main-title');
    const heroSection = document.getElementById('hero-section');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = Math.min(scrollY / heroHeight, 1);
        
        // Fade out and scale down title on scroll
        const opacity = Math.max(1 - scrollProgress * 1.5, 0);
        const scale = Math.max(1 - scrollProgress * 0.3, 0.7);
        const translateY = scrollProgress * -50;
        
        heroTitle.style.opacity = opacity;
        heroTitle.style.transform = `translateY(${translateY}px) scale(${scale})`;
    });
});
</script>
```

---

## Phase 5: Work Gallery Implementation

### Step 5.1: Work Archive Template

**archive-work_project.php:**
```php
<?php get_header(); ?>

<main class="min-h-screen bg-studio-bg pt-24">
    
    <!-- Work Banner -->
    <section class="relative h-96 mb-12 overflow-hidden">
        <?php
        $banner_desktop = get_field('work_banner_desktop', 'option');
        $banner_mobile = get_field('work_banner_mobile', 'option');
        ?>
        
        <picture>
            <source media="(max-width: 768px)" srcset="<?php echo esc_url($banner_mobile['url']); ?>">
            <img src="<?php echo esc_url($banner_desktop['url']); ?>" 
                 alt="Selected Work" 
                 class="w-full h-full object-cover">
        </picture>
        
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-white">
                <h1 class="font-proxima-wide font-bold text-4xl md:text-6xl tracking-wide uppercase">
                    SELECTED WORK
                </h1>
            </div>
        </div>
    </section>
    
    <!-- Filter Navigation -->
    <div class="container mx-auto px-4 mb-8">
        <nav class="flex justify-center space-x-8 flex-wrap" id="work-filter">
            <button class="filter-btn active" data-filter="all">ALL</button>
            <button class="filter-btn" data-filter="film_tv">FILM & TV</button>
            <button class="filter-btn" data-filter="theatre">THEATRE</button>
            <button class="filter-btn" data-filter="editorial">EDITORIAL</button>
            <button class="filter-btn" data-filter="red_carpet">RED CARPET</button>
        </nav>
    </div>
    
    <!-- Work Grid -->
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="work-grid">
            
            <?php
            $work_projects = new WP_Query(array(
                'post_type' => 'work_project',
                'posts_per_page' => -1,
                'meta_key' => 'featured',
                'orderby' => 'meta_value_num date',
                'order' => 'DESC'
            ));
            
            if ($work_projects->have_posts()):
                while ($work_projects->have_posts()): $work_projects->the_post();
                    $category = get_field('category');
                    $client = get_field('client');
                    $year = get_field('year');
                    $mobile_image = get_field('mobile_image');
            ?>
            
            <article class="work-item" data-category="<?php echo esc_attr($category); ?>">
                <div class="relative overflow-hidden group cursor-pointer" onclick="openWorkModal(<?php echo get_the_ID(); ?>)">
                    
                    <!-- Desktop Image -->
                    <div class="hidden md:block">
                        <?php if (has_post_thumbnail()): ?>
                            <?php the_post_thumbnail('work-large', ['class' => 'w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105']); ?>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Mobile Image -->
                    <div class="block md:hidden">
                        <?php if ($mobile_image): ?>
                            <?php echo wp_get_attachment_image($mobile_image['ID'], 'work-large', false, ['class' => 'w-full h-80 object-cover']); ?>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div class="text-center text-white">
                            <h3 class="font-proxima-wide font-bold text-xl tracking-wide uppercase mb-2">
                                <?php the_title(); ?>
                            </h3>
                            <p class="font-proxima text-sm">
                                <?php echo esc_html($client); ?> • <?php echo esc_html($year); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            
            <?php endwhile; wp_reset_postdata(); endif; ?>
        </div>
    </div>
    
    <!-- Work Modal -->
    <div id="work-modal" class="fixed inset-0 z-50 hidden bg-black bg-opacity-90 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div id="modal-content">
                        <!-- Content loaded dynamically -->
                    </div>
                    <button onclick="closeWorkModal()" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            workItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Modal functions
function openWorkModal(postId) {
    const modal = document.getElementById('work-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Load content via AJAX
    fetch(`${studio_ajax.ajax_url}?action=get_work_modal&post_id=${postId}&nonce=${studio_ajax.nonce}`)
        .then(response => response.text())
        .then(html => {
            modalContent.innerHTML = html;
        });
}

function closeWorkModal() {
    document.getElementById('work-modal').classList.add('hidden');
}
</script>

<?php get_footer(); ?>
```

### Step 5.2: AJAX Handler for Work Modal

Add to **functions.php:**
```php
// AJAX handler for work modal
function get_work_modal_content() {
    check_ajax_referer('studio_nonce', 'nonce');
    
    $post_id = intval($_GET['post_id']);
    $post = get_post($post_id);
    
    if (!$post || $post->post_type !== 'work_project') {
        wp_die();
    }
    
    $client = get_field('client', $post_id);
    $category = get_field('category', $post_id);
    $year = get_field('year', $post_id);
    $content_details = get_field('content_details', $post_id);
    
    ?>
    <div class="work-modal-content">
        <div class="mb-4">
            <?php echo get_the_post_thumbnail($post_id, 'work-large', ['class' => 'w-full h-64 object-cover rounded']); ?>
        </div>
        
        <h2 class="font-proxima-wide font-bold text-2xl tracking-wide uppercase mb-2">
            <?php echo esc_html($post->post_title); ?>
        </h2>
        
        <div class="text-studio-blue mb-4">
            <p><strong>Client:</strong> <?php echo esc_html($client); ?></p>
            <p><strong>Category:</strong> <?php echo esc_html($category); ?></p>
            <p><strong>Year:</strong> <?php echo esc_html($year); ?></p>
        </div>
        
        <?php if ($content_details): ?>
            <div class="border-t pt-4">
                <?php if ($content_details['stylist']): ?>
                    <p><strong>Hair Designer:</strong> <?php echo esc_html($content_details['stylist']); ?></p>
                <?php endif; ?>
                
                <?php if ($content_details['photographer']): ?>
                    <p><strong>Cast:</strong> <?php echo esc_html($content_details['photographer']); ?></p>
                <?php endif; ?>
                
                <?php if ($content_details['network']): ?>
                    <p><strong>Network:</strong> <?php echo esc_html($content_details['network']); ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>
        
        <div class="mt-4">
            <?php echo apply_filters('the_content', $post->post_content); ?>
        </div>
    </div>
    <?php
    
    wp_die();
}
add_action('wp_ajax_get_work_modal', 'get_work_modal_content');
add_action('wp_ajax_nopriv_get_work_modal', 'get_work_modal_content');
```

---

## Phase 6: Process Page Implementation

### Step 6.1: Process Page Template

**page-process.php:**
```php
<?php get_header(); ?>

<main class="min-h-screen bg-studio-bg pt-24">
    
    <!-- Process Banner -->
    <section class="relative h-96 mb-16 overflow-hidden">
        <?php
        $banner_desktop = get_field('process_banner_desktop', 'option');
        $banner_mobile = get_field('process_banner_mobile', 'option');
        ?>
        
        <picture>
            <source media="(max-width: 768px)" srcset="<?php echo esc_url($banner_mobile['url']); ?>">
            <img src="<?php echo esc_url($banner_desktop['url']); ?>" 
                 alt="Process" 
                 class="w-full h-full object-cover">
        </picture>
        
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center text-white">
                <h1 class="font-proxima-wide font-bold text-4xl md:text-6xl tracking-wide uppercase">
                    PROCESS
                </h1>
            </div>
        </div>
    </section>
    
    <!-- Process Steps -->
    <div class="container mx-auto px-4">
        <?php
        $process_steps = new WP_Query(array(
            'post_type' => 'process_step',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC'
        ));
        
        if ($process_steps->have_posts()):
            $step_count = 0;
            while ($process_steps->have_posts()): $process_steps->the_post();
                $step_count++;
                $alignment = get_field('alignment') ?: 'left';
                $step_image = get_field('step_image');
        ?>
        
        <div class="process-step mb-24 <?php echo ($step_count % 2 == 0) ? 'lg:flex-row-reverse' : ''; ?>" 
             data-step="<?php echo $step_count; ?>">
            <div class="flex flex-col lg:flex-row items-center gap-12">
                
                <!-- Content -->
                <div class="lg:w-1/2">
                    <div class="step-number font-proxima-wide font-bold text-6xl text-studio-blue mb-4">
                        <?php echo sprintf('%02d', $step_count); ?>
                    </div>
                    
                    <h2 class="font-proxima-wide font-bold text-2xl md:text-3xl text-studio-blue mb-6 tracking-wide uppercase">
                        <?php the_title(); ?>
                    </h2>
                    
                    <div class="font-proxima text-lg text-gray-700 leading-relaxed">
                        <?php the_content(); ?>
                    </div>
                </div>
                
                <!-- Image -->
                <div class="lg:w-1/2">
                    <?php if ($step_image): ?>
                        <div class="relative">
                            <?php echo wp_get_attachment_image($step_image['ID'], 'large', false, [
                                'class' => 'w-full h-80 object-cover rounded-lg shadow-lg'
                            ]); ?>
                            
                            <!-- Decorative Circle -->
                            <div class="absolute -top-4 -right-4 w-16 h-16 border-4 border-studio-orange rounded-full opacity-70"></div>
                        </div>
                    <?php endif; ?>
                </div>
                
            </div>
        </div>
        
        <?php endwhile; wp_reset_postdata(); endif; ?>
    </div>
    
    <!-- Process Timeline (Visual Enhancement) -->
    <div class="fixed right-8 top-1/2 transform -translate-y-1/2 hidden lg:block" id="process-timeline">
        <div class="flex flex-col space-y-4">
            <?php for ($i = 1; $i <= $step_count; $i++): ?>
                <div class="timeline-dot w-3 h-3 rounded-full border-2 border-studio-blue cursor-pointer transition-all duration-300" 
                     data-step="<?php echo $i; ?>"></div>
            <?php endfor; ?>
        </div>
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300" id="timeline-line"></div>
    </div>
    
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    // Intersection Observer for step animations
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.dataset.step;
                
                // Animate step
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Update timeline
                timelineDots.forEach((dot, index) => {
                    if (index + 1 <= stepNumber) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        stepObserver.observe(step);
    });
    
    // Timeline dot click handlers
    timelineDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const stepNumber = this.dataset.step;
            const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
            
            if (targetStep) {
                targetStep.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
});
</script>

<style>
.timeline-dot.active {
    background-color: #0025B8;
    transform: scale(1.2);
}
</style>

<?php get_footer(); ?>
```

---

## Phase 7: Data Migration Scripts

### Step 7.1: JSON to WordPress Migration Script

Create **migrate-data.php:**
```php
<?php
/**
 * Studio Pickens Data Migration Script
 * Run this script once to migrate JSON data to WordPress
 */

// Include WordPress
require_once('wp-config.php');

class StudioPickensMigration {
    
    private $data_dir;
    
    public function __construct() {
        $this->data_dir = get_template_directory() . '/data/';
    }
    
    public function migrate_all() {
        $this->migrate_hero_data();
        $this->migrate_work_projects();
        $this->migrate_process_steps();
        $this->migrate_story_elements();
        $this->migrate_locations();
        $this->migrate_faqs();
        $this->migrate_contact_info();
        
        echo "Migration completed successfully!\n";
    }
    
    private function migrate_hero_data() {
        echo "Migrating hero data...\n";
        
        $hero_json = file_get_contents($this->data_dir . 'hero.json');
        $hero_data = json_decode($hero_json, true);
        
        // Get or create homepage
        $homepage = get_page_by_path('home');
        if (!$homepage) {
            $homepage_id = wp_insert_post(array(
                'post_title' => 'Home',
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_name' => 'home'
            ));
        } else {
            $homepage_id = $homepage->ID;
        }
        
        // Set as front page
        update_option('page_on_front', $homepage_id);
        update_option('show_on_front', 'page');
        
        // Save hero fields
        update_field('hero_title', $hero_data['title'], $homepage_id);
        update_field('hero_subtitle', $hero_data['subtitle'], $homepage_id);
        update_field('atelier_title', $hero_data['atelierTitle'], $homepage_id);
        
        // Migrate background images
        if (isset($hero_data['backgroundImages'])) {
            $bg_images = array();
            
            foreach ($hero_data['backgroundImages'] as $bg_img) {
                $image_id = $this->import_image($bg_img['image']);
                
                if ($image_id) {
                    $bg_images[] = array(
                        'image' => $image_id,
                        'transform_scale' => $bg_img['transform']['scale'] ?? 1,
                        'transform_x' => $bg_img['transform']['translateX'] ?? 0,
                        'transform_y' => $bg_img['transform']['translateY'] ?? 0
                    );
                }
            }
            
            update_field('background_images', $bg_images, $homepage_id);
        }
        
        // Migrate polaroids
        if (isset($hero_data['polaroids'])) {
            $polaroids = array();
            
            foreach ($hero_data['polaroids'] as $polaroid) {
                $image_id = $this->import_image($polaroid['image']);
                
                if ($image_id) {
                    $polaroids[] = array(
                        'image' => $image_id,
                        'rotation' => $polaroid['rotation'] ?? 0,
                        'position' => array(
                            'top' => $polaroid['position']['top'] ?? '50%',
                            'left' => $polaroid['position']['left'] ?? '50%'
                        )
                    );
                }
            }
            
            update_field('polaroids', $polaroids, $homepage_id);
        }
    }
    
    private function migrate_work_projects() {
        echo "Migrating work projects...\n";
        
        $work_json = file_get_contents($this->data_dir . 'work.json');
        $work_data = json_decode($work_json, true);
        
        // Migrate banner data to options
        if (isset($work_data['banner'])) {
            $desktop_banner = $this->import_image($work_data['banner']['desktopImage']);
            $mobile_banner = $this->import_image($work_data['banner']['mobileImage']);
            
            update_field('work_banner_desktop', $desktop_banner, 'option');
            update_field('work_banner_mobile', $mobile_banner, 'option');
        }
        
        // Migrate projects
        if (isset($work_data['projects'])) {
            foreach ($work_data['projects'] as $project) {
                $post_id = wp_insert_post(array(
                    'post_title' => $project['title'],
                    'post_content' => $project['description'] ?? '',
                    'post_status' => 'publish',
                    'post_type' => 'work_project',
                    'menu_order' => $project['order'] ?? 0
                ));
                
                if ($post_id) {
                    // Set featured image
                    $featured_image = $this->import_image($project['image']);
                    if ($featured_image) {
                        set_post_thumbnail($post_id, $featured_image);
                    }
                    
                    // Set custom fields
                    update_field('client', $project['client'], $post_id);
                    update_field('category', $project['category'], $post_id);
                    update_field('year', $project['year'], $post_id);
                    update_field('featured', $project['featured'] ?? false, $post_id);
                    
                    // Mobile image
                    if (isset($project['mobileImage'])) {
                        $mobile_image = $this->import_image($project['mobileImage']);
                        update_field('mobile_image', $mobile_image, $post_id);
                    }
                    
                    // Content details
                    if (isset($project['content'])) {
                        update_field('content_details', array(
                            'stylist' => $project['content']['stylist'] ?? '',
                            'photographer' => $project['content']['photographer'] ?? '',
                            'network' => $project['content']['date'] ?? ''
                        ), $post_id);
                    }
                }
            }
        }
    }
    
    private function migrate_process_steps() {
        echo "Migrating process steps...\n";
        
        $process_json = file_get_contents($this->data_dir . 'process.json');
        $process_data = json_decode($process_json, true);
        
        // Migrate banner
        if (isset($process_data['banner'])) {
            $desktop_banner = $this->import_image($process_data['banner']['desktopImage']);
            $mobile_banner = $this->import_image($process_data['banner']['mobileImage']);
            
            update_field('process_banner_desktop', $desktop_banner, 'option');
            update_field('process_banner_mobile', $mobile_banner, 'option');
        }
        
        // Migrate process steps
        if (isset($process_data['processSteps'])) {
            foreach ($process_data['processSteps'] as $step) {
                $post_id = wp_insert_post(array(
                    'post_title' => $step['title'],
                    'post_content' => $step['description'],
                    'post_status' => 'publish',
                    'post_type' => 'process_step',
                    'menu_order' => $step['order']
                ));
                
                if ($post_id) {
                    // Step image
                    if (isset($step['image'])) {
                        $step_image = $this->import_image($step['image']);
                        update_field('step_image', $step_image, $post_id);
                    }
                    
                    update_field('alignment', $step['alignment'] ?? 'left', $post_id);
                }
            }
        }
    }
    
    private function migrate_locations() {
        echo "Migrating locations...\n";
        
        $locations_json = file_get_contents($this->data_dir . 'locations.json');
        $locations_data = json_decode($locations_json, true);
        
        if (isset($locations_data['locations'])) {
            foreach ($locations_data['locations'] as $location) {
                if (!$location['visible']) continue;
                
                $post_id = wp_insert_post(array(
                    'post_title' => $location['name'],
                    'post_status' => 'publish',
                    'post_type' => 'location',
                    'menu_order' => $location['order']
                ));
                
                if ($post_id) {
                    // Location image
                    if (isset($location['image'])) {
                        $location_image = $this->import_image($location['image']);
                        set_post_thumbnail($post_id, $location_image);
                    }
                    
                    update_field('address', $location['address'], $post_id);
                    update_field('maps_url', $location['mapsUrl'], $post_id);
                    update_field('variant', $location['variant'], $post_id);
                }
            }
        }
    }
    
    private function migrate_faqs() {
        echo "Migrating FAQs...\n";
        
        $faq_json = file_get_contents($this->data_dir . 'faq.json');
        $faq_data = json_decode($faq_json, true);
        
        // Migrate banner
        if (isset($faq_data['banner'])) {
            $desktop_banner = $this->import_image($faq_data['banner']['backgroundImage']['desktop']);
            update_field('faq_banner', $desktop_banner, 'option');
        }
        
        // Migrate FAQ items
        if (isset($faq_data['items'])) {
            foreach ($faq_data['items'] as $faq) {
                $post_id = wp_insert_post(array(
                    'post_title' => $faq['question'],
                    'post_content' => $faq['answer'],
                    'post_status' => 'publish',
                    'post_type' => 'faq',
                    'menu_order' => $faq['order']
                ));
                
                if ($post_id) {
                    update_field('category', $faq['category'] ?? 'general', $post_id);
                }
            }
        }
    }
    
    private function migrate_contact_info() {
        echo "Migrating contact info...\n";
        
        $contact_json = file_get_contents($this->data_dir . 'contact.json');
        $contact_data = json_decode($contact_json, true);
        
        // Save as options
        update_field('contact_emails', $contact_data['emails'], 'option');
        update_field('contact_phone', $contact_data['phone'], 'option');
    }
    
    private function import_image($image_path) {
        if (empty($image_path)) return false;
        
        // Remove leading slash if present
        $image_path = ltrim($image_path, '/');
        $local_path = get_template_directory() . '/' . $image_path;
        
        if (!file_exists($local_path)) {
            echo "Image not found: {$local_path}\n";
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
            )
        ));
        
        if (!empty($existing)) {
            return $existing[0]->ID;
        }
        
        // Import image
        $file_info = wp_check_filetype($local_path);
        $upload_dir = wp_upload_dir();
        
        $new_filename = basename($local_path);
        $new_path = $upload_dir['path'] . '/' . $new_filename;
        
        // Copy file
        copy($local_path, $new_path);
        
        // Create attachment
        $attachment_id = wp_insert_attachment(array(
            'post_mime_type' => $file_info['type'],
            'post_title' => sanitize_file_name(pathinfo($new_filename, PATHINFO_FILENAME)),
            'post_content' => '',
            'post_status' => 'inherit'
        ), $new_path);
        
        if ($attachment_id) {
            // Generate thumbnails
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            $attach_data = wp_generate_attachment_metadata($attachment_id, $new_path);
            wp_update_attachment_metadata($attachment_id, $attach_data);
            
            // Save original path for reference
            update_post_meta($attachment_id, '_original_path', $image_path);
            
            return $attachment_id;
        }
        
        return false;
    }
}

// Run migration
if (php_sapi_name() === 'cli') {
    $migration = new StudioPickensMigration();
    $migration->migrate_all();
} else {
    echo "This script can only be run from command line for security reasons.";
}
?>
```

### Step 7.2: Run Migration

```bash
# Navigate to WordPress root
cd /path/to/your/wordpress

# Run migration script
php migrate-data.php

# Alternatively, create a WordPress admin page for migration
# Add this to functions.php for one-time use:
```

Add to **functions.php** (temporary, remove after migration):
```php
// Admin page for migration (remove after use)
function studio_pickens_migration_page() {
    add_management_page(
        'Studio Pickens Migration',
        'Migrate Data',
        'manage_options',
        'studio-migration',
        'studio_migration_page_content'
    );
}
add_action('admin_menu', 'studio_pickens_migration_page');

function studio_migration_page_content() {
    if (isset($_POST['migrate'])) {
        // Run migration (copy migration class here)
        echo '<div class="notice notice-success"><p>Migration completed!</p></div>';
    }
    
    ?>
    <div class="wrap">
        <h1>Studio Pickens Data Migration</h1>
        <form method="post">
            <p>This will migrate all JSON data to WordPress custom posts and fields.</p>
            <p><strong>Warning:</strong> This should only be run once. It will create duplicate content if run multiple times.</p>
            <p class="submit">
                <input type="submit" name="migrate" class="button-primary" value="Start Migration" onclick="return confirm('Are you sure you want to start the migration? This cannot be undone.');">
            </p>
        </form>
    </div>
    <?php
}
```

---

## Phase 8: Advanced Features & Optimization

### Step 8.1: Performance Optimization

Add to **functions.php:**
```php
// Performance optimizations
function studio_pickens_performance() {
    // Remove unnecessary WordPress features
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    
    // Optimize images
    add_filter('jpeg_quality', function() { return 85; });
    
    // Enable Gzip compression
    if (!ob_get_level()) {
        ob_start('ob_gzhandler');
    }
}
add_action('init', 'studio_pickens_performance');

// Lazy load images
function add_lazy_loading($content) {
    $content = str_replace('<img', '<img loading="lazy"', $content);
    return $content;
}
add_filter('the_content', 'add_lazy_loading');

// Critical CSS
function studio_pickens_critical_css() {
    echo '<style>
    .hero-section { min-height: 100vh; }
    .nav-link { transition: all 0.3s ease; }
    .work-item { transition: transform 0.3s ease; }
    </style>';
}
add_action('wp_head', 'studio_pickens_critical_css', 1);
```

### Step 8.2: SEO and Schema Markup

Add to **functions.php:**
```php
// Schema markup for work projects
function add_work_project_schema() {
    if (is_singular('work_project')) {
        global $post;
        $client = get_field('client');
        $year = get_field('year');
        $category = get_field('category');
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'CreativeWork',
            'name' => get_the_title(),
            'description' => get_the_excerpt(),
            'creator' => array(
                '@type' => 'Organization',
                'name' => 'Studio Pickens'
            ),
            'dateCreated' => $year,
            'client' => $client,
            'category' => $category
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
    }
}
add_action('wp_head', 'add_work_project_schema');
```

---

## Phase 9: Testing & Quality Assurance

### Step 9.1: Create Testing Checklist

**testing-checklist.md:**
```markdown
# Studio Pickens WordPress Testing Checklist

## Functionality Testing
- [ ] Navigation scroll animation works correctly
- [ ] Hero section displays all elements (title, subtitle, polaroids)
- [ ] Work gallery filtering functions properly
- [ ] Work modal opens and displays correct content
- [ ] Process page timeline animations work
- [ ] Story page interactions function correctly
- [ ] Contact form submits successfully
- [ ] FAQ accordions expand/collapse properly
- [ ] All images load correctly with proper alt text

## Responsive Design Testing
- [ ] Mobile navigation works properly
- [ ] Hero section scales correctly on all screen sizes
- [ ] Work gallery adapts to mobile layout
- [ ] Process steps stack vertically on mobile
- [ ] Typography scales appropriately
- [ ] Images maintain aspect ratios
- [ ] Touch targets are minimum 44px on mobile

## Performance Testing
- [ ] Page load time under 3 seconds
- [ ] Images are properly optimized
- [ ] CSS/JS files are minified
- [ ] Lazy loading works for images
- [ ] No JavaScript errors in console
- [ ] Smooth scrolling performance
- [ ] Animation performance on low-end devices

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest) 
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Android Chrome

## Content Management Testing
- [ ] Admin can edit hero section content
- [ ] Work projects can be added/edited/deleted
- [ ] Process steps can be reordered
- [ ] Image uploads work correctly
- [ ] Custom fields save properly
- [ ] Live preview updates correctly

## SEO Testing
- [ ] Meta titles and descriptions are set
- [ ] Schema markup is present
- [ ] Images have proper alt attributes
- [ ] URLs are SEO-friendly
- [ ] Sitemap generates correctly
- [ ] Social media meta tags present
```

### Step 9.2: Deployment Script

**deploy.sh:**
```bash
#!/bin/bash

# Studio Pickens WordPress Deployment Script

echo "Starting Studio Pickens deployment..."

# Build assets
echo "Building Tailwind CSS..."
npm run build

# Optimize images
echo "Optimizing images..."
find ./images -name "*.jpg" -exec jpegoptim --max=85 {} \;
find ./images -name "*.png" -exec optipng -o2 {} \;

# Create deployment package
echo "Creating deployment package..."
tar -czf studio-pickens-theme.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=src \
    --exclude=*.md \
    .

echo "Deployment package created: studio-pickens-theme.tar.gz"

# Upload to staging (customize for your hosting)
# scp studio-pickens-theme.tar.gz user@staging-server:/path/to/wordpress/wp-content/themes/

echo "Deployment script completed!"
```

---

## Final Implementation Steps

### Step 10.1: Go Live Checklist

1. **Backup Original Site**
   ```bash
   # Create full backup
   wp db export studio-pickens-backup.sql
   tar -czf studio-pickens-react-backup.tar.gz /path/to/react-site
   ```

2. **DNS and SSL Configuration**
   - Point domain to WordPress hosting
   - Install SSL certificate
   - Test HTTPS redirects

3. **Final Testing**
   - Run full testing checklist
   - Performance audit with tools like GTmetrix
   - Cross-browser testing
   - Mobile device testing

4. **Launch Day Tasks**
   - Deploy theme to production
   - Run data migration
   - Set up monitoring
   - Update CDN settings (if applicable)

### Step 10.2: Post-Launch Monitoring

**monitoring.php** (add to functions.php):
```php
// Error logging
function studio_pickens_error_handler($errno, $errstr, $errfile, $errline) {
    $error_message = "Error: [$errno] $errstr - $errfile:$errline";
    error_log($error_message, 3, get_template_directory() . '/error.log');
    return true;
}
set_error_handler('studio_pickens_error_handler');

// Performance monitoring
function studio_pickens_performance_log() {
    if (current_user_can('administrator') && isset($_GET['debug'])) {
        $queries = get_num_queries();
        $memory = memory_get_peak_usage(true) / 1024 / 1024;
        $time = timer_stop(0);
        
        echo "<!-- Performance: {$queries} queries, {$memory}MB memory, {$time}s -->";
    }
}
add_action('wp_footer', 'studio_pickens_performance_log');
```

---

This comprehensive implementation guide provides step-by-step instructions for migrating your Studio Pickens React site to WordPress while maintaining all functionality, animations, and premium user experience. Each phase builds upon the previous one, ensuring a systematic and successful migration process.

Remember to test each phase thoroughly before proceeding to the next, and maintain regular backups throughout the process.