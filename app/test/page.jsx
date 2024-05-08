'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'



const page = () => {

    gsap.registerPlugin(ScrollTrigger) 

    // useEffect(() => {

    
    //     gsap.to("#a",{
    //         scrollTrigger: {
    //             trigger: "#a",
    //             endTrigger: "#b",
    //             markers: true,
    //             start: "top center",
    //             end: "+=300px",
    //             scrub: 2,
    //         },
    //         x: 400,
    //         rotation: 360,
    //         duration: 3
    //     })


    // }, []);

  return (
    <div className='min-h-[100vh] mt-[10%] border-2 border-black'>
        <div className='a w-20 h-20 mt-[50%] bg-black' id='a'></div>
        <div className='b w-20 h-20 bg-blue-900' id='b'></div>


    </div>
  )
}

export default page