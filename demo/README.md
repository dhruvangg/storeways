# Storeways

[![GitHub deployments](https://img.shields.io/github/deployments/dhruvangg/storeways/github-pages)](https://github.com/dhruvangg/storeways)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A lightweight, open-source JavaScript plugin to create interactive store locators using OpenStreetMap and Leaflet.js

[Demo](https://dhruvangg.github.io/storeways/) | [Documentation](#documentation) | [Examples](#usage)

## ✨ Features

- 🗺️ **Interactive Map** - Powered by Leaflet.js and OpenStreetMap (no API keys required)
- 📍 **Store Markers** - Automatically plots all store locations with clickable popups
- 📋 **Store List** - Sidebar with scrollable list of stores
- 📏 **Distance Calculation** - Automatic distance calculation from a center point
- 🔄 **Dual Units** - Display distances in both miles and kilometers
- 🎯 **Click to Navigate** - Click list items to pan/zoom to store location
- ✨ **Animated Markers** - Smooth bounce animation when selecting stores
- 🎨 **Customizable Templates** - Use Handlebars templates for complete UI control
- 📱 **Responsive** - Works on desktop and mobile devices
- 🔗 **Google Maps Integration** - Direct links to Google Maps directions
- 🚀 **Lightweight** - No jQuery or heavy dependencies
- 🆓 **Free & Open Source** - MIT licensed

## 🚀 Quick Start

### Prerequisites

Include the required dependencies in your HTML:

```html
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Handlebars JS -->
<script src="https://cdn.jsdelivr.net/npm/handlebars@4.7.8/dist/handlebars.min.js"></script>

<!-- Storeways JS -->
<script src="dist/storeways.js"></script>
```

## 📦 Installation

### Download

Download the latest version from the [releases page](https://github.com/dhruvangg/storeways/releases) or clone this repository:

```bash
git clone https://github.com/dhruvangg/storeways.git
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/dhruvangg/storeways/dist/storeways.js"></script>
```

## 📖 Usage

### 1. Create HTML Structure

```html
<div class="store-locator">
  <!-- Map Container -->
  <div id="map" style="height: 600px; width: 70%;"></div>
  
  <!-- Store List Container -->
  <div class="sw-store-list" style="height: 600px; width: 30%; overflow-y: auto;"></div>
</div>
```

### 2. Define Handlebars Templates

**Store List Template:**

```html
<script id="store-list-template" type="text/x-handlebars-template">
  <div class="store-item">
    <h3>{{name}}</h3>
    <p>{{address}}</p>
    <p>{{city}}, {{state}} {{postal}}</p>
    {{#if phone}}<p>Phone: {{phone}}</p>{{/if}}
    {{#if distance}}
      <p>Distance: {{distance}} {{length}}</p>
    {{/if}}
  </div>
</script>
```

**Popup Template:**

```html
<script id="store-popup-template" type="text/x-handlebars-template">
  <div class="store-popup">
    <h4>{{name}}</h4>
    <p>{{address}}<br>{{city}}, {{state}} {{postal}}</p>
    {{#if phone}}<p>{{phone}}</p>{{/if}}
    {{#if web}}<p><a href="{{web}}" target="_blank">Visit Website</a></p>{{/if}}
  </div>
</script>
```

### 3. Initialize Storeways

```javascript
// Your store data
const stores = [
  {
    id: "1",
    name: "Store Name",
    lat: "23.0225",
    lng: "72.5714",
    address: "123 Main Street",
    city: "City Name",
    state: "State",
    postal: "12345",
    phone: "123-456-7890",
    web: "https://example.com",
    category: "Retail"
  },
  // ... more stores
];

// Initialize the store locator
const storeLocator = new StoreWays({
  storeData: stores,
  mapID: 'map',
  listTemplate: 'store-list-template',
  popupTemplate: 'store-popup-template',
  defaultlat: 23.0225,
  defaultlng: 72.5714,
  lengthUnit: 'km'
});
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `storeData` | Array | **Required** | Array of store objects with location data |
| `mapID` | String | `'swMap'` | ID of the map container element |
| `listTemplate` | String | **Required** | ID of the Handlebars template for store list |
| `popupTemplate` | String | **Required** | ID of the Handlebars template for map popups |
| `defaultlat` | Number | `38.947464` | Default center latitude |
| `defaultlng` | Number | `25.320826` | Default center longitude |
| `lengthUnit` | String | `'m'` | Distance unit: `'m'` for miles or `'km'` for kilometers |
| `milesLang` | String | `'miles'` | Label for miles |
| `kilometerLang` | String | `'kilometers'` | Label for kilometers |
| `storeListWrapper` | String | `'sw-store-list'` | Class name of the store list container |

## 📊 Store Data Format

Each store object should include:

```javascript
{
  id: "unique-id",           // Unique identifier
  name: "Store Name",         // Store name
  lat: "23.0225",            // Latitude (string or number)
  lng: "72.5714",            // Longitude (string or number)
  address: "Street Address", // Street address
  address2: "Suite 100",     // Optional: Address line 2
  city: "City",              // City
  state: "State",            // State/Province
  postal: "12345",           // Postal/ZIP code
  phone: "123-456-7890",     // Optional: Phone number
  web: "https://...",        // Optional: Website URL
  category: "Retail",        // Optional: Store category
  featured: true,            // Optional: Featured flag
  hours1: "Mon-Fri: 9-5",    // Optional: Hours
  hours2: "Sat: 10-4",       // Optional: Additional hours
  hours3: "Sun: Closed"      // Optional: Additional hours
}
```

## 🔧 API Methods

### `updateData(newData)`

Update the store data and re-render the map and list:

```javascript
const newStores = [/* new store data */];
storeLocator.updateData(newStores);
```

## 🎨 Styling

Storeways comes with minimal styling. You can customize the appearance using CSS:

```css
/* Store list container */
.sw-store-list {
  overflow-y: auto;
  border-left: 1px solid #ddd;
}

/* List items */
.sw-store-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sw-store-list li {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sw-store-list li:hover {
  background-color: #f5f5f5;
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Leaflet.js](https://leafletjs.com/) - Interactive map library
- [OpenStreetMap](https://www.openstreetmap.org/) - Free map data
- [Handlebars.js](https://handlebarsjs.com/) - Templating engine
- Inspired by [jQuery Store Locator Plugin](https://github.com/bjorn2404/jQuery-Store-Locator-Plugin)

## 📮 Support

If you have any questions or need help, please [open an issue](https://github.com/dhruvangg/storeways/issues).

---

Made with ❤️ by [Dhruvang Gajjar](https://github.com/dhruvangg)
