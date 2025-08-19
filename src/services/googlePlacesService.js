// Google Places API Service for Address Autocomplete and Distance Calculations
class GooglePlacesService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    this.autocompleteService = null;
    this.placesService = null;
    this.distanceMatrixService = null;
    this.geocoder = null;
    
    this.initServices();
  }

  initServices() {
    if (window.google && window.google.maps) {
      this.autocompleteService = new window.google.maps.places.AutocompleteService();
      this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
      this.distanceMatrixService = new window.google.maps.DistanceMatrixService();
      this.geocoder = new window.google.maps.Geocoder();
    }
  }

  // Load Google Maps API
  async loadGoogleMapsAPI() {
    if (window.google && window.google.maps) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.initServices();
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };
      
      document.head.appendChild(script);
    });
  }

  // Get address suggestions for autocomplete
  async getAddressSuggestions(input, location = null) {
    try {
      await this.loadGoogleMapsAPI();
      
      return new Promise((resolve, reject) => {
        if (!this.autocompleteService) {
          reject(new Error('Autocomplete service not available'));
          return;
        }

        const request = {
          input: input,
          componentRestrictions: { country: 'us' }, // Restrict to US
          types: ['address', 'establishment'],
        };

        if (location) {
          request.location = location;
          request.radius = 50000; // 50km radius
        }

        this.autocompleteService.getPlacePredictions(request, (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const suggestions = predictions.map(prediction => ({
              id: prediction.place_id,
              description: prediction.description,
              structured: prediction.structured_formatting,
              types: prediction.types,
              placeId: prediction.place_id
            }));
            resolve(suggestions);
          } else {
            resolve([]);
          }
        });
      });
    } catch (error) {
      console.error('Error getting address suggestions:', error);
      return [];
    }
  }

  // Get place details by place ID
  async getPlaceDetails(placeId) {
    try {
      await this.loadGoogleMapsAPI();
      
      return new Promise((resolve, reject) => {
        if (!this.placesService) {
          reject(new Error('Places service not available'));
          return;
        }

        const request = {
          placeId: placeId,
          fields: ['address_components', 'formatted_address', 'geometry', 'name', 'types']
        };

        this.placesService.getDetails(request, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const addressComponents = this.parseAddressComponents(place.address_components);
            resolve({
              placeId: placeId,
              formattedAddress: place.formatted_address,
              name: place.name,
              location: place.geometry?.location,
              addressComponents: addressComponents,
              types: place.types
            });
          } else {
            reject(new Error('Failed to get place details'));
          }
        });
      });
    } catch (error) {
      console.error('Error getting place details:', error);
      throw error;
    }
  }

  // Parse address components into structured format
  parseAddressComponents(components) {
    const address = {
      street_number: '',
      route: '',
      subpremise: '',
      locality: '',
      administrative_area_level_1: '',
      postal_code: '',
      country: ''
    };

    components.forEach(component => {
      const types = component.types;
      
      if (types.includes('street_number')) {
        address.street_number = component.long_name;
      } else if (types.includes('route')) {
        address.route = component.long_name;
      } else if (types.includes('subpremise')) {
        address.subpremise = component.long_name;
      } else if (types.includes('locality')) {
        address.locality = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        address.administrative_area_level_1 = component.short_name;
      } else if (types.includes('postal_code')) {
        address.postal_code = component.long_name;
      } else if (types.includes('country')) {
        address.country = component.short_name;
      }
    });

    return address;
  }

  // Calculate distance and duration between two addresses
  async calculateDistance(origin, destination, mode = 'driving') {
    try {
      await this.loadGoogleMapsAPI();
      
      return new Promise((resolve, reject) => {
        if (!this.distanceMatrixService) {
          reject(new Error('Distance Matrix service not available'));
          return;
        }

        const request = {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode[mode.toUpperCase()],
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        };

        this.distanceMatrixService.getDistanceMatrix(request, (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            const element = response.rows[0].elements[0];
            
            if (element.status === window.google.maps.DistanceMatrixElementStatus.OK) {
              resolve({
                distance: {
                  text: element.distance.text,
                  value: element.distance.value // meters
                },
                duration: {
                  text: element.duration.text,
                  value: element.duration.value // seconds
                },
                status: 'OK'
              });
            } else {
              resolve({
                distance: null,
                duration: null,
                status: element.status
              });
            }
          } else {
            reject(new Error('Failed to calculate distance'));
          }
        });
      });
    } catch (error) {
      console.error('Error calculating distance:', error);
      throw error;
    }
  }

  // Geocode an address to get coordinates
  async geocodeAddress(address) {
    try {
      await this.loadGoogleMapsAPI();
      
      return new Promise((resolve, reject) => {
        if (!this.geocoder) {
          reject(new Error('Geocoder service not available'));
          return;
        }

        this.geocoder.geocode({ address: address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng(),
              formattedAddress: results[0].formatted_address
            });
          } else {
            reject(new Error('Failed to geocode address'));
          }
        });
      });
    } catch (error) {
      console.error('Error geocoding address:', error);
      throw error;
    }
  }

  // Get mock suggestions for development (when API key is not available)
  getMockSuggestions(input) {
    const mockAddresses = [
      {
        id: 'mock1',
        description: `${input}, Salt Lake City, UT 84101, USA`,
        structured: {
          main_text: input,
          secondary_text: 'Salt Lake City, UT 84101, USA'
        },
        types: ['street_address'],
        placeId: 'mock_place_1'
      },
      {
        id: 'mock2',
        description: `${input}, Sandy, UT 84092, USA`,
        structured: {
          main_text: input,
          secondary_text: 'Sandy, UT 84092, USA'
        },
        types: ['street_address'],
        placeId: 'mock_place_2'
      },
      {
        id: 'mock3',
        description: `${input}, West Jordan, UT 84084, USA`,
        structured: {
          main_text: input,
          secondary_text: 'West Jordan, UT 84084, USA'
        },
        types: ['street_address'],
        placeId: 'mock_place_3'
      },
      {
        id: 'mock4',
        description: `${input}, Park City, UT 84060, USA`,
        structured: {
          main_text: input,
          secondary_text: 'Park City, UT 84060, USA'
        },
        types: ['street_address'],
        placeId: 'mock_place_4'
      },
      {
        id: 'mock5',
        description: `${input}, Provo, UT 84601, USA`,
        structured: {
          main_text: input,
          secondary_text: 'Provo, UT 84601, USA'
        },
        types: ['street_address'],
        placeId: 'mock_place_5'
      }
    ];

    return mockAddresses.filter(addr => 
      addr.description.toLowerCase().includes(input.toLowerCase())
    );
  }

  // Get mock distance calculation for development
  getMockDistance(origin, destination) {
    // Simple mock distance calculation
    const mockDistances = {
      'Salt Lake City': 0,
      'Sandy': 15,
      'West Jordan': 12,
      'Park City': 35,
      'Provo': 45
    };

    const originCity = this.extractCity(origin);
    const destCity = this.extractCity(destination);
    
    const distance = Math.abs(
      (mockDistances[destCity] || 20) - (mockDistances[originCity] || 15)
    ) + Math.floor(Math.random() * 10);

    return {
      distance: {
        text: `${distance} mi`,
        value: distance * 1609.34 // Convert to meters
      },
      duration: {
        text: `${Math.floor(distance * 2.5)} mins`,
        value: distance * 2.5 * 60 // Convert to seconds
      },
      status: 'OK'
    };
  }

  extractCity(address) {
    if (address.includes('Salt Lake City')) return 'Salt Lake City';
    if (address.includes('Sandy')) return 'Sandy';
    if (address.includes('West Jordan')) return 'West Jordan';
    if (address.includes('Park City')) return 'Park City';
    if (address.includes('Provo')) return 'Provo';
    return 'Unknown';
  }
}

// Create singleton instance
const googlePlacesService = new GooglePlacesService();

export default googlePlacesService;
