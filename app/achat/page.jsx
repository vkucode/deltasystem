"use client"
import React, {useState, useEffect, useRef} from 'react';
import styles from './achat.module.scss'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { achatData } from './achatData'; // Adjust the import path as necessary
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';


const customIcon = new L.Icon({
  iconUrl: '/icon_location.png', // Înlocuiește cu calea către imaginea ta
  iconSize: [40, 40], // Setează dimensiunile iconului
  iconAnchor: [16, 32], // Punctul de ancorare pentru a poziționa corect iconul
  popupAnchor: [0, 0] // Punctul de ancorare pentru popup
});


export default function AchatPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  

  const mapRef = useRef(null); // Ref pentru a accesa harta Leaflet
  const position = [25.197420260687252, 55.27459097432637];
  

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await achatData();
      if (fetchedData.length === 0) {
        setError("Failed to fetch data or no data available."); // Consider adjusting error message based on different conditions
      } else {
        setData(fetchedData);
        setError(null); // Reset error state if data is successfully fetched
      }
    };
  
    loadData();
  }, []);
  
  if (error) return <div>Error: {error}</div>;


  return (
    <>     
      <Navbar />
      <section className={styles.achatPage}>
        {/* <div className={styles.filtersBlock}>
          <input type="text" placeholder='Ville, Pays'  />
          <select name="type_de_bien" id="type_de_bien">
            <option value="Appartament">Appartament</option>
            <option value="Maison">Maison</option>
          </select>

        </div> */}
        <section className={styles.localsShow}>
        {data.map((item) => (
          <Link href={`/achat/locals/${item._id}`}>
              <div className={styles.localsCard}  key={item._id}>
                <div className={styles.bgImg}>
                  <Image src={`/assets/img/locals/achat/${item.img}`} width={400} height={400} alt=''/>
                </div>
                <div className={styles.cardContent}>
                  <h1>{item.name}</h1>
                  <div className='flex flex-row gap-2'>
                    <span>{item.chambre}&nbsp;Chambres</span>
                    <span>{item.surface}&nbsp;m<sup>2</sup></span>
                  </div>
                  <h2>{item.price}</h2>
                  <span className='hidden'>{item.lat}<br/>{item.lon}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <section className={styles.mapShow}>
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
        </section>
      </section>
      <Footer />
    </>
  );
}
