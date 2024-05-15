'use client'
import React from 'react'
import Image from 'next/image'
import styles from './footer.module.scss'

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
      <div className={styles.textTop}>
        <h1>
          raisons&nbsp;de<br/>
          nous&nbsp;contacter
        </h1>
        <div className={styles.separateur}></div>
        <div>
          <div className={styles.cards}>
            <Card title="lorem Ipsum" image="/assets/img/footer/croissance.png" />
            <Card title="lorem Ipsum" image="/assets/img/footer/batiment.png" />
            <Card title="lorem Ipsum" image="/assets/img/footer/croissance.png" />
          </div>
        </div>
      </div>
      <div className={styles.imgFull}>
        <Image src="/assets/img/footer/city.png" width={1000} height={100} />
      </div>

      {/* ----------------------------------------------------------------------- */}

      <div className={styles.footerInfo}>
        <div className='flex flex-col md:flex-row max-w-7xl md:gap-6 gap-10'>
          <div className='w-full md:w-1/4'>
            <Image src="/assets/img/footer/logo.png" className='mb-7' width={250} height={200} alt='Delta' />
            {/* <div className={styles.separateurInfo}></div> */}
            <ul>
              <li><a href="#">Adresse: Baysquare Building 11 Business Bay 5th floor / Office 506-Dubai</a></li>
              <li className='mt-5'><a href="#">Telephone: +971 58 558 7880</a></li>
            </ul>
            
          </div>
          <div className='w-full md:w-1/4'>
            <h3>Immobilier:</h3>
            <div className={styles.separateurInfo}></div>
            <ul type="none">
              <a href='#'><li>Actualite       </li></a>
              <a href='#'><li>Acheter a Dubai </li></a>
              <a href='#'><li>Investir a Dubai</li></a>
              <a href='#'><li>Les chiffres    </li></a>
              <a href='#'><li>Les Quartiers   </li></a>
              <a href='#'><li>Les promoteurs  </li></a>
              <a href='#'><li>Vivre a Dubai   </li></a>
            </ul>
          </div>
          <div className='w-full md:w-1/4'>
          <h3>Les services Delta:</h3>
            <div className={styles.separateurInfo}></div>
            <ul type="none">
              <a href='#'><li>Achat immobilier</li></a>
              <a href='#'><li>Vente immobiliere</li></a>
              <a href='#'><li>Gestion locative</li></a>
              <a href='#'><li>Estimer mon projet</li></a>
            </ul>
          </div>
          <div className='w-full md:w-1/4'>
          <h3>Informations:</h3>
            <div className={styles.separateurInfo}></div>
            <ul type="none">
              <a href='#'><li>Notre agence</li></a>
              <a href='#'><li>Recrutement</li></a>
              <a href='#'><li>Mentions legales</li></a>
              <a href='#'><li>Politique de confidentialite</li></a>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyrightFooter}>
        <div className={styles.copySeparateur}></div>
        <div className='flex flex-row justify-center items-center'>©2024&nbsp;&nbsp;<Image src="/assets/img/footer/logoCopy.png" width={100} height={10} alt='logo' />&nbsp;&nbsp;Toutes&nbsp;les&nbsp;droits&nbsp;reserve</div><br/>
        <div className='flex flex-row justify-center items-center -mt-4'>Powered&nbsp;by&nbsp;<a href='https://vkucode.com'><Image src="/assets/img/footer/logoVKU.png" width={50} height={10} alt='logo VKU' /></a></div>
      </div>
    </section>
  )
}

export default Footer