import { useEffect, useRef, useState, useCallback } from 'react';
import { TextField, Button, Box, InputAdornment, CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';
import { loadGoogleMaps } from '../../utils/googleMapsLoader';
import './LocationPicker.css';
import { MdLocationOn, MdMyLocation } from "react-icons/md";


/**
 * LocationPicker Component
 *
 * Provides:
 * 1. Google Places Autocomplete search input
 * 2. "Use Current Location" button with reverse geocoding
 *
 * Returns: { address: string, lat: number, lng: number }
 */
const LocationPicker = ({
  value,
  onChange,
  label = 'Location',
  placeholder = 'Search for a location...',
  disabled = false,
  required = false,
  error,
  helperText,
  fullWidth = true,
  size = 'medium',
  className = '',
}) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState(value?.address || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);

  // Initialize Google Maps and Autocomplete
  useEffect(() => {
    let isMounted = true;

    const initAutocomplete = async () => {
      try {
        const googleMaps = await loadGoogleMaps();

        if (!isMounted || !inputRef.current) return;

        // Create autocomplete instance
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ['geocode', 'establishment'],
          }
        );

        // Listen for place selection
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();

          if (!place.geometry || !place.geometry.location) {
            toast.error('Selected location has no geometry data');
            return;
          }

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || place.name || '';

          setInputValue(address);

          if (onChange) {
            onChange({
              address,
              lat,
              lng,
            });
          }
        });

        setIsApiReady(true);
      } catch (error) {
        console.error('Google Maps initialization error:', error);
        toast.error(error.message || 'Failed to initialize location search');
      }
    };

    initAutocomplete();

    return () => {
      isMounted = false;
      // Cleanup autocomplete listeners
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  // Sync external value changes
  useEffect(() => {
    if (value?.address !== undefined && value.address !== inputValue) {
      setInputValue(value.address);
    }
  }, [value]);

  // Handle input changes (controlled input)
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  // Handle "Use Current Location" button click
  const handleUseCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);

    try {
      // Get current position
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      });

      const { latitude: lat, longitude: lng } = position.coords;

      // Load Google Maps if not ready
      const googleMaps = await loadGoogleMaps();

      // Reverse geocoding
      const geocoder = new window.google.maps.Geocoder();
      const result = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });

      const address = result.formatted_address || '';
      setInputValue(address);

      if (onChange) {
        onChange({
          address,
          lat,
          lng,
        });
      }

      toast.success('Current location found');
    } catch (error) {
      console.error('Geolocation error:', error);

      // Handle specific geolocation errors
      if (error.code === 1) {
        toast.error('Location permission denied. Please enable location access in your browser settings.');
      } else if (error.code === 2) {
        toast.error('Location unavailable. Please try again.');
      } else if (error.code === 3) {
        toast.error('Location detection timed out. Please try again.');
      } else {
        toast.error(error.message || 'Failed to get current location');
      }
    } finally {
      setIsLoading(false);
    }
  }, [onChange]);

  return (
    <Box className={`location-picker ${className}`}>
      <TextField
        inputRef={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        label={label}
        placeholder={placeholder}
        disabled={disabled || !isApiReady}
        required={required}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        size={size}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* <LocationOn color="action" /> */}
              <MdLocationOn color="action" />
            </InputAdornment>
          ),
        }}
        className="location-picker-input"
      />

      <Button
        variant="outlined"
        size={size}
        onClick={handleUseCurrentLocation}
        disabled={disabled || isLoading || !isApiReady}
        startIcon={
          isLoading ? <CircularProgress size={16} /> : <MdMyLocation />
        }
        className="location-picker-button"
        sx={{ mt: 1 }}
      >
        {isLoading ? "Getting Location..." : "Use Current Location"}
      </Button>
    </Box>
  );
};

export default LocationPicker;
