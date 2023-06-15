class StoreWays {
    #map
    #markers = []
    constructor(options = {}) {
        const defaultOptions = {
            color: 'red',
            bgColor: 'red',
            mapID: 'swMap',
        };
        if (!options.data && !options.dataUrl) {
            throw new Error('Required data source is missing.');
        }
        if (!window.L) {
            throw new Error('LeafletJS is required.');
        }
        this.options = { ...defaultOptions, ...options };
    }
    init() {
        const { color, bgColor } = this.options;
        if (!this.options.data) {
            this.data = this.options.dataUrl
        }
        this.#map = L.map(this.options.mapID).setView([38.947464, 25.320826], 3);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(this.#map);
        setTimeout(() => {
            this.options.data.forEach((el, i) => {
                const { company, lat, lng } = el
                this.#markers[i] = L.marker([lat, lng]).bindPopup(company).addTo(this.#map);
            })
        }, 1000);
    }

    /**
     * @param {string} url
     */
    set data(url) {
        fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        }).then((responseJson) => {
            this.options.data = responseJson;
        }).catch((error) => {
            console.log(error)
        });
    }

    get data() {
        return this.options.data
    }
}

window.StoreWays = StoreWays;

window.MyNamespace = {
    Plugin: StoreWays
};