// pages/achat/locals/[id].jsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Head from 'next/head';
import '../../../app/globals.css'
import styles from './singleAchat.module.scss'

  export default function LocalDetails(){

  const router = useRouter();
  const { id } = router.query;
  const [local, setLocal] = useState(null);
  const [error, setError] = useState(null);

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
      <Navbar />
      <section className={styles.localDetails}>
        <section className={styles.galleryImg}>
            <Image src={`/assets/img/locals/achat/${local.img}`} width={500} height={500} alt={local.name} />
        </section>
        <section >
        <h1>{local.name}</h1>
        <p>Chambres: {local.details.chambre}</p>
        <p>Surface: {local.details.surface} m²</p>
        <p>Prix: {local.price}</p>
        </section>
      </section>
      <Footer />
    </>
  );
};


