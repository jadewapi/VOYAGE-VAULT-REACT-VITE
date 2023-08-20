import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { usePlaces } from "../../Contexts/PlacesProvider";

function Map() {
  const navigate = useNavigate();
  const { data } = usePlaces();

  return (
    <div id="map" onClick={() => navigate("form")}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((places) => (
          <Marker
            position={[places.position.lat, places.position.lng]}
            key={places.id}
          >
            <Popup>
              <p>
                {places.emoji} {places.country}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
