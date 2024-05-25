import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export const CountUpStats = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 md:py-24">
      <div className="flex flex-col items-center gap-0 sm:gap-10 justify-center sm:flex-row">
        <Stat
          num={15}
          suffix="+"
          subheading="années d'expérience"
        />
        <div className="h-[1px] w-12 bg-yellow-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={3}
          // decimals={1}
          suffix="K+"
          subheading="clients satisfaits"
        />
        <div className="h-[1px] w-12 bg-yellow-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={20}
          suffix="B+"
          subheading="transactions effectuées"
        />
      </div>
    </div>
  );
};

const Stat = ({ num, suffix, decimals = 0, subheading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-8 sm:py-0">
      <p className="mb-2 text-center text-4xl text-yellow-50 font-semibold md:text-7xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-72 text-center text-sm md:text-base text-yellow-50 uppercase">{subheading}</p>
    </div>
  );
};