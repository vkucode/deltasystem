'use client'
import React, {useState, useEffect} from 'react'
import styles from './actualite.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Footer from "../components/Footer"
import Image from 'next/image'
import { articlesData } from './articles'
import { FaArrowRight } from "react-icons/fa";

export default function ActualiteArchive() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
          const fetchedData = await articlesData();
          if (fetchedData.length === 0) {
            setError("Failed to fetch data or no data available.");
          } else {
            // Convert lat and lon to number
            setData(fetchedData);
            setError(null);
          }
        };
    
        loadData();
      }, []);

    return(
        <>
        <FlipNavWrapper />
        <section className={styles.actualitePage}>
            <div className={styles.headerTitle}>
                <h1>tous nos articles</h1>
                <div className={styles.separateur}></div>
            </div>
            <div className={styles.archiveArticles}>
                {data.map((item) =>(
                    <div className={styles.articleCard}>
                        <Image src={`/assets/img/actualite/img/${item.imgThumbnail}`} width={400} height={400} /> 
                    <div className={styles.articleContent}>
                        <h1>{item.title}</h1>
                        <div className='flex flex-row justify-between items-center'>
                            <span>{item.dataPost}</span>
                            <FaArrowRight />
                        </div>
                    </div>
                    </div>
                ))}
                

            </div>
        </section>
        <Footer />
        </>
    )
}