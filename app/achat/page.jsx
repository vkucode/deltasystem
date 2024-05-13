'use client'
import React, {useState, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { achatData } from './achatData';
import Link from 'next/link';
import styles from './achat.module.scss';

// Importuri dinamice pentru componentele de la react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
  ssr: false
});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false
});
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false
});

export default function AchatPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);
  const mapRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require('leaflet');

      const icon = new L.Icon({
        iconUrl: '/icon_location.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, 0]
      });

      setCustomIcon(icon);
    }
  }, []);

  const position = [25.197420260687252, 55.27459097432637];

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await achatData();
      if (fetchedData.length === 0) {
        setError("Failed to fetch data or no data available.");
      } else {
        setData(fetchedData);
        setError(null);
      }
    };

    loadData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!customIcon) return <div>Loading map...</div>; // Ensure icon is loaded

  return (
    <>
      <Navbar />
      <section className={styles.achatPage}>
        <section className={styles.localsShow}>
          {data.map((item) => (
            <Link href={`/achat/locals/${item._id}`} key={item._id}>
              <div className={styles.localsCard}>
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
                </div>
              </div>
            </Link>
          ))}
        </section>
        <section className={styles.mapShow}>
          {customIcon && (
            <MapContainer center={position} className={styles.mapContainer} zoom={12} minZoom={4} style={{ height: '100%', width: '100%' }} ref={mapRef}>
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?key=6dc682eb-b017-4f69-93e7-fde0e5c4c9b3"
                attribution='&copy; <a href="https://vkucode.com" target="_blank">VKU CODE</a>'
              />
              {data.map((item) => (
                <Marker position={[item.lat, item.lon]} icon={customIcon} title={item.price} key={item._id}>
                  <Popup>
                    {item.name}<Image src={`/assets/img/locals/achat/${item.img}`} width={250} height={250} alt={item.name} />
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </section>
      </section>
      <Footer />
    </>
  );
}
