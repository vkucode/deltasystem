import Image from "next/image"
import styles from './loading.module.scss'

export default function Loading(){
    return(
        <>
        <section className={styles.loadingSection}>
            <div>
                <video src="/assets/video/loading.mp4" poster="/deltaOr.png" autoPlay muted loop></video><br />
            </div>
        </section>
        </>
    )
}