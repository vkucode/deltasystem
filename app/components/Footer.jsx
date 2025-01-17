'use client'
import React from 'react'
import Image from 'next/image'
import styles from './footer.module.scss'
import { FaMapMarkerAlt, FaPhoneAlt  } from "react-icons/fa";

const Footer = () => {

  const Card = ({title, image}) => {
    return(
      <div className={styles.card}>
        <Image src={image} width={100} height={100} alt='icon' />
        <h3>{title}</h3>
      </div>
    )
  }

  return (
    <section className={styles.footerSection}>
      
      {/* ----------------------------------------------------------------------- */}

      <div className={styles.footerInfo}>
        <div className='flex flex-col md:flex-row max-w-7xl md:gap-6 gap-10'>
          <div className='w-full md:w-1/3'>
            <Image src="/assets/img/accueil/logoOrClear.png" className='mb-7' width={250} height={200} alt='Delta' />
            {/* <div className={styles.separateurInfo}></div> */}
            <ul>
              <li><a href="https://maps.app.goo.gl/HziQ2BNkxxujq3Az7">UAE - DUBAI - Business Bay - Bay Square Marasi Drive the Binary Tower / Étage 20</a></li>
              <li className='mt-5'><a href="tel:+971585864096">+971 58 586 4096</a></li>
            </ul>
            
          </div>
          <div className='w-full md:w-1/3'>
          <h3>Les services Delta:</h3>
            <div className={styles.separateurInfo}></div>
            <ul type="none">
              <a href='/achat'><li>Achat immobilier</li></a>
              <a href='/location'><li>Location immobiliere</li></a>
              <a href='/gestion-locative'><li>Gestion locative</li></a>
              <a href='/contact'><li>Estimer mon projet</li></a>
            </ul>
          </div>
          <div className='w-full md:w-1/3'>
          <h3>Informations:</h3>
            <div className={styles.separateurInfo}></div>
            <ul type="none">
              <a href='/notre-agence'><li>Notre agence</li></a>
              <a href='/actualite'><li>Actualite       </li></a>
              <a href='/legales/mentions-legales'><li>Mentions legales</li></a>
              <a href='/legales/politique-de-confidentialite'><li>Politique de confidentialite</li></a>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyrightFooter}>
        <div className={styles.copySeparateur}></div>
        <div className='flex flex-row justify-center items-center'><Image src="/assets/img/accueil/logoOrClear.png" width={100} height={10} alt='logo' />&nbsp;&nbsp;Toutes&nbsp;les&nbsp;droits&nbsp;reserve&nbsp;2024©&nbsp;</div><br/>
        <div className='flex flex-row justify-center items-center -mt-4'>Powered&nbsp;by&nbsp;<a href='https://vkucode.com'><Image src="/assets/img/footer/logoVKU.png" width={50} height={10} alt='logo VKU' /></a></div>
      </div>
    </section>
  )
}

export default Footer