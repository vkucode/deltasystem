import React from 'react'
import styles from './achat.module.scss'
import { getPosts } from "@/_actions/postActions";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default async function AchatPage(){
  const { data, errMsg } = await getPosts();

  if (errMsg) return <h1>{errMsg}</h1>;

  const res = await getPosts();
  console.log(res);

    return (
      <>
      <Navbar />
        <section className={styles.achatPage}>
        {data.map((item) => (
                <div>
                  <h1 key={item._id}>{item.name}</h1>
                  <h2>{item.price}</h2>
                  <ul>
                  {Object.entries(item.localisation).map(([key, value]) => (
                    <li key={key}>
                      {`${key}: ${value}, `}
                    </li>
                  ))}
                  </ul>
                </div>
            ))}
        </section>
        <Footer />
      </>
    );
  }


