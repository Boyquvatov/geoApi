import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Leaflet = ({ data }) => {
  const position = data?.location?.lat ? [data.location.lat, data.location.lng] : [41.37222, 69.38167];
  
  if (!data?.location?.lat || !data?.location?.lng) {
    console.warn('Latitude or Longitude data is missing.');
  }
  
  return (
    <div>
      <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: 'auto', width: '80%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Latitude: {position[0]}<br />
            Longitude: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Leaflet;
