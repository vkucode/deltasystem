'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FlipNavWrapper from '../components/NewNavbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { locationData } from './locationData';
import Link from 'next/link';
import styles from './location.module.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ImgFooter from '../components/ImgFooter';
import 'animate.css';
import ContactForm from '../components/ContactForm';

export default function LocationPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);  // State to track hovered item
  const mapRef = useRef(null);
  const router = useRouter();

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const goToAnnonce = useCallback((id) => {
    router.push(`/location/locals/${id}`);
  }, [router]);

  const initializeIcon = useCallback(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      setIcon({
        url: '/icon 4.png',
        scaledSize: new window.google.maps.Size(35, 35),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17.5, 17.5)
      });
      console.log("Google Maps script loaded and icon set");
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await locationData();
        console.log('Fetched Data:', fetchedData); // Debug: Log fetched data
        if (fetchedData.length === 0) {
          setError("Failed to fetch data or no data available.");
        } else {
          const filteredData = fetchedData
            .filter(item => item.category === 'location')
            .map(item => ({
              ...item,
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon)
            }));
          console.log('Filtered Data:', filteredData); // Debug: Log filtered data
          setData(filteredData);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching data:', err); // Debug: Log errors
        setError("An error occurred while fetching data.");
      }
    };

    loadData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <FlipNavWrapper />
      <section className={styles.achatPage}>
        <section className={`animate__animated animate__fadeIn ${styles.localsShow}`}>
          {data.length > 0 ? (
            data.map((item) => (
              <Link
                href={`/location/locals/${item._id}`}
                key={item._id}
                className={styles.localsCard}
                onMouseEnter={() => setHoveredItem(item._id)}  // Set hovered item on mouse enter
                onMouseLeave={() => setHoveredItem(null)}      // Reset hovered item on mouse leave
              >
                <div className={styles.bgImg}>
                  <div className={`${styles.overlayBg} ${hoveredItem === item._id ? 'animate__fadeOutDown flex' : 'flex animate__fadeInUp'} animate__animated flex-col justify-center items-center`} style={{transition: "0.2s all ease-in-out"}} > 
                    <Image src="/assets/img/accueil/iconFiltreWhite.png" width={100} height={100} alt='filtre' />
                  </div>
                  <Image src={`https://deltainvested.com/imgs/locals/location/${item.img}`} width={400} height={400} alt={item.name} />
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
            ))
          ) : (
            <div className={styles.voidContainer}>
              <Image src="/assets/img/accueil/iconFiltreGreen.png" width={100} height={100} alt='logo' />
              <h2>
                Rien à afficher pour le moment
              </h2>
            </div>
          )}
        </section>
        <section className={`animate__animated animate__fadeIn ${styles.mapShow}`}>
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
                  onClick={() => goToAnnonce(item._id)}
                  icon={icon}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </section>
      </section>
      <ContactForm />
      <ImgFooter imgSrc="/assets/img/footer/city2.png" />
      <Footer />
    </>
  );
}
