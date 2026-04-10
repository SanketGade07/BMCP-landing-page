"use client";

import { useState, useEffect } from 'react';

interface GeoLocation {
  city: string;
  region: string;
  pincode: string;
  country: string;
  ip: string;
}

const useGeoLocation = (): GeoLocation | null => {
  const [location, setLocation] = useState<GeoLocation | null>(null);

  useEffect(() => {
    const fetchGeo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) return;
        const data = await response.json();
        setLocation({
          city: data.city,
          region: data.region,
          pincode: data.postal,
          country: data.country_name,
          ip: data.ip,
        });
      } catch (err) {
        console.error('Geo fetch failed:', err);
      }
    };
    fetchGeo();
  }, []);

  return location;
};

export default useGeoLocation;
