
const transition = { duration: 0.5, ease: "easeInOut" };
const Variants = {
    variant1:{
        initial: { y: 100, opacity: 0 },
        enter: { y: 0, opacity: 1, transition },
        exit: { y: -100, opacity: 0, transition }
    },
     variant2:{
         enter: { transition: { staggerChildren: 0.1 } },
         exit: { transition: { staggerChildren: 0.1 } }
     },
     variant3:{
         initial: { x: "100%", opacity: 0 },
         enter: { x: 0, opacity: 1, transition },
         exit: { x: "-100%", opacity: 0, transition }
     }

};

 export default Variants;