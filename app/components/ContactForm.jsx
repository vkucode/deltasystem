import styles from './contactform.module.scss'

export default function ContactForm(){
    return(
        <>
            <section className="w-screen flex flex-col mt-16 lg:mb-14 mb-10 justify-center items-center"
                    style={{fontFamily: "Montserrat"}}>
                <div className={styles.contactDiv}> 
                   <h1 className={styles.titleForm}>nous&nbsp;contacter</h1>
                    <form action="#" className={styles.formDiv}>
                        <div >
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
        </>
    )
}