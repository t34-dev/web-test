// animations/constants.ts
export const TRANSITIONS = {
  default: {
    type: "spring",
    duration: 0.2,
    bounce: 0.2,
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },

  center: {
    type: "spring",
    duration: 0.2,
    bounce: 0.2,
    damping: 15,
    stiffness: 400,
    mass: 0.8,
    scale: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      keyframes: [
        { scale: 0.5, opacity: 0 },
        { scale: 1.1, opacity: 1 },
        { scale: 1, opacity: 1 },
      ],
    },
  },
} as const;

export const MODAL_VARIANTS = {
  center: {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: "-50%",
      y: "-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: TRANSITIONS.center,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: "-50%",
      y: "-50%",
      transition: TRANSITIONS.default,
    },
  },
  // ... остальные варианты
} as const;
