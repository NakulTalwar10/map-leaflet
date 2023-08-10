import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ selectedCountry }) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (selectedCountry && map) {
            const latlng = L.latLng(selectedCountry.latlng[0], selectedCountry.latlng[1]);
            map.flyTo(latlng, 4); // Adjust zoom level as needed
        }
    }, [selectedCountry, map]);

    const saveMap = (mapInstance) => {
        setMap(mapInstance);
    };

    return (
        <MapContainer ref={saveMap} center={[0, 0]} zoom={1} style={{ height: '80vh', width: '100%', border: '2px solid red' }} dragging={true} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            />
            {selectedCountry && (
                <Marker position={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}>
                    <Popup>
                        <div>
                            <h2>{selectedCountry.name}</h2>
                            {/* ... (display other country details) */}
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
