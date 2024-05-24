'use client'
import Image from "next/image"
import styles from './agence.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Footer from "../components/Footer"
import ContactForm from "../components/ContactForm"
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
                    Fondée par un entrepreneur français doté de 20 ans d'expérience dans le domaine de l'immobilier, dont plus de 10 ans d'expertise spécifique à Dubaï, Delta est une agence immobilière dédiée à l'investissement sur mesure.<br /><br />
                    Accompagnée d'une équipe de professionnels, Delta met à profit une connaissance approfondie du marché local et une écoute attentive de vos besoins pour rendre votre acquisition simple, efficace et parfaitement adaptée à votre projet.<br /><br />
                    Dans l'immobilier, la notion de "delta" symbolise les transitions vécues lors de l'achat ou de la vente d'une propriété. À l'image du delta en philosophie, qui représente le changement, notre agence facilite ces moments clés en offrant un service adaptable et réactif, assurant un processus aussi fluide que possible
                    </p>
                </div>                
                <div className={styles.agenceStats}>
                    <Image src="/assets/img/agence/logoBlanc.png" width={1000} height={1000} alt="" />
                    <CountUpStats />
                </div>
                <div className={styles.servicesAgence}>
                    <Image src="/assets/img/agence/build.png" width={1400} height={1000} alt="" /> 
                    <div>
                        <h1>nos&nbsp;services</h1>
                        <p>
                            Dubaï, avec son marché immobilier en pleine expansion, ses rendements locatifs attractifs et son cadre de vie dynamique, est devenue une destination prisée des investisseurs internationaux. Investir dans une propriété à Dubaï, c'est s'ouvrir à de nouvelles perspectives dans une ville innovante et tournée vers l'avenir.<br /><br />
                            Avec notre écosystème complet, nous vous accompagnons à chaque étape de votre parcours d'investissement, de la structuration de votre projet à l'aménagement de votre bien, en passant par la gestion locative. En choisissant Delta, vous bénéficiez d'un partenaire de confiance pour mener à bien vos investissements immobiliers et construire ensemble votre succès.
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
            </section>
        <Footer />
        </>
    )
}