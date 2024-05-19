'use client'
import Image from "next/image"
import styles from './contact.module.scss'
import FlipNavWrapper from "../components/NewNavbar"
import ImgFooter from "../components/ImgFooter"
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
                            <p className="w-full md:w-[70%]">UAE - DUBAI - Business Bay - Bay Square Marasi Drive the Binary Tower / Étage 20</p>
                        </li>
                        <li className="mt-8">
                            <h2>Telephone</h2>
                            <p>+971 58 586 4096</p>
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
        <ImgFooter imgSrc="/assets/img/footer/city3.png" />
        <Footer />
        </>
    )
} 