// pages/achat/locals/[id].jsx
'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import FlipNavWrapper from '@/app/components/NewNavbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Head from 'next/head';
import '../../../app/globals.css'
import styles from './singleAchat.module.scss'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io"
import Slider from 'react-slick';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


  export default function LocalDetails(){

  const router = useRouter();
  const { id } = router.query;
  const [local, setLocal] = useState(null);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState(null);
  const [isAED, setIsAED] = useState(true);
  const [priceAed, setPriceAed] = useState(null);

    const toggleCurrency = () => {
        setIsAED(!isAED);
    };

    function formatNumberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }


  
  const containerStyle = {
    width: '100%',
    height: '350px'
  };

  const sliderRef = useRef(null);

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
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

  var settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToScroll: 3,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 3,
          dots: true,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 1400,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };


  useEffect(() => {
    const fetchLocal = async () => {
      const response = await fetch(`/api/achat/locals/${id}`);
      const data = await response.json();
      let price_aed = 0;
      if (response.ok) {
        // Convert lat and lon to numbers
        data.localisation.lat = parseFloat(data.localisation.lat);
        data.localisation.lon = parseFloat(data.localisation.lon);
        data.price = parseFloat(data.price);
        price_aed = data.price * 3.67;
        setPriceAed(price_aed);
        setLocal(data);
      } else {
        setError(data.message || 'Something went wrong');
      }
    };

    if (id) {
      fetchLocal();
    }
  }, [id]);

  

  if (error) return <div>Error: {error}</div>;

  if (!local) return <div>Loading...</div>;

  return (
    <>
    <Head>
        <title>{local ? `${local.name} - Delta Real Estate` : 'Loading...'}</title>
        <meta name="description" content={local ? `View details for ${local.name}, a property with ${local.details.chambre} bedrooms and ${local.details.surface} square meters available for sale at ${local.price}.` : 'Loading property details...'} />
      </Head>
      <FlipNavWrapper />
      <section className={styles.localDetails}>
        <section className={styles.galleryImg}>
        <div className={styles.SliderControls}>
            <button onClick={handlePrev}><IoIosArrowBack /></button>
            <button onClick={handleNext}><IoIosArrowForward /></button>
          </div>
        <Slider ref={sliderRef} {...settings}>
          <div>
            <Image src={`https://deltainvested.com/imgs/locals/achat/${local.img}`} width={500} height={500} alt={local.name} />
            </div>
              {local.gallery.imgs.map((imgUrl, index) => (
                <div>
                <Image key={index} src={`https://deltainvested.com/imgs/locals/achat/${imgUrl}`} width={500} height={500} alt={`Image ${index}`} />
                </div>
              ))}
          </Slider>
        </section>
        <section className={styles.content}>
            <div className={styles.detailsLocal}>

                <div className='mt-5 mb-5'>
                    <h1>{local.name}</h1>
                    <h1>{local.localisation.city} - {local.localisation.country}</h1>
                </div>
                
                <div className='flex flex-row w-full text-2xl pr-10 pl-5 lg:pl-0 justify-between font-bold'>
                <p className='flex flex-row items-center'>
                    {isAED ? formatNumberWithSpaces(priceAed) + " AED" : formatNumberWithSpaces(local.price) + " $"}
                    <button onClick={toggleCurrency} className='bg-teal-700 rounded text-yellow-50 font-regular px-2 py-1 text-sm ml-2'>
                        {isAED ? '$' : 'AED'}
                    </button>
                </p>

                    <p>{local.details.surface}-{local.details.surface_max} m<sup>2</sup></p>
                </div>
                
                <p className='mt-5 mb-5 pl-5 lg:pl-0 text-sm pr-10'>{local.text_content}</p>
                
                <div className='mt-10'>
                    <h2 className='uppercase text-xl mb-3 pl-5 lg:pl-0'>caractéristique&nbsp;du&nbsp;bien</h2>
                    <div className={styles.caracteristics}>
                        <div>
                            <p>Ville</p><p>{local.localisation.city}</p>
                        </div>
                        <div>
                           <p>Surface</p>
                           <p>{local.details.surface}&nbsp;m<sup>2</sup></p>  
                        </div>
                        <div>
                            <p>Etage</p>
                            <p>{local.details.etage}</p>
                        </div>
                        <div>
                            <p>Chambre</p>
                            <p>{local.details.chambre}</p>
                        </div>
                        
                    </div>
                </div>
              <div className={styles.singleMap}>
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
                onLoad={initializeIcon} // Setează iconul după încărcarea scriptului
              >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                      lat: local.localisation.lat,
                      lng: local.localisation.lon
                    }}
                    zoom={13}
                  >
                    {icon && <Marker
                      position={{ lat: local.localisation.lat, lng: local.localisation.lon }}
                      icon={icon}
                    />}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
            <div className={styles.contactBlock}>
                <h2>contactez&nbsp;nous</h2>
                <form action="#">
                    <input type="text" placeholder='Prenom' required name='prenom' />
                    <input type="text" placeholder='Nom de famille' required name='name' />
                    <input type="email" placeholder='E-mail' required name='email' />
                    <input type="tel" placeholder='Numero de telephone' required name='tel' />
                    <textarea type="text" placeholder='Message' required name='message' />
                    <button>envoyer&nbsp;ma&nbsp;demande</button>
                </form>
            </div>
        </section>
      </section>
      <Footer />
    </>
  );
};


