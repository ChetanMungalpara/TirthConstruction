import { motion, useTransform, useScroll } from "framer-motion";
import React, { useState, useEffect, useRef } from 'react';
import { fetchTypesOfWork } from '../../services/apiService';

const Expertise = () => {
    const [expertiseData, setExpertiseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

     useEffect(() => {
        fetchTypesOfWork()
            .then(response => {
                const formattedData = response.data.map(item => ({...item, imageUrl: item.imageUrl}));
                setExpertiseData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching expertise data from backend:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-primary-dark rounded-lg text-white">
            <div className="container mx-auto p-4 pt-6 md:p-6">
                <h2 className="text-3xl font-bold">Our Expertise</h2>
            </div>
            <hr className="border-white-700" />

            {loading ? (
                <div className="w-full h-[50vh] flex justify-center items-center">
                    <h2 className="text-2xl font-bold animate-pulse">Loading...</h2>
                </div>
            ) : (
                <HorizontalScrollCarousel expertiseData={expertiseData} sectionRef={sectionRef} />
            )}
        </section>
    );
};

const HorizontalScrollCarousel = ({ expertiseData, sectionRef }) => {
    const targetRef = useRef(null);
    const motionContainerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["20%", `-${80 + (expertiseData.length - 4) * 20}%`]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const unsubscribeX = x.on("change", () => {
            if (!motionContainerRef.current || !sectionRef.current) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const centerLine = sectionRect.left + sectionRect.width / 2;

            let newActiveIndex = -1;

            motionContainerRef.current.childNodes.forEach((cardNode, index) => {
                const { left, right } = cardNode.getBoundingClientRect();

                const isTouchingLine = left < centerLine && right > centerLine;

                if (isTouchingLine) {
                    newActiveIndex = index;
                }
            });

            if (newActiveIndex !== -1) {
                setActiveIndex(newActiveIndex);
            }
        });

        // Cleanup function to remove the listener.
        return () => unsubscribeX();
    }, [x, sectionRef]);

    return (
        <div ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen flex items-center">
                <div className="overflow-x-hidden h-screen w-full">
                    <motion.div
                        ref={motionContainerRef}
                        style={{ x }}
                        transition={{ ease: "easeOut" }}
                        className="flex px-10 h-screen items-center"
                    >
                        {expertiseData.map((card, idx) => (
                            <motion.div
                                key={card._id || idx}
                                className="w-[55vw] md:w-[35vw] mr-[1rem] shrink-0"
                                animate={{
                                    opacity: activeIndex === idx ? 1 : 0.35,
                                }}
                                transition={{ opacity: { duration: 0.4, ease: "easeOut" } }}
                            >
                                <Card card={card} idx={idx} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};


// The Card component remains unchanged.
const Card = ({ card, idx }) => {
    const isReverse = idx % 2 === 1;
    const containerClasses = [
        "pr-[5.6vw] pb-0 pl-[3.15vw]",
        isReverse ? "pb-[2.5rem]" : "pt-[2.5rem]",
    ].join(" ");
    const linkclass = [
        "w-full h-full flex relative group hover:text-white transition-all duration-300",
        isReverse ? "flex-col-reverse mt-[-5rem] mb-0" : "flex-col mb-[-5rem]",
    ].join(" ");

    return (
        <a href={`/projects?category=${card.type}`} className={linkclass}>
            <div className="relative w-full aspect-[1.4] overflow-hidden rounded-md">
                <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Learn More
                    </span>
                </div>
            </div>
            <div className={containerClasses}>
                <h3 className="block text-xl font-medium leading-[1.4em]">{card.title}</h3>
                <p className="text-sm block mt-2 leading-[1.85em]">{card.description}</p>
            </div>
        </a>
    );
};

export default Expertise;
