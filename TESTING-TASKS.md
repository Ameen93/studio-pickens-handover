# Studio Pickens Admin Panel - Comprehensive Testing Plan

## 🎯 Testing Overview
**Objective**: Verify all admin panel functionality works correctly before implementing authentication
**Total Test Cases**: 156 individual tests across 7 editors
**Estimated Time**: 2-3 hours for complete testing

---

## 🧪 **PHASE 1: HERO EDITOR TESTING**

### [ ] **1.1 Hero Editor Access & Layout**
- [ ] Navigate to `/admin` and verify admin panel loads
- [ ] Click "Hero" in sidebar navigation
- [ ] Verify Hero editor loads with current data
- [ ] Confirm live preview pane shows hero section
- [ ] Test responsive preview modes (4K, Full HD, Mobile Portrait/Landscape)

### [ ] **1.2 Text Field Functionality**
- [ ] **Title Field**: Edit title, verify changes save and appear in preview
- [ ] **Subtitle Field**: Edit subtitle, verify changes save and appear in preview
- [ ] **Atelier Title**: Edit atelier title, verify changes save and appear in preview
- [ ] **Atelier Description**: Edit atelier description, verify changes save and appear in preview
- [ ] **Character Limits**: Test long text inputs for proper handling
- [ ] **Special Characters**: Test unicode, emojis, and special characters

### [ ] **1.3 Banner Controls**
- [ ] **Logo Size Scale**: Test range 0.5x-3x, verify visual changes in preview
- [ ] **Title Size Scale**: Test range 0.5x-3x, verify visual changes in preview
- [ ] **Responsive Behavior**: Test banner controls on different preview sizes
- [ ] **Edge Cases**: Test minimum/maximum values

### [ ] **1.4 Background Images**
- [ ] **Image Upload**: Upload new background image, verify it saves
- [ ] **Alt Text**: Add/edit alt text for accessibility
- [ ] **Transform Controls**: Test scale, translateX, translateY sliders
- [ ] **Flip Controls**: Test horizontal/vertical flip toggles
- [ ] **Image Browser**: Browse and select existing images
- [ ] **Manual Path**: Test manual image path input
- [ ] **Invalid Images**: Test handling of invalid image formats/paths

### [ ] **1.5 Polaroid Images**
- [ ] **Upload Polaroid 1**: Upload image, verify it appears in preview
- [ ] **Upload Polaroid 2**: Upload image, verify it appears in preview
- [ ] **Upload Polaroid 3**: Upload image, verify it appears in preview
- [ ] **Alt Text**: Add alt text to each polaroid
- [ ] **Rotation Controls**: Test rotation range -45° to 45° for each polaroid
- [ ] **Position Verification**: Verify polaroids maintain position after rotation

### [ ] **1.6 Data Persistence**
- [ ] **Save Functionality**: Make changes and verify they persist after page refresh
- [ ] **API Integration**: Verify PUT /api/hero endpoint is called on save
- [ ] **Error Handling**: Test save with invalid data
- [ ] **Loading States**: Verify loading indicators work correctly

---

## 🧪 **PHASE 2: WORK EDITOR TESTING**

### [ ] **2.1 Work Editor Access & Layout**
- [ ] Navigate to "Work" section in admin panel
- [ ] Verify work editor loads with current data
- [ ] Confirm live preview shows work page
- [ ] Test responsive preview modes

### [ ] **2.2 Work Banner**
- [ ] **Banner Title**: Edit title, verify changes save
- [ ] **Banner Subtitle**: Edit subtitle, verify changes save
- [ ] **Desktop Background**: Upload/select desktop background image
- [ ] **Mobile Background**: Upload/select mobile background image
- [ ] **Transform Controls**: Test scale, translateX, translateY for both images
- [ ] **Object Position**: Test all position presets (center, top, bottom, left, right)
- [ ] **Responsive Preview**: Verify desktop/mobile images display correctly

