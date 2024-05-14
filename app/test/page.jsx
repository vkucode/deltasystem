'use client'
import React from 'react'
import { useState, useRef } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';




const page = () => {

  const containerStyle = {
    width: '500px',
    height: '500px'
  };
  const google_key = process.env.GOOGLE_MAP_API;
  
  const center = {
    lat: 25.197420260687252,
    lng: 55.27459097432637
  };
  const [icon, setIcon] = useState(null);

   const createIcon = () => ({
    url: '/icon 1.png',
    scaledSize: new window.google.maps.Size(35, 35),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(17.5, 17.5)
  });

  return (
    <LoadScript
    googleMapsApiKey={google_key}
    onLoad={() => setIcon(createIcon())} // Setează iconul după încărcarea scriptului
  >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {icon && <Marker
        position={{ lat: 25.197420260687252, lng: 55.27459097432637 }}
        icon={icon}
      />}
    </GoogleMap>
  </LoadScript>
  )
}

export default page