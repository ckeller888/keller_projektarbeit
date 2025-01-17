
export const BASE_LAYERS = [
    {
        name: "Swiss Base Map Grau",
        attribution: "swisstopo",
        url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg",
        checked: true,
        minZoom: 2,
        maxZoom: 18,
        bounds: [
          [45.398181, 5.140242],
          [48.230651, 11.47757],
        ],
    },
    {
        name: "Swiss Base Map Farbig",
        attribution: "swisstopo",
        url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
        minZoom: 2,
        maxZoom: 18,
        bounds: [
          [45.398181, 5.140242],
          [48.230651, 11.47757],
        ],
    },
    {
        name: "Swiss Orthophoto",
        attribution: "swisstopo",
        url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg",
        minZoom: 2,
        maxZoom: 18,
        bounds: [
          [45.398181, 5.140242],
          [48.230651, 11.47757],
        ],
    },
];
