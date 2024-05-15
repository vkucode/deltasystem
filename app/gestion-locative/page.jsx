'use client'
import React from "react"
import Image from "next/image"
import styles from './gestion.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Footer from "../components/Footer"
import BasicFAQ from './components/accordition'

export default function GestionLocative(){
    return(
        <>
        <FlipNavWrapper />
            <section className={styles.gestionPage}>

                    <div className={styles.gestionHeader}>
                        <h1>gestion locative</h1>
                        <div className={styles.separateur}></div>
                    </div>
                    <div className="w-screen mt-20 md:mt-0 relative flex flex-col h-fit justify-center items-center">
                        <div className={styles.backgoundContent}></div>
                        <div className={styles.contentGestion}>
                            <div className={styles.imgGestion}>
                                <Image src="/assets/img/gestion/gestion.jpg" width={300} height={300} />
                            </div>
                            <div className={styles.textGestion}>
                                <h1>exquisite lake austin contemporary estate</h1>
                                <div className={styles.separateur}></div>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci voluptatem ullam laborum totam non! Nesciunt eos quia ratione asperiores. Asperiores quia quos labore in ab eos, laudantium officiis ipsum expedita.</p>
                                <a href="/contact">nous&nbsp;contacter</a>
                            </div>
                        </div>
                    </div>
                <BasicFAQ />
            </section>
        <Footer/>
        </>
    )
}