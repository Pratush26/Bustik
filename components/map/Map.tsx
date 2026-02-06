"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { STATION_COORDINATES } from "@/lib/data"
import L from "leaflet"
import { useEffect } from "react"

// Fix for default marker icon missing in Leaflet + Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function Map() {
    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border">
            <MapContainer
                center={[23.8103, 90.4125]}
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {STATION_COORDINATES.map((city) => (
                    <Marker
                        key={city.name}
                        position={[city.lat, city.lng]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="font-bold">{city.name}</div>
                            <div className="text-sm">Bustik Terminal</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
