export const BounceDown = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.5,
    },
  },
}
