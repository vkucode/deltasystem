'use client'
import styles from './footer.module.scss';
import Image from 'next/image';

export default function ImgFooter({ imgSrc }) {
  return (
    <div className={styles.imgFull}>
      <Image src={imgSrc} width={1000} height={1000} alt="Footer Image" />
    </div>
  );
}