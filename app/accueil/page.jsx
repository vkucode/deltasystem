'use client'
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styles from './accueil.module.scss'
import 'animate.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollSmoother from 'gsap/src/ScrollSmoother';
import CardCarousel from './components/selection';
import CarouselLocals from './components/carousel';
import '../globals.css'

const Accueil = () => {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const model3d = "assets/models/new/burj.glb";
    const [burjOpacityStyle, setBurjOpacityStyle] = useState("hidden");
    const [logoDelta, setLogoDelta] = useState("animate__fadeInUp animate__delay-1s");
    const [windowsStyles, setWindowsStyles] = useState("");
    const [rotation, setRotation] = useState([-1, 0, 0]);
    const [scale, setScale] = useState(0.07);  //0.07
    const [rotationSpeed, setRotationSpeed] = useState(0.001); // Viteza de rotație inițială
    const [positionY, setPositionY] = useState(-80); // Poziția inițială pe axa Y
    const [positionX, setPositionX] = useState(0);
    const [positionZ, setPositionZ] = useState(0)

    const Model = ({ scale }) => {
      const modelRef = useRef();
      const textures = useLoader(TextureLoader, [
        "assets/models/burj_khalifa/textures/Burj_Khalifa_baseColor.png",
        "assets/models/burj_khalifa/textures/Burj_Khalifa_metallicRoughness.png",
        "assets/models/burj_khalifa/textures/Burj_Khalifa_normal.png",
      ])
      const model = useLoader(GLTFLoader, model3d);
    
      model.scene.traverse((child) => {
        if (child.isMesh) {
          const newMaterial = new THREE.MeshStandardMaterial({
              map: textures[0], // Utilizează textura de bază
              metalness: 1.3,
              roughness: 1,
              transparent: false,
              opacity: 1,
              side: THREE.DoubleSide // Setează aceasta dacă modelul trebuie văzut din ambele părți
          });
          child.material = newMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
          newMaterial.map.minFilter = THREE.LinearMipmapLinearFilter;
          newMaterial.map.magFilter = THREE.LinearFilter;
      }
      });

      // useFrame(() => {
      //     if (modelRef.current) {
      //         modelRef.current.rotation.y += rotationSpeed;
      //     }
      // });

      return <primitive ref={modelRef} object={model.scene} scale={scale} rotation={rotation} position={[positionX, positionY, positionZ]} />;
  };


{/*--------------------------------------------Animatiile de intrare si animatiile la burj Khalifa */}
    useEffect(() => {

      ScrollSmoother.create({
        smooth: 3, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 2, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
        content: "#smooth-content",
        wrapper: "smooth-wrapper"
      });
      
    }, []);

    const [animationBurjEntry, setAnimationBurjEntry] = useState("");

    useEffect(() => {

      ScrollTrigger.create({
        trigger: "#tlBurjFirst",
        start: "top 100px",
        end: "bottom 100px",
        id: "firstANIM",
        scrub: true,
        ease: "power2.out",
        onEnter: () => {setPositionY('-30'), setAnimationBurjEntry("animate__fadeInUp")},
        onLeave: () => setPositionY('-11'),
        onUpdate: (self) => {
          const progress = self.progress;
          const setPostitionBurjY = -30 + (progress * 19);
          console.log(setPostitionBurjY);
          const rotationValueX = -1.5 + (progress * 1);
          setRotation([rotationValueX, 0, 0]);
          setPositionY(setPostitionBurjY);
        }
        
      });
  
  
  
    }, []);
  

  useEffect(() => {

    ScrollTrigger.create({
      trigger: "#timeLineBurj",
      start: "top 350px",
      end: "bottom 200px",
      id: "tlLineBurj",
      scrub: true,
      onEnter: () => {setRotation([0, 0, 0]);},
      onLeave: () => setRotation([0, 0, 0]),
      onUpdate: (self) => {
        const progress = self.progress;
        const rotationValueY = progress * 4 * Math.PI;
        const setPostitionBurjY = -11 + (progress * (0 - 49));
        setRotation([0, rotationValueY, 0]);
        setPositionY(setPostitionBurjY);
      }

    });



  }, []);

{/* ----------------------------------------------------------- Animatiile de intrare si animatiile la burj Khalifa */}
{/* ----------------------------------------------------------- Animatiile de intrare si disparitie TEXT */}  

const [firstTextDiv, setFirstTextDiv] = useState("hidden");
const [secondTextDiv, setSecondTextDiv] = useState("hidden");
const [thirdTextDiv, setThirdTextDiv] = useState("hidden");
const [lastTextDiv, setLastTextDiv] = useState("hidden");

{/**Animation First Div */}
useEffect(() => {

  ScrollTrigger.create({
    trigger: "#tlFirstTextDiv",
    start: "top 600px",
    end: "bottom 400px",
    // markers: true,
    scrub: true,
    onEnter: () => setFirstTextDiv("animate__fadeInUp"),
    onLeave: () => setFirstTextDiv("animate__fadeOutUp"),
    onLeaveBack: () => setFirstTextDiv("animate__fadeOutUp"),
    onEnterBack: () => setFirstTextDiv("animate__fadeInUp"),
    onUpdate: (self) =>{
      const progress = self.progress;
      const firstTextPosZ = 0 - (progress * 4);
      const firstTextPosX = -0.5 + (progress * 0.5);
      setPositionZ(firstTextPosZ);
      setRotation([firstTextPosX, 0, 0]);
    },  
    onToggle: (self) => {
      setFirstTextDiv("animate__fadeInUp")
    }

  });



}, []);

useEffect(() => {

  ScrollTrigger.create({
    trigger: "#tlSecondTextDiv",
    start: "top 600px",
    end: "bottom 400px",
    id:"secondTXT",
    scrub: true,
    onEnter: () => setSecondTextDiv("animate__fadeInRight"),
    onLeave: () => setSecondTextDiv("animate__fadeOutLeft"),
    onLeaveBack: () => setSecondTextDiv("animate__fadeOutRight"),
    onEnterBack: () => setSecondTextDiv("animate__fadeInLeft"),
    onToggle: (self) => {
      setSecondTextDiv("animate__fadeInRight")
    },
    onUpdate: (self) =>{
      const progress = self.progress;
      const secondTextPosX = 0 - (progress * 4);
      setPositionX(secondTextPosX);
    }

  });

}, []);

useEffect(() => {

  ScrollTrigger.create({
    trigger: "#recenterBurj2to3",
    start: "top 500px",
    end: "bottom 500px",
    id: "tl 2 to 3",
    scrub: true,
    onEnter: () => setPositionX(-4),
    onLeave: () => setPositionX(0),
    onUpdate: (self) =>{
      const progress = self.progress;
      const secondTextPosX = -4 + (progress * 4);
      setPositionX(secondTextPosX);
    }

  });

}, []);

useEffect(() => {

  ScrollTrigger.create({
    trigger: "#tlThirdTextDiv",
    start: "top 600px",
    end: "bottom 400px",
    // markers: true,
    scrub: true,
    onEnter: () => setThirdTextDiv("animate__fadeInLeft"),
    onLeave: () => setThirdTextDiv("animate__fadeOutRight"),
    onLeaveBack: () => setThirdTextDiv("animate__fadeOutLeft"),
    onEnterBack: () => setThirdTextDiv("animate__fadeInRight"),
    onToggle: (self) => {
      setThirdTextDiv("animate__fadeInLeft")
    },
    onUpdate: (self) =>{
      const progress = self.progress;
      const secondTextPosX = 0 + (progress * 4);
      setPositionX(secondTextPosX);
    }

  });

}, []);

useEffect(() => {

  ScrollTrigger.create({
    trigger: "#recenterBurj3to4",
    start: "top 500px",
    end: "bottom 500px",
    // markers: true,
    id: "tl 3 to 4",
    scrub: true,
    onEnter: () => setPositionX(4),
    onLeave: () => setPositionX(0),
    onUpdate: (self) =>{
      const progress = self.progress;
      const secondTextPosX = 4 - (progress * 4);
      setPositionX(secondTextPosX);
    }

  });

}, []);



useEffect(() => {

  ScrollTrigger.create({
    trigger: "#tlLastTextDiv",
    start: "top 600px",
    end: "bottom 400px",
    // markers: true,
    scrub: true,
    onEnter: () => setLastTextDiv("animate__fadeInDown"),
    onLeave: () => setLastTextDiv(""),
    onLeaveBack: () => setLastTextDiv("animate__fadeOutUp"),
    onEnterBack: () => setLastTextDiv(""),
    onToggle: (self) => {
      setLastTextDiv("animate__fadeInDown")
    },
  });

}, []);



{/* ----------------------------------------------------------- Animatiile de intrare si disparitie TEXT */}  




    return (
      <>
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
        <section className={`${styles.modelSection}`} >
          </section>        
        </div>
      </div>
     
      <div>
        
        <div className={`${styles.videoBack} pointer-events-none fixed animate__animated animate__fadeIn`}>
              {/* <video src="assets/video/sky.mp4" className='pointer-events-none' muted autoPlay loop/> */}
              <Image src="/assets/img/accueil/bgImg.png" width={1000} height={1000}  />
            </div>
            <div className={`${styles.logoBack}`} id='logoDelta'>
                <Image src="/assets/img/accueil/logoBig.png" className={`animate__animated ${logoDelta}`} width={2000} height={500} alt='logo Delta' />
              </div>

            
            {/**--------------------------------------------------------------------------------------------- */}  
            <div id='tlBurjFirst' className={`w-screen min-h-[150vh] top-[0vh] absolute z-0`}></div>
            <div className={`${styles.timelineBurj} absolute min-h-[350vh] z-0 md:top-[210vh] top-[220vh] w-full`} id='timeLineBurj'></div>
            <div id='tlFirstTextDiv' className={`absolute min-h-[10vh] top-[200vh] z-0 w-screen`}></div>
            <div id='tlSecondTextDiv' className={`absolute border-2 border-black min-h-[70vh] top-[260vh] z-0 w-screen`}></div>
            <div id='recenterBurj2to3' className={`absolute border-2 border-blue-600 min-h-[40vh] top-[340vh] z-0 w-screen`}></div>
            <div id='tlThirdTextDiv' className={`absolute min-h-[70vh] top-[390vh] z-0 w-screen`}></div>
            <div id='recenterBurj3to4' className={`absolute min-h-[40vh] top-[470vh] z-0 w-screen`}></div>
            <div id='tlLastTextDiv' className='absolute min-h-[40vh] top-[520vh] z-0 w-screen'></div>
            {/**--------------------------------------------------------------------------------------------- */}  
            <div className={`fixed top-0 z-[70] w-full min-h-[100vh]`} id='burjKhalifa'>
              <Canvas className={`animate__animated ${animationBurjEntry}`} style={{ width: "100vw", height: "100vh", zIndex: 10 }}> 
                    <directionalLight position={[-34.5, 50, 300]} intensity={25} scale={2000} castShadow={true} color="#c9deff" />{/**c9deff */}
                    <Model scale={scale} rotation={rotation}/>
              </Canvas>
            </div>
        </div>

        <section>
          <div  className={`${styles.textDiv} text-center left-[50%] md:top-[70%] top-[60%] translate-y-[-50%] translate-x-[-50%]`}>
            <h1 className={`animate__animated ${firstTextDiv} text-white !text-2xl md:text-4xl flex flex-col gap-3 justify-center items-center text-center`}>Welcome&nbsp;to<br /><Image src="/assets/img/accueil/logoWhite.png" width={400} height={300} /></h1>
          </div>
          <div className={`${styles.textDiv} text-center left-[60%] md:left-[75%] md:top-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]`}>
            <h1 className={`animate__animated ${secondTextDiv} text-white`}>
            notre expertise<br />
            <p className='py-5 px-2 mt-5 text-sm bg-white bg-opacity-30 backdrop-blur-sm rounded-xl'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis sunt quibusdam id inventore velit vel a totam soluta explicabo harum esse unde omnis nam aliquam dolores nisi dolorem, cupiditate iste?
            </p>
              <a href='#' className={styles.voirPlusBTN}>Voir plus</a>
            </h1>
          </div>
          <div className={`${styles.textDiv} text-center left-[40%] md:left-[25%] md:top-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]`}>
            <h1 className={`animate__animated ${thirdTextDiv} text-white`}>
              notre<br />selection<br />
              <CardCarousel />
            </h1>
          </div>

          <div className={`${styles.textDiv} text-center left-[50%] md:top-[50%] top-[40%] translate-y-[-50%] translate-x-[-50%]`}>
            <h1 className={`animate__animated ${lastTextDiv} flex flex-col gap-10 justify-center items-center w-full`}>
              <Image src="/assets/img/accueil/logoBig.png" width={500} height={500} className='w-[350px] md:w-full max-w-[600px]' alt='logo' />
              <div className='flex flex-row w-screen max-w-5xl h-fit justify-center items-center'>
                <a href='/achat' className={`${styles.cardHome}`}>
                  <Image src="/assets/img/accueil/ACHAT.png" width={300} height={300} />
                </a>
                <a href='/gestion-locative' className={`${styles.cardHome}`}>
                  <Image src="/assets/img/accueil/GESTION LOCATIVE.png" width={300} height={300} />
                </a>
                <a href='/achat' className={`${styles.cardHome}`}>
                  <Image src="/assets/img/accueil/LOCATION.png" width={300} height={300} />
                </a>  
              </div>
            </h1>
          </div>
        </section>
      </>
    );
}

export default Accueil