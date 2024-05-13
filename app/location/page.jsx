import { getPosts } from "@/_actions/postActions";
import styles from '../achat/achat.module.scss'
import Image from "next/image";


export default async function LocationPage(){
    const { data, errMsg } = await getPosts();

  if (errMsg) return <h1>{errMsg}</h1>;

  const res = await getPosts();
    return(
        <>
        <section>
        {data.map((item) => (
                <div className={styles.localsCard}>
                  <div className={styles.bgImg}>
                    <Image src={`/assets/img/locals/achat/${item.img}`} width={400} height={400} alt=''/>
                  </div>
                  <div className={styles.cardContent}>
                    <h1 key={item._id}>{item.name}</h1>
                    <h2>{item.price}</h2>
                    <ul>
                    {Object.entries(item.localisation).map(([key, value]) => (
                      <li key={key}>
                        {`${key}: ${value}, `}
                      </li>
                    ))}
                    </ul>
                    <ul>
                    {Object.entries(item.details).map(([key, value]) => (
                      <li key={key}>
                        {`${key}: ${value}, `}
                      </li>
                    ))}
                    </ul>
                  </div>
                  
                </div>
            ))}
        </section>
        </>
    )
}