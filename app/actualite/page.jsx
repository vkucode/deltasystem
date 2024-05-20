'use client'
import React, {useState, useEffect} from 'react'
import styles from './actualite.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Footer from "../components/Footer"
import ContactForm from '../components/ContactForm'
import Image from 'next/image'
import { articlesData } from './articles'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link'
import 'animate.css'

export default function ActualiteArchive() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);  // State to track hovered item

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
                    <Link href={`/articles/articleSingle/${item._id}`}
                        className={styles.articleCard}
                        key={item._id}
                        onMouseEnter={() => setHoveredItem(item._id)}  // Set hovered item on mouse enter
                        onMouseLeave={() => setHoveredItem(null)} >
        
                            <div className={`${styles.overlayBg} ${hoveredItem === item._id ? 'animate__fadeInUp' : 'animate__fadeOutDown'} animate__animated`}>
                                <Image src="/assets/img/accueil/iconFiltre.png" width={300} height={300} />
                            </div>
                                <Image src={`/assets/img/actualite/img/${item.imgThumbnail}`} width={400} height={400} /> 
                            <div className={styles.articleContent}>
                                <h1>{item.title}</h1>
                                <div className='flex flex-row justify-between items-center'>
                                    <span>{item.dataPost}</span>
                                    <FaArrowRight className={`text-lg ${hoveredItem === item._id ? 'animate__fadeInLeft' : 'animate__fadeOutRight'} animate__animated`} />
                                </div>
                            </div>
                    </Link>
                ))}
                

            </div>
        </section>
        <ContactForm />
        <Footer />
        </>
    )
}