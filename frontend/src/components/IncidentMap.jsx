import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔴 Responder icon
const responderIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function IncidentMap({ location }) {
  const [responderLoc, setResponderLoc] = useState(null);

  // ✅ STEP 1: INITIALIZE responder (VERY IMPORTANT)
  useEffect(() => {
    if (!location) return;

    setResponderLoc({
      lat: location.lat + 0.02, // far so visible
      lng: location.lng - 0.02,
    });
  }, [location]);

  // ✅ STEP 2: MOVE responder
  useEffect(() => {
    if (!responderLoc || !location) return;

    const interval = setInterval(() => {
      setResponderLoc((prev) => {
        if (!prev) return prev;

        const latDiff = location.lat - prev.lat;
        const lngDiff = location.lng - prev.lng;

        return {
          lat: prev.lat + latDiff * 0.08,
          lng: prev.lng + lngDiff * 0.08,
        };
      });
    }, 300); // smooth

    return () => clearInterval(interval);
  }, [responderLoc, location]);

  // loading
  if (!location) {
    return (
      <p style={{ color: "#6B7280", textAlign: "center", marginTop: "10px" }}>
        📍 Getting location...
      </p>
    );
  }

  return (
    <div
      style={{
        marginTop: "12px",
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={14} // zoom out so both visible
        style={{ height: "250px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🔵 User */}
        <Marker position={[location.lat, location.lng]}>
          <Popup>🚨 You (SOS)</Popup>
        </Marker>

        {/* 🔴 Responder */}
        {responderLoc && (
          <Marker
            position={[responderLoc.lat, responderLoc.lng]}
            icon={responderIcon}
          >
            <Popup>👨‍🚒 Responder (on the way)</Popup>
          </Marker>
        )}

        {/* 🔥 LINE BETWEEN USER & RESPONDER */}
{responderLoc && (
  <Polyline
    positions={[
      [location.lat, location.lng],
      [responderLoc.lat, responderLoc.lng],
    ]}
    pathOptions={{ color: "red", weight: 3 }}
  />
)}

      </MapContainer>
    </div>
  );
}