'use client'
import React from "react"
import Image from "next/image"
import styles from './gestion.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Footer from "../components/Footer"
import BasicFAQ from './components/accordition'
import ContactForm from "../components/ContactForm"
import ImgFooter from "../components/ImgFooter"
import 'animate.css'

export default function GestionLocative(){
    return(
        <>
        <FlipNavWrapper />
            <section className={styles.gestionPage}>

                    <div className={`animate__animated animate__fadeInDown ${styles.gestionHeader}`}>
                        <h1>gestion locative</h1>
                        <div className={styles.separateur}></div>
                    </div>
                    <div className="w-screen mt-72 md:mt-0 relative flex flex-col h-fit justify-center items-center">
                        <div className={styles.backgoundContent}>
                            <div className="max-w-6xl border-2 z-10 border-white">
                                <Image src="/assets/img/gestion/img3.png" className={`${styles.imgGestionBack} z-20`} width={500} height={500} />
                            </div>
                        </div>
                        
                        <div className={styles.contentGestion}>
                        
                        {/* <Image src="/assets/img/gestion/img2.png" className={`${styles.imgGestionBack} z-10`} width={500} height={500} /> */}
                            <div className={styles.imgGestion}>
                                <Image src="/assets/img/gestion/gestion.jpg" className="animate__animated animate__fadeInUp" width={300} height={300} />
                            </div>
                            <div className={`animate__animated animate__fadeInUp ${styles.textGestion}`}>
                                <h1>Choisissez DELTA, et transformez votre investissement immobilier en une source de revenus sans soucis.</h1>
                                <div className={styles.separateur}></div>
                                <p>DELTA propose un accompagnement complet aux propriétaires souhaitant louer leur bien et en assurer la gestion locative grâce à notre expertise spécialisée.
                                <br /><br />
                                Après l'acquisition de votre bien immobilier, nous prenons en charge toutes les démarches nécessaires pour que vous puissiez percevoir vos revenus locatifs. Que vous choisissiez une location traditionnelle ou saisonnière, nous gérons l'intégralité de votre bien.
                                <br /><br />
                                Nous offrons également un service de décoration d'intérieur pour meubler votre bien et en maximiser le rendement locatif
                                </p>
                                <a href="/contact">nous&nbsp;contacter</a>
                            </div>
                        </div>
                    </div>
                <BasicFAQ />
            </section>
        <ContactForm />
        <Footer/>
        </>
    )
}