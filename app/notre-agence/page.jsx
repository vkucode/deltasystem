'use client'
import Image from "next/image"
import styles from './agence.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Footer from "../components/Footer"
import DoubleScrollingLogos from "./components/Partners"
import { CountUpStats } from "./components/Stats"
import 'animate.css'

export default function NotreAgence(){
    return(
        <>  
        <FlipNavWrapper />
            <section className={styles.notreAgencePage}>
                <div className={styles.headerText}>   
                <Image src="/assets/img/agence/ciel.png" width={1000} height={500} alt="" />
                    <h1>
                        Notre&nbsp;agence
                    </h1>
                    <div className={styles.separateur}></div>
                    <p>
                    Delta est une agence immobilière fondée par un entrepreneur français avec 20 ans d'expérience, dont plus de 10 ans à Dubaï. Spécialisée dans l'investissement sur mesure, Delta offre une connaissance approfondie du marché local et une écoute attentive pour simplifier et adapter vos acquisitions.<br /><br />
                    Dubaï, avec son marché immobilier en expansion, ses rendements locatifs attractifs et son cadre de vie dynamique, attire les investisseurs internationaux. Investir à Dubaï ouvre de nouvelles perspectives dans une ville innovante.
                    </p>
                </div>                
                <div className={styles.agenceStats}>
                    <Image src="/assets/img/agence/logoBlanc.png" width={1000} height={1000} alt="" />
                    <CountUpStats />
                </div>
                <div className={styles.servicesAgence}>
                    <Image src="/assets/img/agence/build2full.png" width={1400} height={1000} alt="" /> 
                    <div>
                        <h1>votre allié immobilier</h1>
                        <p>
                        Le terme "delta" en immobilier symbolise les transitions lors de l'achat ou de la vente. Delta facilite ces moments clés avec un service réactif et adaptable pour un processus fluide.<br /><br/>
                        Nous vous accompagnons à chaque étape de votre investissement, de la structuration à la gestion locative. Choisir Delta, c'est s'assurer un partenaire de confiance pour réussir vos projets immobiliers.
                        </p>
                    </div>
                </div>
                <div className={styles.concretisezAgence}>
                    <Image src="/assets/img/agence/logoBlanc.png" width={1000} height={1000} alt="" />
                    <div>
                        <h1>concretisez<br />votre&nbsp;projet</h1>
                        <a href="#">contactez&nbsp;nous</a>
                    </div>
                </div>
                <div className={styles.partnersAgence}>
                        <h1>Ils ont parlé de nous</h1>
                        <DoubleScrollingLogos />
                </div>
            </section>
        <Footer />
        </>
    )
}