### [ ] **2.3 Work Projects Management**
- [ ] **View Projects**: Verify existing projects load correctly
- [ ] **Add New Project**: Create new work project with all fields
- [ ] **Edit Project**: Modify existing project details
- [ ] **Delete Project**: Remove project and verify it's deleted
- [ ] **Project Fields**: Test title, client, category, year, image upload
- [ ] **Categories**: Test all category options (EDITORIAL, FILM & TV, THEATRE, CONCERT, MUSIC VIDEO, LIVE)
- [ ] **Project Images**: Upload and verify project images appear

### [ ] **2.4 Section Banners**
- [ ] **Category Banners**: Test editing banners for each category
- [ ] **Banner Images**: Upload/select images for section banners
- [ ] **Transform Controls**: Test scale, translateX, translateY for section banners
- [ ] **Object Position**: Test positioning for section banners
- [ ] **Category Association**: Verify banners associate with correct categories

### [ ] **2.5 Data Persistence & API**
- [ ] **Save Projects**: Verify project data persists after refresh
- [ ] **API Endpoints**: Test GET/PUT/POST/DELETE /api/work endpoints
- [ ] **Error Handling**: Test invalid project data
- [ ] **Loading States**: Verify loading indicators work

---

## 🧪 **PHASE 3: PROCESS EDITOR TESTING**

### [ ] **3.1 Process Editor Access & Layout**
- [ ] Navigate to "Process" section in admin panel
- [ ] Verify process editor loads with current data
- [ ] Confirm live preview shows process page
- [ ] Test responsive preview modes

### [ ] **3.2 Process Banner**
- [ ] **Banner Title**: Edit title, verify changes save
- [ ] **Banner Subtitle**: Edit subtitle, verify changes save
- [ ] **Desktop Background**: Upload/select desktop background image
- [ ] **Mobile Background**: Upload/select mobile background image
- [ ] **Transform Controls**: Test scale, translateX, translateY
- [ ] **Object Position**: Test position presets
- [ ] **Circle Scale**: Test banner circle size controls
- [ ] **Heading Scale**: Test responsive heading size controls

### [ ] **3.3 Process Steps Management**
- [ ] **View Steps**: Verify existing process steps load
- [ ] **Add New Step**: Create new process step with all fields
- [ ] **Edit Step**: Modify existing step details
- [ ] **Delete Step**: Remove step and verify deletion
- [ ] **Step Fields**: Test title, description, image, alt text
- [ ] **Alignment**: Test left/right alignment for steps
- [ ] **Step Images**: Upload and verify step images
- [ ] **Step Ordering**: Test step sequence/ordering

### [ ] **3.4 Team Circles Configuration**
- [ ] **Circle Size**: Test team circle size scale controls
- [ ] **Stroke Width**: Test circle stroke width adjustment
- [ ] **Gap Controls**: Test gap between circles
- [ ] **Position Controls**: Test circle positioning
- [ ] **Responsive Behavior**: Verify circles adapt to screen size

### [ ] **3.5 Data Persistence & API**
- [ ] **Save Process Data**: Verify data persists after refresh
- [ ] **API Endpoints**: Test GET/PUT /api/process endpoints
- [ ] **Step API**: Test POST/PUT/DELETE /api/process/steps endpoints
- [ ] **Error Handling**: Test invalid process data
- [ ] **Loading States**: Verify loading indicators work

---

## 🧪 **PHASE 4: STORY EDITOR TESTING**

### [ ] **4.1 Story Editor Access & Layout**
- [ ] Navigate to "Story" section in admin panel
- [ ] Verify story editor loads with current data
- [ ] Confirm live preview shows story page
- [ ] Test responsive preview modes

### [ ] **4.2 Story Circles Management**
- [ ] **Circle Types**: Test simple, dashed_rotating, mixed circle types
- [ ] **Circle Content**: Edit circle title and description
- [ ] **Add Circle**: Create new story circle
- [ ] **Delete Circle**: Remove circle and verify deletion
- [ ] **Circle Ordering**: Test circle sequence/ordering

