// pages/achat/locals/[id].jsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/app/components/Navbar';
import FlipNavWrapper from '@/app/components/NewNavbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Head from 'next/head';
import '../../../app/globals.css'
import styles from './singleAchat.module.scss'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

  export default function LocalDetails(){

  const router = useRouter();
  const { id } = router.query;
  const [local, setLocal] = useState(null);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };


  useEffect(() => {
    if (!id) return;

    const fetchLocal = async () => {
      const response = await fetch(`/api/achat/locals/${id}`);
      const data = await response.json();

      if (response.ok) {
        setLocal(data);
      } else {
        setError(data.message || 'Something went wrong');
      }
    };

    fetchLocal();
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
            <Image src={`/assets/img/locals/achat/${local.img}`} width={500} height={500} alt={local.name} />
              {local.gallery.img.map((imgUrl, index) => (
                <Image key={index} src={`/assets/img/locals/achat/${imgUrl}`} width={500} height={500} alt={`Image ${index}`} />
              ))}
        </section>
        <section className={styles.content}>
            <div className={styles.detailsLocal}>

                <div className='mt-5 mb-5'>
                    <h1>{local.name}</h1>
                    <h1>{local.localisation.city} - {local.localisation.country}</h1>
                </div>
                
                <div className='flex flex-row w-full text-2xl pr-10 justify-between font-bold'>
                    <p>{local.price}</p>
                    <p>{local.details.surface} m<sup>2</sup></p>
                </div>
                
                <p className='mt-5 mb-5 text-sm pr-10'>{local.description}</p>
                
                <div className='mt-10'>
                    <h2 className='uppercase text-xl mb-3'>caractéristique&nbsp;du&nbsp;bien</h2>
                    <div className={styles.caracteristics}>
                        <div>
                            <p>Ville</p><p>{local.localisation.city}</p>
                        </div>
                        <div>
                           <p>Surface</p>
                           <p>{local.details.surface}&nbsp;m<sup>2</sup></p>  
                        </div>
                        <div>
                            <p>Chambre</p>
                            <p>{local.details.chambre}</p>
                        </div>
                        <div>
                            <p>Piece</p>
                            <p>{local.details.chambre}</p>
                            
                        </div>
                    </div>
                    
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


