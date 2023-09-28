function StoreWays(settings) {
  var defaultSettings = {
    defaultlat: 38.947464,
    defaultlng: 25.320826,
    lengthUnit: 'm',
    milesLang: 'miles',
    kilometerLang: 'kilometers',
    mapID: 'swMap',
    storeListWrapper: 'sw-store-list'
  };

  this.settings = Object.assign({}, defaultSettings, settings);

  this.GeoCodeCalc = {};
  this.popuptemplate = Handlebars.compile(document.getElementById(this.settings.popupTemplate).innerHTML);

  this.init();
}

StoreWays.prototype.init = function () {
  var storeData = this.settings.storeData;
  var lengthUnit = this.settings.lengthUnit;

  this.GeoCodeCalc.EarthRadius = lengthUnit === 'km' ? 6367 : 3956;
  this.defineDistance(storeData);
  this.sortBy(storeData, 'distance');
  this.renderMap(storeData);
  this.renderList(storeData);
};

StoreWays.prototype.updateData = function (newData) {
  this.settings.storeData = newData;
  if (this.map !== undefined && this.map !== null) {
    this.map.remove();
  }
  this.init();
};

StoreWays.prototype.renderMap = function (storeData) {
  var defaultlat = this.settings.defaultlat;
  var defaultlng = this.settings.defaultlng;
  var mapID = this.settings.mapID;
  this.markers = [];
  this.map = L.map(mapID).setView([defaultlat, defaultlng], 3);
  this.mapLayer = L.layerGroup().addTo(this.map);
  this.mapLayer.clearLayers();

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);

  for (var i = 0; i < storeData.length; i++) {
    var el = storeData[i];
    var lat = el.lat;
    var lng = el.lng;
    var marker = L.marker([lat, lng]).bindPopup(this.popuptemplate(el)).addTo(this.mapLayer);
    this.markers.push(marker)
  }
  this.map.addLayer(this.mapLayer);
  this.map.fitBounds(storeData.map(function (el) {
    return [el.lat, el.lng];
  }));
};

StoreWays.prototype.renderList = function (storeData) {
  var storeListWrapper = this.settings.storeListWrapper;
  var listTemplate = this.settings.listTemplate;
  var source = document.getElementById(listTemplate).innerHTML;
  var template = Handlebars.compile(source);
  var list = document.createElement('ul');
  var items = storeData.map(function (el) {
    var item = document.createElement('li');
    item.className = 'list-item';
    item.innerHTML = template(el);
    item.addEventListener('click', function (e) {
      var index = Array.prototype.indexOf.call(e.currentTarget.parentNode.children, e.currentTarget);
      var thisMarker = this.markers[index];
      var pos = this.map.latLngToLayerPoint(thisMarker.getLatLng());
      pos.y -= 25;
      var fx = new L.PosAnimation();
      fx.once('end', function () {
        pos.y += 25;
        fx.run(thisMarker._icon, pos, 0.8);
      });
      this.map.panTo(thisMarker.getLatLng());
      fx.run(thisMarker._icon, pos, 0.3);
      thisMarker.openPopup();
    }.bind(this));
    return item;
  }.bind(this));
  for (var j = 0; j < items.length; j++) {
    list.appendChild(items[j]);
  }
  var container = document.getElementsByClassName(storeListWrapper)[0];
  container.innerHTML = '';
  container.appendChild(list);
};

StoreWays.prototype.defineDistance = function (storeData) {
  var defaultlat = this.settings.defaultlat;
  var defaultlng = this.settings.defaultlng;
  for (var i = 0; i < storeData.length; i++) {
    var el = storeData[i];
    var lat = el.lat;
    var lng = el.lng;
    var _distance = this.geoCodeCalcCalcDistance(defaultlat, defaultlng, lat, lng, this.GeoCodeCalc.EarthRadius);
    el.distance = _distance.toFixed(2);
    if (this.settings.lengthUnit === 'm') {
      el.altdistance = (parseFloat(el.distance) * 1.609344).toFixed(2);
      el.length = this.settings.milesLang;
      el.altlength = this.settings.kilometerLang;
    } else if (this.settings.lengthUnit === 'km') {
      el.length = this.settings.kilometerLang;
      el.altlength = this.settings.milesLang;
      el.altdistance = (parseFloat(el.distance) / 1.609344).toFixed(2);
    }
  }
};

StoreWays.prototype.sortBy = function (storeData, property) {
  storeData.sort(function (a, b) {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  });
};

StoreWays.prototype.geoCodeCalcToRadian = function (v) {
  return v * (Math.PI / 180);
};

StoreWays.prototype.geoCodeCalcDiffRadian = function (v1, v2) {
  return this.geoCodeCalcToRadian(v2) - this.geoCodeCalcToRadian(v1);
};

StoreWays.prototype.geoCodeCalcCalcDistance = function (lat1, lng1, lat2, lng2, radius) {
  return radius * 2 * Math.asin(Math.min(1, Math.sqrt((Math.pow(Math.sin((this.geoCodeCalcDiffRadian(lat1, lat2)) / 2.0), 2.0) + Math.cos(this.geoCodeCalcToRadian(lat1)) * Math.cos(this.geoCodeCalcToRadian(lat2)) * Math.pow(Math.sin((this.geoCodeCalcDiffRadian(lng1, lng2)) / 2.0), 2.0)))));
};

StoreWays.prototype.validateOptions = function () {
  if (!window.L) throw Error("LeafletJS is required.");
  if (!window.Handlebars) throw Error("Handlebars is required.");
  var settings = this.settings;
  if (!settings.storeData && !settings.storeDataUrl) {
    throw Error("Required data source is missing.");
  }
  if (!settings.listTemplate || !settings.popupTemplate) {
    throw Error('Templates for list and popup are required');
  }
};