### [ ] **4.3 Circle Items Management**
- [ ] **Polaroid Items**: Add polaroid with image, alt text, year
- [ ] **Text Items**: Add text with content, font selection, rotation
- [ ] **Button Items**: Add button with text and action
- [ ] **Item Ordering**: Test item sequence within circles
- [ ] **Delete Items**: Remove items and verify deletion
- [ ] **Item Types**: Verify all item types render correctly

### [ ] **4.4 Positioning Controls**
- [ ] **Desktop Position**: Test top, left, bottom, right positioning
- [ ] **Mobile Position**: Test responsive positioning controls
- [ ] **Transform Controls**: Test scale, translateX, translateY
- [ ] **Rotation Controls**: Test text rotation functionality
- [ ] **Font Controls**: Test font selection and size for text items
- [ ] **Responsive Behavior**: Verify positioning works across screen sizes

### [ ] **4.5 Visibility Controls**
- [ ] **Desktop Visibility**: Test desktop show/hide controls
- [ ] **Mobile Visibility**: Test mobile show/hide controls
- [ ] **Conditional Display**: Verify items display only when enabled
- [ ] **Responsive Preview**: Test visibility in different preview modes

### [ ] **4.6 Data Persistence & API**
- [ ] **Save Story Data**: Verify data persists after refresh
- [ ] **API Endpoints**: Test GET/PUT /api/story endpoints
- [ ] **Complex Data**: Test saving complex circle/item structures
- [ ] **Error Handling**: Test invalid story data
- [ ] **Loading States**: Verify loading indicators work

---

## 🧪 **PHASE 5: LOCATIONS EDITOR TESTING**

### [ ] **5.1 Locations Editor Access & Layout**
- [ ] Navigate to "Locations" section in admin panel
- [ ] Verify locations editor loads with current data
- [ ] Confirm live preview shows locations page
- [ ] Test responsive preview modes

### [ ] **5.2 Locations Banner**
- [ ] **Banner Title**: Edit title, verify changes save
- [ ] **Animation Settings**: Test delay, duration, circle count controls
- [ ] **Animation Preview**: Verify animation settings affect preview
- [ ] **Banner Customization**: Test banner-specific settings

### [ ] **5.3 Location Management**
- [ ] **View Locations**: Verify existing locations load correctly
- [ ] **Add Location**: Create new location with all fields
- [ ] **Edit Location**: Modify existing location details
- [ ] **Delete Location**: Remove location and verify deletion
- [ ] **Location Fields**: Test name, address, image, alt text, Google Maps URL
- [ ] **Location Images**: Upload and verify location images
- [ ] **Google Maps Integration**: Test Google Maps URL functionality

### [ ] **5.4 Location Layout & Ordering**
- [ ] **Variant Selection**: Test left/right image positioning variants
- [ ] **Location Ordering**: Test up/down controls for location sequence
- [ ] **Layout Preview**: Verify layout changes appear in preview
- [ ] **Responsive Layout**: Test layout on different screen sizes

### [ ] **5.5 Data Persistence & API**
- [ ] **Save Locations**: Verify location data persists after refresh
- [ ] **API Endpoints**: Test GET/PUT /api/locations endpoints
- [ ] **Error Handling**: Test invalid location data
- [ ] **Loading States**: Verify loading indicators work

---

## 🧪 **PHASE 6: CONTACT EDITOR TESTING**

### [ ] **6.1 Contact Editor Access & Layout**
- [ ] Navigate to "Contact" section in admin panel
- [ ] Verify contact editor loads with current data
- [ ] Confirm live preview shows contact page
- [ ] Test responsive preview modes

### [ ] **6.2 Contact Information**
- [ ] **Brooklyn Email**: Edit Brooklyn office email
- [ ] **Beverly Hills Email**: Edit Beverly Hills office email
- [ ] **Press Email**: Edit press contact email
- [ ] **Phone Number**: Edit contact phone number
- [ ] **Email Validation**: Test email format validation
- [ ] **Phone Validation**: Test phone number format validation

