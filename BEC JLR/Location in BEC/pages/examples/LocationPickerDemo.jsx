import { useState } from 'react';
import { Container, Typography, Paper, Box, Card, CardContent, Divider, Alert } from '@mui/material';
import LocationPicker from '../../components/LocationPicker';

/**
 * LocationPicker Demo Page
 *
 * Demonstrates usage of the LocationPicker component
 * Shows returned data structure from both search and geolocation
 */
const LocationPickerDemo = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(
    !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  );

  const handleLocationChange = (locationData) => {
    console.log('Location selected:', locationData);
    setSelectedLocation(locationData);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Location Picker Demo
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        This demo shows the LocationPicker component with Google Places Autocomplete
        and &quot;Use Current Location&quot; functionality.
      </Typography>

      {!apiKeyConfigured && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>VITE_GOOGLE_MAPS_API_KEY</strong> is not configured in your environment.
          Add it to your <code>.env</code> file to enable the location picker.
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Location Picker
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Try searching for a location or click &quot;Use Current Location&quot;
        </Typography>

        <Box sx={{ maxWidth: 500 }}>
          <LocationPicker
            value={selectedLocation}
            onChange={handleLocationChange}
            label="Search Location"
            placeholder="Enter an address or place name..."
            fullWidth
          />
        </Box>
      </Paper>

      {selectedLocation && (
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" color="success.main" gutterBottom>
              Selected Location Data
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
              <Box sx={{ mb: 1 }}>
                <strong>address:</strong>
                <Box component="span" sx={{ ml: 1, color: 'text.secondary' }}>
                  &quot;{selectedLocation.address}&quot;
                </Box>
              </Box>
              <Box sx={{ mb: 1 }}>
                <strong>lat:</strong>
                <Box component="span" sx={{ ml: 1, color: 'text.secondary' }}>
                  {selectedLocation.lat}
                </Box>
              </Box>
              <Box>
                <strong>lng:</strong>
                <Box component="span" sx={{ ml: 1, color: 'text.secondary' }}>
                  {selectedLocation.lng}
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              This is the exact data structure returned by the component.
              You can use it to save to your backend or display on a map.
            </Typography>
          </CardContent>
        </Card>
      )}

      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Usage Example
        </Typography>

        <Box
          component="pre"
          sx={{
            backgroundColor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
{`import { useState } from 'react';
import LocationPicker from './components/LocationPicker';

const MyComponent = () => {
  const [location, setLocation] = useState(null);

  const handleLocationChange = (data) => {
    // data = { address, lat, lng }
    setLocation(data);
  };

  return (
    <LocationPicker
      value={location}
      onChange={handleLocationChange}
      label="Select Location"
      placeholder="Search for a location..."
    />
  );
};`}
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Key Features
        </Typography>

        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2" paragraph>
            <strong>Google Places Autocomplete</strong> - Search any address or establishment
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <strong>Use Current Location</strong> - Get lat/lng via browser geolocation with reverse geocoding
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <strong>Error Handling</strong> - Handles API failures, permission denied, timeouts
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <strong>Mobile Optimized</strong> - Works on iOS Safari, Android Chrome, desktop browsers
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <strong>Script Loading</strong> - Singleton loader prevents duplicate Google Maps loads
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Environment Setup
        </Typography>

        <Typography variant="body2" paragraph>
          Add your Google Maps API key to <code>.env</code>:
        </Typography>

        <Box
          component="pre"
          sx={{
            backgroundColor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            fontSize: '0.875rem',
          }}
        >
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Required Google Cloud APIs: Maps JavaScript API, Places API, Geocoding API
        </Typography>
      </Paper>
    </Container>
  );
};

export default LocationPickerDemo;
