import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const expertiseData = [
    {
        title: "Residential Construction",
        description: "Crafting high-quality homes since 1995, we deliver expert craftsmanship, on-time completion, and cost-friendly solutions for every family.",
        imageUrl: "/img/Expertise/img1.jpeg",
        link: "/projects#/projects?category=Residential",
    },
    {
        title: "Farmhouse Projects",
        description: "Designing and building luxury farmhouses on your own land—complete with modern amenities and beautiful landscapes.",
        imageUrl: "/img/Expertise/img2.jpg",
        link: "/projects#/projects?category=Infrastructure",
    },
    {
        title: "Industrial Complexes",
        description: "Specializing in cotton jeans mills and other industrial builds, optimized for efficiency, quality, and rapid turnaround.",
        imageUrl: "/img/Expertise/img3.jpg",
        link: "/projects#/projects?category=Industrial",
    },
    {
        title: "Government & Infrastructure",
        description: "Partnering on government-led STP plants, warehouses, and civic projects—delivering precision and compliance from start to finish.",
        imageUrl: "/img/Expertise/img4.jpg",
        link: "/projects#/projects?category=Commercial",
    },
];

const Expertise = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-80%"]);
    const step = 1 / expertiseData.length;

    const activeIndex = useTransform(scrollYProgress, value => {
        return Math.floor(value / step);
    });

    return (
        <section className="w-full bg-primary-dark rounded-[9.6px] text-accent-secondary">
            <div className="container mx-10 p-4 pt-6 md:p-6">
                <h2 className="text-3xl font-bold">Our Expertise</h2>
            </div>
            <hr /><hr />
            <div ref={targetRef} className="relative h-[300vh]">
                <div className="sticky top-0 h-screen flex items-center">
                    <div className="overflow-x-hidden h-screen">
                        <motion.div
                            style={{ x }}
                            transition={{ ease: "easeOut", duration: 3000 }}
                            className="flex px-10 h-screen items-center"
                        >
                            {expertiseData.map((card, idx) => (
                                <motion.div
                                    key={idx}
                                    className="w-[55vw] md:w-[35vw] mr-[1rem] shrink-0"
                                    style={{
                                        opacity: useTransform(activeIndex, (latestIndex) => {
                                            return latestIndex === idx ? 1 : 0.35;
                                        }),
                                        transition: "opacity 0.4s ease"
                                    }}
                                >
                                    <Card card={card} idx={idx} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

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
        <a href={card.link} className={linkclass}>
            <div className="relative w-full aspect-[1.4] overflow-hidden">
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
