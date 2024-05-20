// pages/articles/articleSingle/[id].jsx
'use client'
import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import FlipNavWrapper from '@/app/components/NewNavbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Head from 'next/head';
import '../../../app/globals.css'
import styles from './articleSingle.module.scss'


  export default function LocalDetails(){

  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchLocal = async () => {
      const response = await fetch(`/api/articles/articleSingle/${id}`);
      const data = await response.json();
      if (response.ok) {
        setArticle(data);
      } else {
        setError(data.message || 'Something went wrong');
      }
    };

    if (id) {
      fetchLocal();
    }
  }, [id]);

  

  if (error) return <div>Error: {error}</div>;

  if (!article) return <div>Loading...</div>;

  return (
    <>
    <Head>
        <title>{article ? `${article.title} - Delta Real Estate` : 'Loading...'}</title>
        <meta name="description" content={article ? `View details for ${article.title}` : 'Loading...'} />
      </Head>
      <FlipNavWrapper />
      <section className={styles.localDetails}>
        <section className={styles.galleryImg}>
            <Image src={`/assets/img/actualite/img/${article.imgThumbnail}`} width={500} height={500} alt={article.title} />
        </section>
        <section className={styles.content}>

            <div className={styles.detailsLocal}>
                <div className='mt-5 mb-5'>
                    <h1>{article.title}</h1>
                    <p className='mt-5 mb-5 pl-5 lg:pl-0 text-sm pr-10'>{article.dataPost}</p>
                </div>
                <div className={styles.contentArticles}>
                    {article.content && article.content.map((item, index) => (
                    <div key={index} className={styles.contentItem}>
                        <h2>{item.title}</h2>
                        <div className={styles.separateurContent}></div>
                        <p>{item.text}</p>
                        <ul type="none" className='mt-2'>
                            {item.liste && item.liste.map((listElement, indexListe) => (
                                <li key={indexListe} className='mt-2'>{listElement}</li>
                            ))}
                        </ul>
                    </div>
                    ))}
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


