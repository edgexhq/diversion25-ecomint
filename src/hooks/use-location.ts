"use client";

import { getIpLocation } from "@/actions/location";
import { useCallback, useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const getLocation = useCallback(async () => {
    try {
      if ("geolocation" in navigator) {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 8000,
              maximumAge: 10,
            });
          }
        );

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    } catch (error) {
      console.log("Falling back to IP location. Error : ", error);
      try {
        const ipLocation = await getIpLocation();
        setLocation({
          latitude: ipLocation.lat,
          longitude: ipLocation.lon,
        });
      } catch (ipError) {
        console.error("Error getting IP location:", ipError);
      }
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { location, setLocation };
};
