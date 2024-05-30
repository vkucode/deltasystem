'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FlipNavWrapper from '../components/NewNavbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { achatData } from './achatData';
import Link from 'next/link';
import styles from './achat.module.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ImgFooter from '../components/ImgFooter';
import 'animate.css';
import ContactForm from '../components/ContactForm';
import { VscSettings } from "react-icons/vsc";

export default function AchatPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);  // State to track hovered item
  const [filters, setFilters] = useState({
    type: '',
    budget: '',
    surface: '',
    chambre: ''
  });
  const mapRef = useRef(null);
  const router = useRouter();

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const goToAnnonce = useCallback((id) => {
    router.push(`/achat/locals/${id}`);
  }, [router]);

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
      try {
        const fetchedData = await achatData();
        console.log('Fetched Data:', fetchedData); // Debug: Log fetched data
        if (fetchedData.length === 0) {
          setError("Failed to fetch data or no data available.");
        } else {
          const filteredData = fetchedData
            .filter(item => item.category === 'achat')
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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;
      if (filters.type) {
        filtered = filtered.filter(item => item.type === filters.type);
      }
      if (filters.budget) {
        filtered = filtered.filter(item => item.price <= filters.budget);
      }
      if (filters.surface) {
        filtered = filtered.filter(item => item.surface >= filters.surface);
      }
      if (filters.chambre) {
        filtered = filtered.filter(item => item.chambre >= filters.chambre);
      }
      setFilteredData(filtered);
    };
    applyFilters();
  }, [filters, data]);

  if (error) return <div>Error: {error}</div>;


/** FILTER BLOCK */

  const FilterLocals = () =>{

    const [activeMobileFilter, setActiveMobileFilter] = useState("-mt-[100%]")

    // const handleOpenMobileFilter = (e) =>{
    //     if(activeMobileFilter === "hidden"){
    //       setActiveMobileFilter("flex");
    //     }
    //     else{
    //       setActiveMobileFilter("hidden")
    //     }
    // }
    const handleOpenMobileFilter = (e) =>{
      if(activeMobileFilter === "-mt-[100%]"){
        setActiveMobileFilter("animate__fadeInDown");
      }
      else if(activeMobileFilter === "animate__fadeInDown"){
        setActiveMobileFilter("animate__fadeOutUp")
      }
      else{
        setActiveMobileFilter("-mt-[100%]")
      }
  }

    return(
      <>
      <section className={styles.filtersBlock}>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Type de bien</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
          </select>
          <input
            type="number"
            name="budget"
            value={filters.budget}
            onChange={handleFilterChange}
            placeholder="Budget max"
          />
          <input
            type="number"
            name="surface"
            value={filters.surface}
            onChange={handleFilterChange}
            placeholder="Surface min (m²)"
          />
          <input
            type="number"
            name="chambre"
            value={filters.chambre}
            onChange={handleFilterChange}
            placeholder="Nombre de chambres"
          />
        </section>
        <div className={styles.filtersMobile}>
            <button className={styles.filterBTN} onClick={handleOpenMobileFilter}>
              Filters <VscSettings />
            </button>  
            <div className={`flex z-30 flex-col animate__animated ${activeMobileFilter} text-teal-800 justify-center gap-4 py-5 px-5 items-start w-[100%] bg-white`}>
              <select name="type" className='w-[50%] outline-none' value={filters.type} onChange={handleFilterChange}>
                <option value="">Type de bien</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
              </select>
              <input
                type="number"
                name="budget"
                className='w-full outline-none'
                value={filters.budget}
                onChange={handleFilterChange}
                placeholder="Budget max"
              />
              <input
                type="number"
                name="surface"
                className='w-full outline-none'
                value={filters.surface}
                onChange={handleFilterChange}
                placeholder="Surface min (m²)"
              />
              <input
                type="number"
                name="chambre"
                className='w-full outline-none'
                value={filters.chambre}
                onChange={handleFilterChange}
                placeholder="Nombre de chambres"
              />
            </div>
        </div>
      </>
    )
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <>
      <FlipNavWrapper />
      <section className={styles.achatPage}>
        <FilterLocals />

        <div className={styles.contentPage}>
        <section className={`animate__animated animate__fadeIn ${styles.localsShow}`}>
          {filteredData.map((item) => (
            <Link
              href={`/achat/locals/${item._id}`}
              key={item._id}
              className={styles.localsCard}
              onMouseEnter={() => setHoveredItem(item._id)}  // Set hovered item on mouse enter
              onMouseLeave={() => setHoveredItem(null)}      // Reset hovered item on mouse leave
            >
              <div className={styles.bgImg}>
                <div className={`${styles.overlayBg} ${hoveredItem === item._id ? 'animate__fadeOutDown flex' : 'flex animate__fadeInUp'} animate__animated flex-col justify-center items-center`} style={{transition: "0.2s all ease-in-out"}} > 
                  <Image src="/assets/img/accueil/iconFiltre.png" width={100} height={100} alt='filtre' />
                </div>
                <Image src={`https://deltainvested.com/imgs/locals/achat/${item.img}`} width={400} height={400} alt={item.name} />
              </div>
              <div className={styles.cardContent}>
                <h1>{item.name}</h1>
                <div className='flex flex-row gap-2'>
                  <span>{item.chambre}&nbsp;Chambres</span>
                  <span>{item.surface}&nbsp;m<sup>2</sup></span>
                </div>
                <h2>{item.price}</h2>
                <div className='hidden'>
                  <p className='hidden'>{item.lat}</p>
                  <p className='hidden'>{item.lon}</p>
                </div>
              </div>
            </Link>
          ))}
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
              {icon && filteredData.map((item) => (
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
        </div>
      </section>
      
      <ContactForm />
      <ImgFooter imgSrc="/assets/img/footer/city.png" />
      <Footer />
    </>
  );
}
