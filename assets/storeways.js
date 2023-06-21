class StoreWays {
    #map; #markers = []
    constructor(settings = {}) {
        const defaultSettings = {
            defaultlat: 38.947464,
            defaultlng: 25.320826,
            lengthUnit: 'm',
            milesLang: 'miles',
            kilometerLang: 'kilometers',
            mapID: 'swMap',
            storeListWrapper: 'sw-store-list',
        };

        this.settings = { ...defaultSettings, ...settings };
        this.GeoCodeCalc = {};
        this.validateOptions();
        this.popuptemplate = Handlebars.compile(document.getElementById(this.settings.popupTemplate).innerHTML);
    }

    async init() {
        const { lengthUnit, storeData, storeDataUrl } = this.settings
        this.GeoCodeCalc.EarthRadius = lengthUnit === 'km' ? 6367 : 3956  // Calculate geocode distance functions
        if (!storeData) {
            await this.getStoreData(storeDataUrl); // load data from json 
        }
        this.defineDistance()
        this.sortBy('distance')
        this.renderMap()
        this.renderList()
    }

    async getStoreData(url) {
        try {
            const response = await fetch(url)
            const data = await response.json()
            this.settings.storeData = data
        } catch (error) {
            console.log(error)
        }
    }

    renderMap() {
        const { storeData, defaultlat, defaultlng, mapID } = this.settings
        this.#map = L.map(mapID).setView([defaultlat, defaultlng], 3)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(this.#map);
        storeData.forEach((el, i) => {
            const { lat, lng } = el
            this.#markers[i] = L.marker([lat, lng]).bindPopup(this.popuptemplate(el)).addTo(this.#map);
        })
        this.#map.fitBounds(storeData.map(el => [el.lat, el.lng]));
    }

    renderList() {
        const { storeData, storeListWrapper, listTemplate } = this.settings
        const source = document.getElementById(listTemplate).innerHTML;
        const template = Handlebars.compile(source);
        const list = document.createElement('ul')
        const items = storeData.map(el => {
            const item = document.createElement('li')
            item.className = 'list-item'
            item.innerHTML = template(el)
            item.addEventListener('click', (e) => {
                const index = [...e.currentTarget.parentNode.children].indexOf(e.currentTarget);
                const thisMarker = this.#markers[index]
                var pos = this.#map.latLngToLayerPoint(thisMarker.getLatLng());
                pos.y -= 25;
                var fx = new L.PosAnimation();
                fx.once('end', function () {
                    pos.y += 25;
                    fx.run(thisMarker._icon, pos, 0.8);
                });
                this.#map.panTo(thisMarker.getLatLng())
                fx.run(thisMarker._icon, pos, 0.3);
                thisMarker.openPopup();
            })
            return item
        })
        items.forEach(el => list.appendChild(el))
        const container = document.getElementsByClassName(storeListWrapper)[0]
        container.appendChild(list)
    }

    defineDistance() {
        const { storeData, defaultlat, defaultlng } = this.settings
        storeData.forEach(el => {
            const { lat, lng } = el
            const _distance = this.geoCodeCalcCalcDistance(defaultlat, defaultlng, lat, lng, this.GeoCodeCalc.EarthRadius);
            el.distance = _distance.toFixed(2)
            if (this.settings.lengthUnit === 'm') {
                el.altdistance = (parseFloat(el.distance) * 1.609344).toFixed(2);
                el.length = this.settings.milesLang;
                el.altlength = this.settings.kilometerLang;
            } else if (this.settings.lengthUnit === 'km') {
                el.length = this.settings.kilometerLang;
                el.altlength = this.settings.milesLang;
                el.altdistance = (parseFloat(el.distance) / 1.609344).toFixed;
            }
        })
    }

    sortBy(property) {
        const { storeData } = this.settings
        storeData.sort((a, b) => (a[property] < b[property]) ? -1 : ((a[property] > b[property]) ? 1 : 0))
    }

    geoCodeCalcToRadian(v) {
        return v * (Math.PI / 180);
    }
    geoCodeCalcDiffRadian(v1, v2) {
        return this.geoCodeCalcToRadian(v2) - this.geoCodeCalcToRadian(v1);
    }
    geoCodeCalcCalcDistance(lat1, lng1, lat2, lng2, radius) {
        return radius * 2 * Math.asin(Math.min(1, Math.sqrt((Math.pow(Math.sin((this.geoCodeCalcDiffRadian(lat1, lat2)) / 2.0), 2.0) + Math.cos(this.geoCodeCalcToRadian(lat1)) * Math.cos(this.geoCodeCalcToRadian(lat2)) * Math.pow(Math.sin((this.geoCodeCalcDiffRadian(lng1, lng2)) / 2.0), 2.0)))));
    }

    validateOptions() {
        if (!window.L) throw Error("LeafletJS is required.");
        if (!window.Handlebars) throw Error("Handlebars is required.");
        const { settings } = this
        if (settings && !settings.storeData && !settings.storeDataUrl) throw Error("Required data source is missing.");
        if (!settings.listTemplate || !settings.popupTemplate) {
            throw Error('Templates for list and popup are required')
        }
    }
}

window.StoreWays = StoreWays;

window.MyNamespace = {
    Plugin: StoreWays
};