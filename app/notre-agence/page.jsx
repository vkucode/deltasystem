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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, atque. Excepturi aut enim pariatur non qui ut? Assumenda delectus, est atque deleniti obcaecati asperiores ipsum quis molestiae, neque numquam voluptates!
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
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam ea nisi fuga consectetur, neque consequatur a vel iste quaerat voluptatem repellat sint aspernatur quo numquam necessitatibus error assumenda eligendi tenetur?</p>
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
        <ContactForm />
        <Footer />
        </>
    )
}