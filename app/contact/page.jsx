'use client'
import Image from "next/image"
import styles from './contact.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import 'animate.css'

export default function Contact(){
    return(
        <>
        <FlipNavWrapper />
        {/* <Navbar /> */}
        <section className={styles.contactPage}>
            <div className={`animate__animated animate__fadeInLeft ${styles.infoDiv}`}>
                <div>
                    <ul>
                        <li>
                            <h2>Adresse</h2>
                            <p>95425 Dubai, Emirat Arabie</p>
                        </li>
                        <li className="mt-8">
                            <h2>Telephone</h2>
                            <p>+1254 235 215</p>
                        </li>
                        <li className="mt-8">
                            <h2>Email</h2>
                            <p>contact@deltainvested.com</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`animate__animated animate__fadeInUp ${styles.formDiv}`}>
                <h1>Contactez-Nous</h1>
                <form action="#">
                    <div>
                        <input type="text" name="nom" placeholder="NOM" required />
                        <input type="text" name="prenom" placeholder="PRENOM" required />
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="EMAIL" required />
                        <input type="tel" name="phone" placeholder="TEL" required />
                    </div>
                    <textarea placeholder="MESSAGE" name="message"/>
                    <button className={styles.sendBTN}>Envoyer</button>
                </form>
            </div>
        </section>
        <Footer />
        </>
    )
} 