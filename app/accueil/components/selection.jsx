'use client'
import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const CardCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="bg-transparent" ref={ref}>
      <div className="relative overflow-hidden p-4">
        {/* CARDS */}
        <div className="mx-auto max-w-6xl">
          
          <motion.div
            animate={{
              x: offset,
            }}
            className="flex"
          >
            {items.map((item) => {
              return <Card key={item.id} {...item} />;
            })}
          </motion.div>
        </div>

        {/* BUTTONS */}
        <>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
            }}
            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
            }}
            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
            onClick={shiftRight}
          >
            <FiChevronRight />
          </motion.button>
        </>
      </div>
    </section>
  );
};

const Card = ({ url, price, title, description }) => {
  return (
    <div
      className="relative shrink-0 cursor-pointer bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute bottom-0 bg-white z-20 py-4 w-3/4" style={{fontFamily: "Montserrat"}}>
        <p className="text-xl uppercase text-black font-bold" style={{letterSpacing: "3px"}}>{title}</p>
        <p className="text-sm text-black">{description}</p>
        <p className="text-sm text-black" style={{letterSpacing: "3px"}}>{price}</p>
      </div>
    </div>
  );
};

export default CardCarousel;

const items = [
  {
    id: 1,
    url: "/assets/img/accueil/appart.jpg",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
  {
    id: 2,
    url: "/assets/img/accueil/appart2.png",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
  {
    id: 3,
    url: "/assets/img/accueil/appart3.png",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
  {
    id: 4,
    url: "/assets/img/accueil/appart.jpg",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
  {
    id: 5,
    url: "/assets/img/accueil/appart.jpg",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
  {
    id: 6,
    url: "/assets/img/accueil/appart.jpg",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
  {
    id: 7,
    url: "/assets/img/accueil/appart.jpg",
    title: "Orbis",
    description:
      "4 Chambres 150 m2",
    price: "7 000 000 $"
  },
];