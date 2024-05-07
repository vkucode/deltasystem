'use client'
import Image from "next/image"
import CardCarousel from "./selection"
import styles from './about.module.scss'

export default function AboutUs(){
    return(
        <>
            <div className={styles.aboutUsSection}>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl md:text-5xl">Qui&nbsp;sommes&nbsp;nous&nbsp;?</h1>
                    <div className={styles.separateur}></div>
                    <p className="text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                    </p>
                    <a href="#" className={styles.contactBTN}>
                        contactez-nous
                    </a>
                </div>
                
                <div className="flex flex-col justify-center items-center mt-16">
                    <h1 className="text-3xl md:text-5xl">notre&nbsp;selection</h1>
                    <div className={styles.separateur}></div>
                </div>

                <div className="-mb-64">
                <CardCarousel />
                <div className="flex flex-col justify-center items-center">
                    <a href="#" className={styles.offresBTN}>decouvrez&nbsp;nos&nbsp;offres</a>
                </div>
                </div>
            </div>
        </>
    )
}