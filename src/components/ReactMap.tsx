import { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

function UpdateMapCenter({ center }: { center: number[] }) {
  const map = useMap();

  useEffect(() => {
    if (map && center && Array.isArray(center) && center.length === 2) {
      map.setView([center[0], center[1]], map.getZoom(), {
        animate: true,
        duration: 1.2,
      });
    }
  }, [center, map]);

  return null;
}

interface DraggableMarkerProps {
  position: LatLngExpression;
  onPositionChange: (position: LatLngExpression) => void;
  popupText: string;
  draggable?: boolean;
}

const DraggableMarker = ({
  position,
  onPositionChange,
  popupText,
  draggable = true,
}: DraggableMarkerProps) => {
  const [markerPosition, setMarkerPosition] =
    useState<LatLngExpression>(position);
  const [displayText, setDisplayText] = useState(popupText);

  useEffect(() => {
    setMarkerPosition(position);
    setDisplayText(popupText);
  }, [position, popupText]);

  const eventHandlers = useMemo(
    () => ({
      dragend: (e: L.LeafletEvent) => {
        const marker = e.target as L.Marker;
        const newPosition = marker.getLatLng();
        const latLng: LatLngExpression = [newPosition.lat, newPosition.lng];
        setMarkerPosition(latLng);
        onPositionChange(latLng);
      },
    }),
    [onPositionChange]
  );

  return (
    <Marker
      position={markerPosition}
      draggable={draggable}
      eventHandlers={eventHandlers}
      icon={
        new L.Icon({
          iconUrl: "https://i.postimg.cc/VsCDfDbf/tree-marker1.png",
          iconSize: [46, 54],
          iconAnchor: [30, 40],
        })
      }
    >
      <Popup>{displayText}</Popup>
    </Marker>
  );
};

// const LocationMarker = ({
//   position,
//   name,
// }: {
//   position: LatLngExpression;
//   name: string;
// }) => {
//   return (
//     <Marker position={position}>
//       <Popup>
//         <div className="flex items-center">
//           <TriangleAlert className="mr-2" />
//           {name}
//         </div>
//       </Popup>
//     </Marker>
//   );
// };

export default function ReactMap({
  center = [22.5, 88.4],
  showCenter = true,
  zoom = 15,
  markerText = "Location",
  isDraggable = true,
  onMarkerPositionChange = (newPosition: LatLngExpression) =>
    console.log("Marker position:", newPosition),
  //   crimes = [] as { position: LatLngExpression; name: string }[],
}) {
  const [key, setKey] = useState(0);
  const centerCoords = useMemo(() => [center[0], center[1]], [center]);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [centerCoords]);

  const markerPositionChangeHandler = useCallback(
    (newPosition: LatLngExpression) => {
      onMarkerPositionChange(newPosition);
    },
    [onMarkerPositionChange]
  );
  return (
    <div className="size-full">
      <MapContainer
        key={key}
        center={[center[0], center[1]]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="size-full rounded-lg"
      >
        <UpdateMapCenter center={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {showCenter && (
          <DraggableMarker
            position={[center[0], center[1]]}
            onPositionChange={markerPositionChangeHandler}
            popupText={markerText}
            draggable={isDraggable}
          />
        )}
        {/* {crimes &&
          crimes.map((crime, index) => (
            <LocationMarker
              key={index}
              position={crime.position}
              name={crime.name}
            />
          ))} */}
      </MapContainer>
    </div>
  );
}
