import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { usePlaces } from "../../Contexts/PlacesProvider";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useParamUrl } from "../../hooks/useParamUrl";
import UserLogged from "./UserLogged";
import toast from "react-hot-toast";

function Map() {
  useEffect(function () {
    toast.success("It may take a while for the data from the hoster to fetch");
  }, []);
  const { data, mapPosition, setMapPosition } = usePlaces();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useParamUrl();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng, setMapPosition]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition, setMapPosition]
  );

  return (
    <div id="map">
      <MapContainer
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        {!geoLocationPosition && (
          <button onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
          </button>
        )}
        <UserLogged />
        <TileLayer
          attribution='&copy; <a href="https://cartodb.com/attributions">CartoDB</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          subdomains="abcd"
        />
        {data.map((places) => (
          <Marker
            position={[places.position.lat, places.position.lng]}
            key={places.id}
          >
            <Popup autoClose={false} closeOnClick={false}>
              <p>
                {places.emoji} {places.country}
              </p>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
