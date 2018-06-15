import Chroma from 'chroma-js';

export const MAP_STYLES = [
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7c93a3' }, { lightness: '-10' }]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#a0a4a5' }]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#62838e' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{ color: '#dde3e3' }]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#3f4a51' }, { weight: '0.30' }]
  },
  { featureType: 'poi', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'poi.attraction', stylers: [{ visibility: 'on' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.government', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
  { featureType: 'poi.place_of_worship', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.school', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.sports_complex', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'road',
    stylers: [{ saturation: '-100' }, { visibility: 'on' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      { saturation: '-7' },
      { invert_lightness: true },
      { lightness: '3' },
      { gamma: '1.80' },
      { weight: '0.01' }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#bbcacf' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#bbcacf' }, { lightness: '0' }, { weight: '0.50' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#a9b4b8' }]
  },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#a3c7df' }]
  }
];

export const MAP_DEFAULT_COORDINATES = {
  lat: 52.14347,
  lng: 19.545416
};

export const MAP_DEFAULT_ZOOM = 6;

export const MAP_MODES = {
  temperature: 'temp',
  temperatureGrid: 'temp_grid',
  visibility: 'visibility',
  pressure: 'pressure',
  wind: 'wind_speed'
};

export const getColorFromTemp = (tempInF, bottom, top) => {
  // establish the chroma 'scale' object
  const tempScaleColors = [
    '#21006B',
    '#4C006B',
    '#6B006B',
    '#990099',
    '#B300B3',
    '#CC00CC',
    '#E600E6',
    '#FF02FF',
    '#D100FF',
    '#9E01FF',
    '#6600FF',
    '#1800FF',
    '#144AFF',
    '#0E74FF',
    '#00A4FF',
    '#00CBFF',
    '#00E6FF',
    '#00FFFF',
    '#01FFB3',
    '#7FFF00',
    '#CEFF00',
    '#FEFF00',
    '#FFE601',
    '#FFCB00',
    '#FFAE00',
    '#FF9900',
    '#FE7F00',
    '#FF4F00',
    '#FF0700',
    '#FF4545',
    '#FF6968',
    '#FF8787',
    '#FF9E9E',
    '#FFB5B5',
    '#FFCFCF',
    '#FFE8E8',
    '#EEEEEE'
  ];
  const tempScale = Chroma.scale(tempScaleColors)
    .domain([bottom, top])
    .mode('lab');
  // extract color from chroma scale by giving it a temp number
  const color = tempScale(tempInF);
  return color.rgb();
};

export const toFarenheit = tempCelc =>
  (tempCelc.toFixed(1) * 1.8 + 32).toFixed(1);
