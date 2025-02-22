"use server";

export type IpLocationResponse = {
  country: string;
  regionName: string;
  city: string;
  district?: string;
  zip: string;
  lat: number;
  lon: number;
};

export async function getIpLocation(ip?: string) {
  const response = await fetch(
    `http://ip-api.com/json/${
      ip ?? ""
    }?fields=country,regionName,city,district,zip,lat,lon`
  );
  return (await response.json()) as IpLocationResponse;
}

export const geocodeAddress = async (address: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }
};

export const handleMarkerPositionChange = async (
  newPosition: number[]
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition[0]}&lon=${newPosition[1]}`
    );
    const data = await response.json();
    if (data.display_name) {
      return data.display_name;
    }
  } catch (err) {
    console.error("Error reverse geocoding:", err);
  }
  return undefined;
};

export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    if (data.display_name) {
      return data.display_name;
    }
  } catch (err) {
    console.error("Error reverse geocoding:", err);
  }
  return undefined;
};