### [ ] **6.3 Location Integration**
- [ ] **Location Sync**: Test auto-generate emails from locations data
- [ ] **Cross-Reference**: Verify locations data integrates correctly
- [ ] **Location Updates**: Test how location changes affect contact page
- [ ] **API Integration**: Test GET /api/locations integration

### [ ] **6.4 Data Persistence & API**
- [ ] **Save Contact Data**: Verify data persists after refresh
- [ ] **API Endpoints**: Test GET/PUT /api/contact endpoints
- [ ] **Error Handling**: Test invalid contact data
- [ ] **Loading States**: Verify loading indicators work

---

## 🧪 **PHASE 7: FAQ EDITOR TESTING**

### [ ] **7.1 FAQ Editor Access & Layout**
- [ ] Navigate to "FAQ" section in admin panel
- [ ] Verify FAQ editor loads with current data
- [ ] Confirm live preview shows FAQ page
- [ ] Test responsive preview modes

### [ ] **7.2 FAQ Banner**
- [ ] **Desktop Background**: Upload/select desktop background image
- [ ] **Mobile Background**: Upload/select mobile background image
- [ ] **Banner Height**: Test banner height controls
- [ ] **Object Position**: Test banner image positioning
- [ ] **Transform Controls**: Test scale, translateX, translateY
- [ ] **Responsive Banner**: Verify banner adapts to screen size

### [ ] **7.3 FAQ Items Management**
- [ ] **View FAQ Items**: Verify existing FAQ items load
- [ ] **Add FAQ Item**: Create new FAQ with question and answer
- [ ] **Edit FAQ Item**: Modify existing FAQ details
- [ ] **Delete FAQ Item**: Remove FAQ item and verify deletion
- [ ] **FAQ Fields**: Test question, answer, order, category fields
- [ ] **FAQ Ordering**: Test FAQ item sequence/ordering
- [ ] **Rich Text**: Test rich text formatting in answers

### [ ] **7.4 Data Persistence & API**
- [ ] **Save FAQ Data**: Verify data persists after refresh
- [ ] **API Endpoints**: Test GET/PUT /api/faq endpoints
- [ ] **Error Handling**: Test invalid FAQ data
- [ ] **Loading States**: Verify loading indicators work

---

## 🧪 **PHASE 8: GLOBAL ADMIN FUNCTIONALITY**

### [ ] **8.1 Image Management System**
- [ ] **Image Upload**: Test POST /api/upload endpoint
- [ ] **Image Browser**: Test GET /api/images endpoint
- [ ] **Image Selection**: Test image selection across all editors
- [ ] **Image Formats**: Test various image formats (JPG, PNG, GIF, WebP)
- [ ] **Image Validation**: Test file size and format restrictions
- [ ] **Image Paths**: Test manual image path input

### [ ] **8.2 Live Preview System**
- [ ] **4K Preview**: Test 4K preview mode functionality
- [ ] **Full HD Preview**: Test Full HD preview mode
- [ ] **Mobile Portrait**: Test mobile portrait preview
- [ ] **Mobile Landscape**: Test mobile landscape preview
- [ ] **Preview Refresh**: Test auto-refresh on data changes
- [ ] **Preview Scaling**: Test responsive scaling behavior

### [ ] **8.3 Navigation & UI**
- [ ] **Sidebar Navigation**: Test all sidebar navigation links
- [ ] **Editor Switching**: Test switching between editors
- [ ] **State Persistence**: Test state persistence when switching editors
- [ ] **UI Responsiveness**: Test admin panel on different screen sizes
- [ ] **Loading States**: Test loading states across all editors

### [ ] **8.4 Error Handling & Validation**
- [ ] **Network Errors**: Test behavior with API failures
- [ ] **Invalid Data**: Test handling of invalid form data
- [ ] **File Upload Errors**: Test handling of upload failures
- [ ] **Validation Messages**: Test error message display
- [ ] **Recovery**: Test recovery from error states

---

## 🧪 **PHASE 9: INTEGRATION TESTING**

