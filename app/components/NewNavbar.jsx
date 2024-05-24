import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import 'animate.css'

const FlipNavWrapper = () => {
  return (
      <FlipNav />
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed z-50 h-[90px] lg:overflow-hidden animate__animated animate__fadeInDown w-full bg-teal-900 lg:bg-white top-0 pr-10 lg:pr-5 flex items-center justify-between">
      <NavLeft setIsOpen={setIsOpen} />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};


const Logo = () => {
    return (
      <a href="/">
        <div className="py-8 pl-5 lg:px-16 bg-teal-900 max-h-[90px]">
          <Image src="/assets/img/accueil/logoBig.png" width={150} height={90} alt="logo Delta" />
        </div>
      </a>
      
    );
  };

const NavLeft = ({ setIsOpen }) => {
  return (
    <div className="flex flex-row w-full justify-between lg:justify-around items-center gap-6">
      <Logo />
      <NavLink text="Achat" link="/achat" />
      <NavLink text="Location" link="/location" />
      <NavLink text="Gestion locative" link="/gestion-locative" />
      <NavLink text="actualite" link="/actualite" />
      <NavLink text="notre agence" link="/notre-agence" />
      <NavLink text="nous contacter" link="/contact" />
      <NavLink text="en | fr" link="#" />
      <div>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block lg:hidden text-yellow-50 text-2xl"
            onClick={() => setIsOpen((pv) => !pv)}
        >
            <FiMenu />
        </motion.button>
      </div>
    </div>
  );
};

const NavLink = ({ text, link }) => {
  return (
    <a
      href={link}
      rel="nofollow"
      className="hidden lg:block h-[30px] overflow-hidden uppercase font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-teal-800">
          {text}
        </span>
      </motion.div>
    </a>
  );
};


const NavMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-teal-900 shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink text="Achat" link="/achat" />
      <MenuLink text="Location" link="/location" />
      <MenuLink text="Gestion locative" link="/gestion-locative" />
      <MenuLink text="actualite" link="/actualite" />
      <MenuLink text="notre agence" link="/notre-agence" />
      <MenuLink text="nous contacter" link="/contact" />
      <MenuLink text="en | fr" link="#" />
    </motion.div>
  );
};

const MenuLink = ({ text, link }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href={link}
      className="h-[30px] overflow-hidden font-medium text-lg uppercase flex items-start gap-2"
    >
      {/* <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span> */}
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-yellow-50">{text}</span>
        <span className="flex items-center h-[30px] text-yellow-50">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

export default FlipNavWrapper;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};