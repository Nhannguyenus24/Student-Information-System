// ANIMATIONS

const fadeInLeft = (delay = 0) => ({
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay } },
});

const fadeInRight = (delay = 0) => ({
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay } },
});

const fadeInTop = (delay = 0) => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
});

const fadeInBottom = (delay = 0) => ({
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
});

export { fadeInLeft, fadeInRight, fadeInTop, fadeInBottom }