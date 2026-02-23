// Mock Leaflet
global.L = {
  map: jest.fn(() => ({
    setView: jest.fn().mockReturnThis(),
    addLayer: jest.fn().mockReturnThis(),
    fitBounds: jest.fn().mockReturnThis(),
    panTo: jest.fn().mockReturnThis(),
    latLngToLayerPoint: jest.fn(() => ({ x: 100, y: 100 })),
    remove: jest.fn()
  })),
  layerGroup: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis(),
    clearLayers: jest.fn().mockReturnThis()
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis()
  })),
  marker: jest.fn(() => ({
    bindPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    openPopup: jest.fn(),
    getLatLng: jest.fn(() => ({ lat: 23.0225, lng: 72.5714 })),
    _icon: document.createElement('div')
  })),
  PosAnimation: jest.fn().mockImplementation(function() {
    this.run = jest.fn();
    this.once = jest.fn((event, callback) => {
      if (event === 'end') {
        setTimeout(callback, 0);
      }
    });
    return this;
  })
};

// Mock Handlebars
global.Handlebars = {
  compile: jest.fn((template) => {
    return jest.fn((data) => {
      // Simple template replacement for testing
      let result = template;
      Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, data[key] || '');
      });
      return result;
    });
  })
};

// Mock DOM methods
document.getElementById = jest.fn((id) => ({
  innerHTML: `<div>{{name}}</div><div>{{address}}</div>`
}));

document.getElementsByClassName = jest.fn((className) => [
  {
    innerHTML: '',
    appendChild: jest.fn()
  }
]);

document.createElement = jest.fn((tagName) => {
  const element = {
    tagName: tagName.toUpperCase(),
    className: '',
    innerHTML: '',
    children: [],
    addEventListener: jest.fn(),
    appendChild: jest.fn(function(child) {
      this.children.push(child);
    }),
    parentNode: null
  };
  return element;
});
