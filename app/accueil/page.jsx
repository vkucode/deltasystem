'use client'
import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { ChromaticAberration, Bloom, EffectComposer } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import styles from './accueil.module.scss'
import Link from 'next/link';
import AboutUs from './components/aboutUs';


const Accueil = () => {
    const model3d = "assets/models/new/burj.glb";
    const rotationRef = useRef([0.1, 0.1, 0.1]);
    const [rotation, setRotation] = useState([5.5, 0, 0]);
    const [scale, setScale] = useState(0.07);  //0.07
    const [rotationSpeed, setRotationSpeed] = useState(0.001); // Viteza de rotație inițială
    const [positionY, setPositionY] = useState(-7); // Poziția inițială pe axa Y
  
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

      useFrame(() => {
          if (modelRef.current) {
              modelRef.current.rotation.y += rotationSpeed;
          }
      });

      return <primitive ref={modelRef} object={model.scene} scale={scale} rotation={rotation} position={[0, positionY, 0]} />;
  };
  
      const CustomOrbitControls = () => {
        const controls = useRef();
        const { camera } = useThree();
    
        useEffect(() => {
          if (controls.current) {
            controls.current.enableZoom = false; // Dezactivează zoom-ul
            controls.current.enablePan = false; // Asigură că pan-ul este dezactivat
            controls.current.minDistance = 5.5;
            controls.current.maxDistance = 5.5;
            controls.current.minPolarAngle = Math.PI / 2;
            controls.current.maxPolarAngle = Math.PI / 2;
          }
        }, []);
        return <OrbitControls ref={controls} args={[camera]} />;
    };
  
    return (
      <>
      
      <section className={styles.modelSection}>
        <div className={styles.videoBack}>
          <video src="assets/video/sky.mp4" muted autoPlay loop/>
        </div>
        <div className={styles.logoBack}>
          <Image src="/assets/img/accueil/logoBig.png" width={2000} height={500} alt='logo Delta' />
        </div>
        <div className={styles.burjKhalif}>
          <Canvas style={{ width: "100vw", height: "100vh" }}>
                {/* <pointLight position={[12, -2, 0]} intensity={10000} />
                <spotLight position={[70, 70, 0]} intensity={100000}/> color="#c9deff"*/} 
                <directionalLight position={[-34.5, 200, 300]} intensity={40} scale={2000} castShadow={true} color="#c9deff" />
                <Model scale={scale} rotation={rotation}/>
                <OrbitControls enableZoom={false} enablePan={false} minDistance={5.5} maxDistance={5.5} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
          </Canvas>
        </div>
      </section>
      <section>
          <AboutUs />
      </section>
      </>
    );
}

export default Accueil