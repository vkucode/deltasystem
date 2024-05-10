'use client'
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Segment, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styles from './accueil.module.scss'
import Link from 'next/link';
import AboutUs from './components/aboutUs';
import 'animate.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollSmoother from 'gsap/src/ScrollSmoother';


const Accueil = () => {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const model3d = "assets/models/new/burj.glb";
    const rotationRef = useRef([0.1, 0.1, 0.1]);
    const [burjOpacityStyle, setBurjOpacityStyle] = useState("hidden");
    const [logoDelta, setLogoDelta] = useState("animate__fadeInUp animate__delay-1s");
    const [windowsStyles, setWindowsStyles] = useState("");
    const [rotation, setRotation] = useState([-1, 0, 0]);
    const [scale, setScale] = useState(0.07);  //0.07
    const [rotationSpeed, setRotationSpeed] = useState(0.001); // Viteza de rotație inițială
    const [positionY, setPositionY] = useState(-80); // Poziția inițială pe axa Y
  
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

      return <primitive ref={modelRef} object={model.scene} scale={scale} rotation={rotation} position={[0, positionY, 0]} />;
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

    useEffect(() => {

      ScrollTrigger.create({
        trigger: "#tlBurjFirst",
        start: "top 100px",
        end: "bottom 100px",
        scrub: true,
        // markers: true,
        ease: "power2.out",
        onEnter: () => {setPositionY('-80'), setLogoDelta("opacity-50")},
        onLeave: () => setPositionY('-8'),
        onUpdate: (self) => {
          const progress = self.progress;
          const negativeOpacity = 100 - (progress * 100);
          const setPostitionBurjY = -80 + (progress * 72);
          const rotationValueX = -1.5 + (progress * 1);
          setLogoDelta("opacity-" + negativeOpacity);
          setRotation([rotationValueX, 0, 0]);
          setPositionY(setPostitionBurjY);
        }
        
      });
  
  
  
    }, []);
  

  useEffect(() => {

    ScrollTrigger.create({
      trigger: "#timeLineBurj",
      endTrigger: "",
      start: "top 400px",
      end: "bottom 200px",
      scrub: true,
      onEnter: () => {setRotation([-0.5, 0, 0]);},
      onUpdate: (self) => {
        const progress = self.progress;
        const rotationValueY = progress * 3 * Math.PI;
        const rotationValueX = -0.5 + (progress * 0.5);
        const setPostitionBurjY = -8 + (progress * (0 - 50));
        setRotation([rotationValueX, rotationValueY, 0]);
        setPositionY(setPostitionBurjY);
      }

    });



  }, []);

{/* ----------------------------------------------------------- Animatiile de intrare si animatiile la burj Khalifa */}
{/* ----------------------------------------------------------- Animatiile de intrare si disparitie TEXT */}  

const [firstTextDiv, setFirstTextDiv] = useState("opacity-0");

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
    onToggle: (self) => {
      setFirstTextDiv("animate__fadeInUp")
    }

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
        <div className={`${styles.videoBack} fixed animate__animated animate__fadeIn`}>
              <video src="assets/video/sky.mp4" muted autoPlay loop/>
            </div>
            <div className={`${styles.logoBack}`} id='logoDelta'>
                <Image src="/assets/img/accueil/logoBig.png" className={`animate__animated ${logoDelta}`} width={2000} height={500} alt='logo Delta' />

              </div>

            
            {/**--------------------------------------------------------------------------------------------- */}  
            <div id='tlBurjFirst' className={`w-screen min-h-[150vh] top-[10vh] absolute z-0`}></div>
            <div className={`${styles.timelineBurj} absolute min-h-[350vh] z-0 md:top-[200vh] top-[220vh] w-full`} id='timeLineBurj'></div>
            <div id='tlFirstTextDiv' className={`absolute min-h-[10vh] top-[200vh] z-0 w-screen`}></div>
            {/**--------------------------------------------------------------------------------------------- */}  
            <div className={`fixed animate__animated top-0 z-30  w-full min-h-[100vh]`} id='burjKhalifa'>
              <Canvas style={{ width: "100vw", height: "100vh", zIndex: 10 }}> 
                    <directionalLight position={[-34.5, 200, 300]} intensity={40} scale={2000} castShadow={true} color="#c9deff" />
                    <Model scale={scale} rotation={rotation}/>
              </Canvas>
            </div>
        </div>

        <section>
          <div  className={`${styles.textDiv} text-center left-[50%] top-[70%] translate-y-[-50%] translate-x-[-50%]`}>
            <h1 className={`animate__animated ${firstTextDiv}`}>Welcome to Delta</h1>
          </div>
          {/* <div className={`${styles.textDiv} hidden`}>
            <h1>Lorem Ipsum</h1>
          </div> */}
        </section>
      </>
    );
}

export default Accueil