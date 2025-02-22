"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "@/hooks/use-location";
import { LatLngExpression } from "leaflet";

interface FormData {
  tree: {
    latitude: string;
    longitude: string;
    [key: string]: string;
  };
}

interface MapPlaceholderProps {
  latitude: string;
  longitude: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export function MapPlaceholder({
  latitude,
  longitude,
  setFormData,
}: MapPlaceholderProps) {
  const { location } = useLocation();
  const [localLat, setLocalLat] = useState(latitude);
  const [localLng, setLocalLng] = useState(longitude);

  const ReactMap = useMemo(
    () =>
      dynamic(() => import("@/components/ReactMap"), {
        loading: () => (
          <div className="size-full animate-pulse bg-muted grid place-items-center">
            <Loader className="size-8 text-primary animate-spin" />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    if (location) {
      setLocalLat(location.latitude.toString());
      setLocalLng(location.longitude.toString());
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info(
        "You can move the map marker to place it more accurately 📍🌍😉"
      );
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "latitude") {
      setLocalLat(value);
    } else {
      setLocalLng(value);
    }
    setFormData((prev: any) => ({
      ...prev,
      tree: {
        ...prev.tree,
        [name]: value,
      },
    }));
  };

  const handleMarkerChange = async (positions: LatLngExpression) => {
    if (!Array.isArray(positions) || positions.length !== 2) return;

    const [lat, lng] = positions;
    setLocalLat(lat.toString());
    setLocalLng(lng.toString());

    setFormData((prev) => ({
      ...prev,
      tree: {
        ...prev.tree,
        latitude: lat.toString(),
        longitude: lng.toString(),
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            value={localLat}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            value={localLng}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="w-full h-[400px] rounded-lg overflow-hidden border">
        <ReactMap
          center={[parseFloat(localLat) || 22.5, parseFloat(localLng) || 88.4]}
          onMarkerPositionChange={handleMarkerChange}
        />
      </div>
    </div>
  );
}