### [ ] **9.1 Frontend-Backend Integration**
- [ ] **API Consistency**: Verify all API endpoints work correctly
- [ ] **Data Synchronization**: Test data sync between admin and frontend
- [ ] **Image Serving**: Test image serving from uploads
- [ ] **Error Propagation**: Test error handling between frontend and backend
- [ ] **Performance**: Test response times for all operations

### [ ] **9.2 Cross-Editor Dependencies**
- [ ] **Locations-Contact Integration**: Test locations data in contact editor
- [ ] **Image Sharing**: Test image sharing between editors
- [ ] **Data Consistency**: Verify data consistency across editors
- [ ] **Dependency Updates**: Test cascading updates between related data

### [ ] **9.3 End-to-End Workflows**
- [ ] **Complete Content Creation**: Test creating content from scratch
- [ ] **Content Publishing**: Test complete content publishing workflow
- [ ] **Content Updates**: Test updating existing content
- [ ] **Content Deletion**: Test content deletion and cleanup
- [ ] **Bulk Operations**: Test bulk content operations

---

## 🚨 **CRITICAL ISSUES TO WATCH FOR**

### Authentication Security
- [ ] **Unprotected Access**: Admin panel is currently accessible without authentication
- [ ] **API Security**: All admin endpoints are unprotected
- [ ] **Data Exposure**: Sensitive data may be exposed

### Data Validation
- [ ] **Input Sanitization**: Check for XSS vulnerabilities in text inputs
- [ ] **File Upload Security**: Verify file upload restrictions
- [ ] **SQL Injection**: Test for injection vulnerabilities (if applicable)

### Performance Issues
- [ ] **Large Image Uploads**: Test behavior with large image files
- [ ] **Memory Usage**: Monitor memory usage during testing
- [ ] **Response Times**: Monitor API response times

### Browser Compatibility
- [ ] **Chrome**: Test all functionality in Chrome
- [ ] **Firefox**: Test all functionality in Firefox
- [ ] **Safari**: Test all functionality in Safari
- [ ] **Edge**: Test all functionality in Edge

---

## 📊 **TESTING PROGRESS TRACKING**

### Completion Status
- **Phase 1 (Hero)**: ⏳ Pending
- **Phase 2 (Work)**: ⏳ Pending
- **Phase 3 (Process)**: ⏳ Pending
- **Phase 4 (Story)**: ⏳ Pending
- **Phase 5 (Locations)**: ⏳ Pending
- **Phase 6 (Contact)**: ⏳ Pending
- **Phase 7 (FAQ)**: ⏳ Pending
- **Phase 8 (Global)**: ⏳ Pending
- **Phase 9 (Integration)**: ⏳ Pending

### Issue Tracking
- **Critical Issues Found**: 0
- **High Priority Issues**: 0
- **Medium Priority Issues**: 0
- **Low Priority Issues**: 0

### Test Results Summary
- **Total Tests**: 156
- **Passed**: 0
- **Failed**: 0
- **Skipped**: 0

---

## 🎯 **NEXT STEPS AFTER TESTING**

1. **Document Issues**: Create detailed bug reports for any issues found
2. **Fix Critical Issues**: Address any critical functionality problems
3. **Update TASK.md**: Add newly discovered tasks to production checklist
4. **Security Implementation**: Proceed with authentication system implementation
5. **Production Deployment**: Continue with production readiness tasks

---

## 🔄 **TESTING METHODOLOGY**

### Testing Guidelines
1. **Test Each Feature Thoroughly**: Don't skip any functionality
2. **Use Real Data**: Test with realistic content and images
3. **Test Edge Cases**: Try boundary conditions and error scenarios
4. **Document Everything**: Record all issues and unexpected behavior
5. **Verify Fixes**: Re-test after fixing any issues

### Testing Environment
- **Browser**: Use primary development browser
- **Network**: Test with normal and slow network conditions
- **Data**: Use variety of content types and sizes
- **Images**: Test with different image formats and sizes

---

*Created: $(date)*
*Project: Studio Pickens*
*Testing Phase: Pre-Authentication*
*Status: Ready for Execution*