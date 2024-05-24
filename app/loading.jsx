import Image from "next/image"
import styles from './loading.module.scss'

export default function Loading(){
    return(
        <>
        <section className={styles.loadingSection}>
            <div>
                <Image src="/deltaOr.png" width={400} height={400} alt="" /><br />
                <h1>loading...</h1>
            </div>
        </section>
        </>
    )
}