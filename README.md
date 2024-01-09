# SPA-ScrollDepth-Tracker-GTM

A robust Google Tag Manager (GTM) script for tracking scroll depth events in Single Page Applications (SPAs). Customized for complex SPAs with dynamic content loading.

## Features

- **Scroll Depth Tracking:** Measures user engagement by tracking scroll depths of 25%, 50%, 75%, and 95%.
- **Single Page Application (SPA) Compatibility:** Optimized for SPAs, handling dynamic content changes without reloading the page.
- **Debounce Mechanism:** Ensures accurate tracking by avoiding redundant events during rapid scrolling.
- **Event Limit Control:** Limits the number of tracking events per page path to prevent data overload.
- **Error Handling:** Includes robust error handling to maintain script integrity.

## Setup Instructions

### 1. Create a Custom HTML Tag in GTM
   - Go to your GTM container.
   - Click "New Tag" > "Tag Configuration" > "Custom HTML".
   - Paste the provided script into the HTML field.

### 2. Configure Triggers
   - Set up triggers for DOM Ready and History Change to capture SPA navigation.
   - Assign these triggers to the Custom HTML tag.

### 3. Define Data Layer Variables
   - Ensure your SPA is configured to push relevant data to the GTM data layer.
   - Verify that variables such as `scroll_depth`, `page_location`, and `full_scrolled` are correctly implemented.

### 4. Test and Publish
   - Use GTM's preview mode to test the tag's functionality.
   - Once verified, publish the GTM container to apply changes.

## Usage

- The script automatically activates upon page load.
- Tracks user scroll depth events and pushes them to the data layer.
- Compatible with GA4 for detailed analytics integration.

## Customization

- Modify the `scrollDepths` array to track different scroll percentages.
- Adjust `maxEventsPerPath` to control event frequency.

## Credits

Developed during a contract with Efigence for a complex SPA project. Tailored to meet the specific needs of our client, ensuring seamless integration and reliable data tracking in dynamic web environments.
