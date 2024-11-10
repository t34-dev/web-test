// const.ts
export const TRANSITIONS = {
  default: {
    type: "spring",
    duration: 0.2,
    bounce: 0.2,
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  fadeInOut: {
    duration: 0.2,
    ease: "easeInOut",
  },
  center: {
    type: "spring",
    duration: 0.2,
    bounce: 0.2,
    damping: 20,
    stiffness: 400,
    mass: 0.8,
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
  left: {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: TRANSITIONS.default,
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: TRANSITIONS.fadeInOut,
    },
  },
  right: {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: TRANSITIONS.default,
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: TRANSITIONS.fadeInOut,
    },
  },
  top: {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: TRANSITIONS.default,
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: TRANSITIONS.fadeInOut,
    },
  },
  bottom: {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: TRANSITIONS.default,
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: TRANSITIONS.fadeInOut,
    },
  },
} as const;
