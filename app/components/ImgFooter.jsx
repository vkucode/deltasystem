'use client'
import { useState } from 'react'
import styles from './footer.module.scss'
import Image from 'next/image'

export default function ImgFooter(){
    const [imgSrc, setImgSrc] = useState("")


    return(
        <>
        <div className={styles.imgFull}>
            <Image src="/assets/img/footer/city.png" width={1000} height={1000} />
        </div>
        </>
    )
}