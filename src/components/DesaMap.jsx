'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { kml } from '@tmcw/togeojson';

import L from 'leaflet';

// Fix broken marker images in Next.js + Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to center map on the bounds of the GeoJSON data
function MapFitter({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, bounds]);
  return null;
}

export default function DesaMap() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    async function loadKml() {
      try {
        const response = await fetch('/batas-desa.kml');
        const kmlText = await response.text();
        
        // Parse KML to XML Document
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(kmlText, 'text/xml');
        
        // Convert to GeoJSON
        const converted = kml(xmlDoc);
        
        // Remove ONLY the Point feature (pin) that has no name (default center pin) or is named "Desa Salamrejo"
        if (converted && converted.features) {
          converted.features = converted.features.filter(f => {
            if (f?.geometry?.type === 'Point') {
              const name = f?.properties?.name;
              // Exclude if it has no name (which becomes 'Desa Salamrejo' in popup) or explicitly matches
              if (!name || name === 'Desa Salamrejo') {
                return false;
              }
            }
            return true;
          });
        }
        
        setGeoData(converted);
      } catch (err) {
        console.error('Failed to load or parse KML:', err);
      }
    }
    loadKml();
  }, []);

  const onEachFeature = (feature, layer) => {
    const props = feature.properties || {};
    const name = props.name || 'Desa Salamrejo';
    
    layer.bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif;">
        <h4 style="margin:0; font-weight:700; color:var(--desa-ink); font-size: 15px;">${name}</h4>
      </div>
    `);
  };

  return (
    <div style={{ width: '100%', height: 450, borderRadius: 24, overflow: 'hidden', position: 'relative', zIndex: 1, backgroundColor: '#e5e5e5' }}>
      <MapContainer 
        center={[-8.25, 112.3]} // Fallback center (Blitar approx)
        zoom={14} 
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON 
            data={geoData} 
            onEachFeature={onEachFeature}
            style={() => ({
              color: '#D4882A',
              weight: 3,
              opacity: 0.8,
              fillColor: '#D4882A',
              fillOpacity: 0.15
            })}
            ref={(ref) => {
              // Automatically fit bounds once data is loaded and layer is created
              if (ref) {
                const map = ref._map;
                if (map) {
                  map.fitBounds(ref.getBounds(), { padding: [20, 20] });
                }
              }
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
