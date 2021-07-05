import {enableActivePageState} from './toggle-page-state.js';
import {createAnnouncementCard} from './create-announcement-card.js';

const DEFAULT_MAP_ZOOM = 13;

const DefaultCoordinates = {
  lat: 35.68152,
  lng: 139.75372,
};

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let map;

const renderMap = () => {
  map = L.map('map-canvas').on('load', enableActivePageState).setView(DefaultCoordinates, DEFAULT_MAP_ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map);
};

const createMainMarker = () => L.marker(DefaultCoordinates, {draggable: true, icon: mainMarkerIcon}).addTo(map);

const resetMainMarker = (marker) => {
  marker.setLatLng(DefaultCoordinates);
  map.setView(DefaultCoordinates, DEFAULT_MAP_ZOOM);
};

const createMarker = (announcement, targetObject = map) => {
  const marker = L.marker(announcement.location, {icon: markerIcon});
  marker.addTo(targetObject).bindPopup(createAnnouncementCard(announcement), {keepInView: true});
  return marker;
};

const createMarkerGroup = (announcements) => {
  const markerGroup = L.layerGroup().addTo(map);
  announcements.forEach((announcement) => createMarker(announcement, markerGroup));
  return markerGroup;
};

export {renderMap, createMainMarker, resetMainMarker, createMarker, createMarkerGroup};
