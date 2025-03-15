import React from "react";

interface Mosque {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
  distance: number;
  confidence: number;
  openingHours?: string;
}

interface GeocodingEarthFeature {
  properties: {
    id: string;
    name: string;
    address: string;
    locality: string;
    country: string;
    distance: number;
    confidence: number;
    opening_hours?: string;
  };
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
}

interface GeocodingEarthResponse {
  features: GeocodingEarthFeature[];
}

async function findMosquesWithGeocodingEarth(
  lat: number,
  lng: number,
  radius: number = 1000
): Promise<Mosque[]> {
  // Use environment variable correctly in Next.js
  const apiKey: string = process.env.NEXT_PUBLIC_GEOCODE_API_KEY || "";
  
  const url: string = `https://api.geocoding.earth/v1/places?categories=worship.muslim&point.lat=${lat}&point.lon=${lng}&boundary.circle.radius=${radius}&size=20&key=${apiKey}`;

  try {
    // For Next.js Server Components, we need to specify cache options
    const response = await fetch(url, { 
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: 'force-cache' 
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: GeocodingEarthResponse = await response.json();
    
    if (!data.features || data.features.length === 0) {
      return [];
    }

    return data.features
      .map((feature: GeocodingEarthFeature) => {
        const coordinates: [number, number] = feature.geometry.coordinates;
        return {
          id: feature.properties.id,
          name: feature.properties.name || "Unknown Mosque",
          lat: coordinates[1],
          lng: coordinates[0],
          address: feature.properties.address || "",
          city: feature.properties.locality || "",
          country: feature.properties.country || "",
          distance: feature.properties.distance || 0,
          confidence: feature.properties.confidence || 0,
          openingHours: feature.properties.opening_hours,
        };
      })
      .sort((a: Mosque, b: Mosque) => a.distance - b.distance);
  } catch (error) {
    console.error("Error fetching mosque data:", error);
    return [];
  }
}

const Page = async () => {
  try {
    const mosques = await findMosquesWithGeocodingEarth(
      29.97407229011838,
      32.511279079303264
    );
    
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Nearby Mosques</h1>
        {mosques.length > 0 ? (
          <ul className="space-y-4">
            {mosques.map((mosque) => (
              <li key={mosque.id} className="border p-3 rounded shadow">
                <h2 className="font-semibold text-lg">{mosque.name}</h2>
                <p className="text-gray-600">{mosque.address}</p>
                <p className="text-sm">Distance: {mosque.distance.toFixed(2)} meters</p>
                {mosque.openingHours && (
                  <p className="text-sm mt-1">Hours: {mosque.openingHours}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No mosques found nearby. Try increasing the search radius.</p>
        )}
      </div>
    );
  } catch (error) {
    return <div className="p-4 text-red-500">Error loading mosque data. Please try again later.</div>;
  }
};

export default Page;