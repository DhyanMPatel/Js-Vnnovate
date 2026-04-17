/**
 * Google Maps JavaScript API Loader
 * 
 * Singleton pattern to ensure script is loaded only once
 * Handles race conditions when multiple components need the API
 */

let loadPromise = null;

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script';

export const loadGoogleMaps = () => {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    if (existingScript) {
      // Wait for existing script to finish loading
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          resolve(window.google.maps);
        }
      }, 100);

      // Timeout after 30 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Google Maps script loading timed out'));
      }, 30000);

      return;
    }

    // Get API key from environment
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('VITE_GOOGLE_MAPS_API_KEY is not configured'));
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding&callback=__googleMapsCallback`;
    script.async = true;
    script.defer = true;

    // Global callback for script load
    window.__googleMapsCallback = () => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error('Google Maps loaded but API not available'));
      }
    };

    script.onerror = () => {
      reject(new Error('Failed to load Google Maps script'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

/**
 * Reset the loader - useful for testing or when API key changes
 */
export const resetGoogleMapsLoader = () => {
  loadPromise = null;
  const script = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
  if (script) {
    script.remove();
  }
  delete window.__googleMapsCallback;
  delete window.google;
};

export default loadGoogleMaps;
