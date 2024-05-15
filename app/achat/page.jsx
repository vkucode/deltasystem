'use client'
import React, {useState, useEffect, useRef, useCallback} from 'react';
// import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import FlipNavWrapper from '../components/NewNavbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { achatData } from './achatData';
import Link from 'next/link';
import styles from './achat.module.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


export default function AchatPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState(null);
  const mapRef = useRef(null);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };


  const initializeIcon = useCallback(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      setIcon({
        url: '/icon 1.png',
        scaledSize: new window.google.maps.Size(35, 35),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17.5, 17.5)
      });
      console.log("Google Maps script loaded and icon set");
    }
  }, []);


  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await achatData();
      if (fetchedData.length === 0) {
        setError("Failed to fetch data or no data available.");
      } else {
        // Convert lat and lon to numbers
        const convertedData = fetchedData.map(item => ({
          ...item,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        }));
        setData(convertedData);
        setError(null);
      }
    };

    loadData();
  }, []);
  if (error) return <div>Error: {error}</div>;
  // if (!icon) return <div>Loading map...</div>; // Ensure icon is loaded

  return (
    <>
      {/* <Navbar /> */}
      <FlipNavWrapper />
      <section className={styles.achatPage}>
        <section className={styles.localsShow}>
          {data.map((item) => (
            <Link href={`/achat/locals/${item._id}`} key={item._id} className={styles.localsCard}>
                <div className={styles.bgImg}>
                  <Image src={`/assets/img/locals/achat/${item.img}`} width={400} height={400} alt={item.name} />
                </div>
                <div className={styles.cardContent}>
                  <h1>{item.name}</h1>
                  <div className='flex flex-row gap-2'>
                    <span>{item.chambre}&nbsp;Chambres</span>
                    <span>{item.surface}&nbsp;m<sup>2</sup></span>
                  </div>
                  <h2>{item.price}</h2>
                  <div className='hidden'>
                    <p>{item.lat}</p>
                    <p>{item.lon}</p>
                  </div>
              </div>
            </Link>
          ))}
        </section>
        <section className={styles.mapShow}>
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
            onLoad={initializeIcon}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat: 25.197212026924976, lng: 55.274351126421536 }}
              zoom={11}
              ref={mapRef}
            >
              {icon && data.map((item) => (
                <Marker
                  key={item._id}
                  position={{ lat: item.lat, lng: item.lon }}
                  icon={icon}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </section>
      </section>
      <Footer />
    </>
  );
}
