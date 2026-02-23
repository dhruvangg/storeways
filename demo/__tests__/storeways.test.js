// Load the StoreWays source
const fs = require('fs');
const path = require('path');

// Read and evaluate the source file
const storewaysSource = fs.readFileSync(
  path.join(__dirname, '../storeways.js'),
  'utf8'
);
eval(storewaysSource);

describe('StoreWays', () => {
  let mockStoreData;
  let defaultSettings;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock store data
    mockStoreData = [
      {
        id: '1',
        name: 'Test Store 1',
        lat: '23.0225',
        lng: '72.5714',
        address: '123 Main St',
        city: 'Ahmedabad',
        state: 'Gujarat',
        postal: '380001',
        phone: '123-456-7890',
        web: 'https://test1.com',
        category: 'Retail'
      },
      {
        id: '2',
        name: 'Test Store 2',
        lat: '23.0345',
        lng: '72.5498',
        address: '456 Oak Ave',
        city: 'Ahmedabad',
        state: 'Gujarat',
        postal: '380002',
        phone: '098-765-4321',
        web: 'https://test2.com',
        category: 'Mall'
      }
    ];

    defaultSettings = {
      storeData: mockStoreData,
      mapID: 'testMap',
      listTemplate: 'testListTemplate',
      popupTemplate: 'testPopupTemplate'
    };
  });

  describe('Constructor', () => {
    test('should create instance with default settings', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(storeways).toBeInstanceOf(StoreWays);
      expect(storeways.settings).toBeDefined();
      expect(storeways.settings.defaultlat).toBe(38.947464);
      expect(storeways.settings.defaultlng).toBe(25.320826);
      expect(storeways.settings.lengthUnit).toBe('m');
    });

    test('should merge custom settings with defaults', () => {
      const customSettings = {
        ...defaultSettings,
        defaultlat: 40.7128,
        defaultlng: -74.0060,
        lengthUnit: 'km'
      };

      const storeways = new StoreWays(customSettings);

      expect(storeways.settings.defaultlat).toBe(40.7128);
      expect(storeways.settings.defaultlng).toBe(-74.0060);
      expect(storeways.settings.lengthUnit).toBe('km');
    });

    test('should initialize GeoCodeCalc object', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(storeways.GeoCodeCalc).toBeDefined();
      expect(storeways.GeoCodeCalc.EarthRadius).toBeDefined();
    });

    test('should set correct Earth radius for miles', () => {
      const settings = { ...defaultSettings, lengthUnit: 'm' };
      const storeways = new StoreWays(settings);

      expect(storeways.GeoCodeCalc.EarthRadius).toBe(3956);
    });

    test('should set correct Earth radius for kilometers', () => {
      const settings = { ...defaultSettings, lengthUnit: 'km' };
      const storeways = new StoreWays(settings);

      expect(storeways.GeoCodeCalc.EarthRadius).toBe(6367);
    });
  });

  describe('Distance Calculations', () => {
    test('should calculate distance for all stores', () => {
      const storeways = new StoreWays(defaultSettings);

      mockStoreData.forEach(store => {
        expect(store.distance).toBeDefined();
        expect(typeof parseFloat(store.distance)).toBe('number');
      });
    });

    test('should calculate alternative distance (km when unit is miles)', () => {
      const settings = { ...defaultSettings, lengthUnit: 'm' };
      const storeways = new StoreWays(settings);

      mockStoreData.forEach(store => {
        expect(store.altdistance).toBeDefined();
        expect(parseFloat(store.altdistance)).toBeGreaterThan(parseFloat(store.distance));
      });
    });

    test('should set correct length labels for miles', () => {
      const settings = { ...defaultSettings, lengthUnit: 'm' };
      const storeways = new StoreWays(settings);

      expect(mockStoreData[0].length).toBe('miles');
      expect(mockStoreData[0].altlength).toBe('kilometers');
    });

    test('should set correct length labels for kilometers', () => {
      const settings = { ...defaultSettings, lengthUnit: 'km' };
      const storeways = new StoreWays(settings);

      expect(mockStoreData[0].length).toBe('kilometers');
      expect(mockStoreData[0].altlength).toBe('miles');
    });

    test('geoCodeCalcToRadian should convert degrees to radians', () => {
      const storeways = new StoreWays(defaultSettings);
      const result = storeways.geoCodeCalcToRadian(180);

      expect(result).toBeCloseTo(Math.PI, 5);
    });

    test('geoCodeCalcToRadian should handle zero', () => {
      const storeways = new StoreWays(defaultSettings);
      const result = storeways.geoCodeCalcToRadian(0);

      expect(result).toBe(0);
    });

    test('geoCodeCalcDiffRadian should calculate difference correctly', () => {
      const storeways = new StoreWays(defaultSettings);
      const result = storeways.geoCodeCalcDiffRadian(0, 180);

      expect(result).toBeCloseTo(Math.PI, 5);
    });

    test('geoCodeCalcCalcDistance should calculate distance between two points', () => {
      const storeways = new StoreWays(defaultSettings);
      const distance = storeways.geoCodeCalcCalcDistance(
        23.0225, 72.5714,
        23.0345, 72.5498,
        3956
      );

      expect(distance).toBeGreaterThan(0);
      expect(typeof distance).toBe('number');
    });

    test('geoCodeCalcCalcDistance should return 0 for same coordinates', () => {
      const storeways = new StoreWays(defaultSettings);
      const distance = storeways.geoCodeCalcCalcDistance(
        23.0225, 72.5714,
        23.0225, 72.5714,
        3956
      );

      expect(distance).toBeCloseTo(0, 5);
    });
  });

  describe('Sorting', () => {
    test('should sort stores by distance', () => {
      const storeways = new StoreWays(defaultSettings);
      
      const distances = mockStoreData.map(store => parseFloat(store.distance));
      
      for (let i = 1; i < distances.length; i++) {
        expect(distances[i]).toBeGreaterThanOrEqual(distances[i - 1]);
      }
    });

    test('sortBy should sort array by property', () => {
      const storeways = new StoreWays(defaultSettings);
      const testArray = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 }
      ];

      storeways.sortBy(testArray, 'name');

      expect(testArray[0].name).toBe('Alice');
      expect(testArray[1].name).toBe('Bob');
      expect(testArray[2].name).toBe('Charlie');
    });
  });

  describe('Map Rendering', () => {
    test('should initialize Leaflet map', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(global.L.map).toHaveBeenCalledWith('testMap');
      expect(storeways.map).toBeDefined();
    });

    test('should create markers for all stores', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(storeways.markers).toBeDefined();
      expect(storeways.markers.length).toBe(mockStoreData.length);
    });

    test('should create layer group', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(global.L.layerGroup).toHaveBeenCalled();
      expect(storeways.mapLayer).toBeDefined();
    });

    test('should add tile layer for OpenStreetMap', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(global.L.tileLayer).toHaveBeenCalledWith(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        expect.objectContaining({
          maxZoom: 19,
          attribution: expect.any(String)
        })
      );
    });

    test('should fit map bounds to show all stores', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(storeways.map.fitBounds).toHaveBeenCalled();
    });
  });

  describe('List Rendering', () => {
    test('should create list element', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(document.createElement).toHaveBeenCalledWith('ul');
    });

    test('should create list items for all stores', () => {
      const storeways = new StoreWays(defaultSettings);

      const liCallCount = Array.from({ length: mockStoreData.length })
        .filter(() => true).length;
      
      expect(document.createElement).toHaveBeenCalledWith('li');
    });

    test('should compile Handlebars template', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(global.Handlebars.compile).toHaveBeenCalled();
    });

    test('should get list template from DOM', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(document.getElementById).toHaveBeenCalledWith('testListTemplate');
    });

    test('should get popup template from DOM', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(document.getElementById).toHaveBeenCalledWith('testPopupTemplate');
    });
  });

  describe('updateData Method', () => {
    test('should update store data', () => {
      const storeways = new StoreWays(defaultSettings);
      
      const newData = [
        {
          id: '3',
          name: 'New Store',
          lat: '22.9876',
          lng: '72.5998',
          address: '789 New St',
          city: 'Ahmedabad',
          state: 'Gujarat',
          postal: '380003'
        }
      ];

      storeways.updateData(newData);

      expect(storeways.settings.storeData).toBe(newData);
    });

    test('should remove old map before updating', () => {
      const storeways = new StoreWays(defaultSettings);
      const removeSpy = jest.spyOn(storeways.map, 'remove');
      
      const newData = [mockStoreData[0]];
      storeways.updateData(newData);

      expect(removeSpy).toHaveBeenCalled();
    });

    test('should reinitialize after data update', () => {
      const storeways = new StoreWays(defaultSettings);
      const mapCallCount = global.L.map.mock.calls.length;
      
      const newData = [mockStoreData[0]];
      storeways.updateData(newData);

      expect(global.L.map.mock.calls.length).toBeGreaterThan(mapCallCount);
    });
  });

  describe('Validation', () => {
    test('validateOptions should throw error if Leaflet is missing', () => {
      const originalL = global.L;
      global.L = undefined;

      const storeways = new StoreWays(defaultSettings);
      
      expect(() => {
        storeways.validateOptions();
      }).toThrow('LeafletJS is required.');

      global.L = originalL;
    });

    test('validateOptions should throw error if Handlebars is missing', () => {
      const originalHandlebars = global.Handlebars;
      global.Handlebars = undefined;

      const storeways = new StoreWays(defaultSettings);
      
      expect(() => {
        storeways.validateOptions();
      }).toThrow('Handlebars is required.');

      global.Handlebars = originalHandlebars;
    });

    test('validateOptions should throw error if storeData is missing', () => {
      const storeways = new StoreWays(defaultSettings);
      storeways.settings.storeData = undefined;
      storeways.settings.storeDataUrl = undefined;
      
      expect(() => {
        storeways.validateOptions();
      }).toThrow('Required data source is missing.');
    });

    test('validateOptions should throw error if templates are missing', () => {
      const storeways = new StoreWays(defaultSettings);
      storeways.settings.listTemplate = undefined;
      
      expect(() => {
        storeways.validateOptions();
      }).toThrow('Templates for list and popup are required');
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete initialization flow', () => {
      const storeways = new StoreWays(defaultSettings);

      expect(storeways.settings).toBeDefined();
      expect(storeways.map).toBeDefined();
      expect(storeways.markers).toBeDefined();
      expect(storeways.markers.length).toBe(mockStoreData.length);
      expect(mockStoreData[0].distance).toBeDefined();
    });

    test('should handle custom configuration', () => {
      const customSettings = {
        ...defaultSettings,
        defaultlat: 51.5074,
        defaultlng: -0.1278,
        lengthUnit: 'km',
        milesLang: 'mi',
        kilometerLang: 'km'
      };

      const storeways = new StoreWays(customSettings);

      expect(storeways.settings.defaultlat).toBe(51.5074);
      expect(storeways.settings.defaultlng).toBe(-0.1278);
      expect(storeways.settings.milesLang).toBe('mi');
      expect(storeways.GeoCodeCalc.EarthRadius).toBe(6367);
    });

    test('should handle stores with optional fields', () => {
      const storeDataWithOptionals = [
        {
          id: '1',
          name: 'Store with All Fields',
          lat: '23.0225',
          lng: '72.5714',
          address: '123 Main St',
          address2: 'Suite 100',
          city: 'Ahmedabad',
          state: 'Gujarat',
          postal: '380001',
          phone: '123-456-7890',
          web: 'https://test.com',
          hours1: 'Mon-Fri: 9-5',
          hours2: 'Sat: 10-4',
          hours3: 'Sun: Closed',
          category: 'Retail',
          featured: true
        }
      ];

      const settings = {
        ...defaultSettings,
        storeData: storeDataWithOptionals
      };

      const storeways = new StoreWays(settings);

      expect(storeways.settings.storeData[0].address2).toBe('Suite 100');
      expect(storeways.settings.storeData[0].hours1).toBe('Mon-Fri: 9-5');
    });
  });
});
