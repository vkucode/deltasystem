import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const BasicFAQ = () => {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        
        <Question title="En quoi consiste la gestion locative?">
          <p>
          La gestion locative englobe toutes les tâches liées à la location d'un bien au nom du propriétaire, que ce soit pour des locations de courte ou de longue durée. Cela comprend la recherche de locataires, la gestion des visites, la rédaction et la signature des contrats de location, la perception des loyers, ainsi que la gestion des réparations et de l'entretien. De plus, elle s'occupe des aspects administratifs et financiers de la location. L'agence sert d'intermédiaire entre le propriétaire et le locataire pour garantir une location fluide et sans tracas.
          </p>
        </Question>
        <Question title="Puis-je arreter a tout moment?">
          <p>
          Nous comprenons que les propriétaires peuvent avoir des besoins et des préférences changeants en matière de gestion de leur bien. C'est pourquoi nous tenons à souligner que nos contrats de gestion locative offrent une flexibilité totale aux propriétaires. Vous avez le droit de mettre fin au contrat de gestion locative avec notre agence à tout moment, sans avoir à vous justifier. Nous croyons fermement que cette liberté vous permet de reprendre le contrôle de la gestion de votre bien quand vous le souhaitez, en toute simplicité. Nous vous encourageons à prendre contact avec nous pour discuter des modalités de résiliation du contrat et pour faciliter une transition en douceur si vous décidez de mettre fin à notre collaboration. Votre satisfaction et votre tranquillité d'esprit sont notre priorité.
          </p>
        </Question>
        <Question title="Combien dois-je mettre?">
          <p>
          Nous croyons en une transparence totale lorsqu'il s'agit de nos services de gestion locative. Chez nous, les propriétaires n'ont aucun frais directs. Au lieu de cela, nous appliquons une commission de 15 % sur les transactions pour couvrir nos services complets. Notre commission inclut la gestion proactive des annonces sur des plateformes telles que Booking et Airbnb, garantissant une visibilité optimale pour votre propriété et attirant un flux constant de locataires potentiels. En plus de cela, nous nous chargeons de la recherche et de la sélection des locataires, de la collecte des loyers, de la gestion des réparations et de l'entretien, ainsi que des services supplémentaires comme le ménage entre les locations. Nous sommes convaincus que cette commission reflète la qualité et la valeur de nos services, vous offrant tranquillité d'esprit et qualité de service sans compromis. N'hésitez pas à nous contacter pour en savoir plus sur la manière dont nous pouvons vous aider à maximiser le rendement de votre investissement immobilier.
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "rgba(3, 6, 23, 0)",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="bg-gradient-to-r uppercase from-teal-900 to-teal-600 bg-clip-text text-left text-lg font-medium"
        style={{fontFamily: "Montserrat", letterSpacing: "2px", wordSpacing: "5px"}}
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "#1e4b4a",
            },
            closed: {
              rotate: "0deg",
              color: "#1e4b4a",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <p ref={ref}>{children}</p>
      </motion.div>
    </motion.div>
  );
};

export default BasicFAQ;