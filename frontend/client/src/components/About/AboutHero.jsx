import React, { useRef } from 'react';
import useOnScreen from '../ui/useOnScreen';

const AboutHero = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

    const title = "Building Dreams,";
    const title2 = "Forging Futures";



    const renderAnimatedTitle = () => {
        return (
            <>
                <div className="block width-full flex">
                    {title.split("").map((char, index) => (
                        <span
                            key={`line1-${index}`}
                            className="inline-block transition-transform duration-700 ease-out"
                            style={{
                                transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(90deg)',
                                transitionDelay: `${index * 50}ms`,
                                transformOrigin: 'bottom',
                            }}
                        >
                            {char === " " ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
                <div className="block width-full flex justify-end">
                    {title2.split("").map((char, index) => (
                        <span
                            key={`line2-${index}`}
                            className="inline-block transition-transform duration-700 ease-out"
                            style={{
                                transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(90deg)',
                                transitionDelay: `${(title.length + index) * 50}ms`,
                                transformOrigin: 'bottom',
                            }}
                        >
                            {char === " " ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
            </>
        );
    };


    return (
        <div className="w-full font-sans">
            <section
                className="relative flex items-center justify-center text-center h-screen w-full overflow-hidden rounded-[9.6px]"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-60 z-0" />

                {/* Text Content */}
                <div
                    ref={ref}
                    className="relative z-10 p-8 sm:p-16 max-w-4xl mx-auto"
                    style={{ perspective: '1000px' }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                        {renderAnimatedTitle()}
                    </h1>

                    <p
                        className={`mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        style={{ transitionDelay: '1500ms' }}
                    >
                        From a humble beginning in 1995 to a legacy of trust and quality in construction. We are Tirth Construction, a family-driven company dedicated to excellence and innovation in every project we undertake.
                    </p>
                </div>

                {/* Scroll Down Indicator */}
                <div
                    className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ transitionDelay: '2500ms' }}
                >
                    <div className="animate-bounce text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutHero;
