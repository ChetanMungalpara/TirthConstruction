import React, { useState, useEffect, useRef } from 'react';
import useOnScreen from '../ui/useOnScreen';
// =================================================================================
// Timeline Section
// BG: Light Gray (#E5E7EB). Animation: 3D card flip on the Y-axis.
// =================================================================================
const Timeline = () => {
    const events = [
        { year: "1995", title: "Humble Beginnings", description: "Our founder, Pravinbhai Mungalpara, and his maternal brother, Rajubhai Bhadani, started their journey with small-scale home constructions." },
        { year: "2004", title: "The Company is Born", description: "With Pravinbhai's brothers, Vinubhai and Nareshbhai, joining the mission, Tirth Construction was officially formed." },
        { year: "2010s", title: "Industrial Expansion", description: "We ventured into large-scale industrial projects, building cotton and jeans mills, and invested in advanced equipment." },
        { year: "Present", title: "A Trusted Name", description: "Today, we handle diverse projects, including government contracts, backed by a belief in on-time delivery and client satisfaction." }
    ];
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <section ref={ref} className="w-full py-16 sm:py-20 bg-gradient-to-b from-gray-200 to-neutral-900 rounded-xl shadow-lg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-20">Our Journey Through Time</h2>
                <div className="relative">
                    <div className="absolute left-1/2 w-0.5 bg-gray-300 h-full transform -translate-x-1/2"></div>
                    <div
                        className="absolute left-1/2 w-0.5 bg-[#f39c12] h-full transform -translate-x-1/2 origin-top transition-transform duration-1000 ease-out"
                        style={{ transform: isVisible ? 'scaleY(1)' : 'scaleY(0)', transitionDelay: '300ms' }}
                    ></div>
                    {events.map((event, index) => (
                        <TimelineItem key={index} event={event} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};


const TimelineItem = ({ event, index }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    const isOdd = index % 2 !== 0;

    return (
        <div ref={ref} className={`w-full mb-12 flex items-center ${isOdd ? 'flex-row-reverse' : ''}`} style={{ perspective: '800px' }}>
            <div className="w-1/2 px-4">
                <div
                    className={`transition-all duration-700 ease-in-out`}
                    style={{
                        transform: isVisible ? 'rotateY(0deg) scale(1)' : `rotateY(${isOdd ? '90deg' : '-90deg'}) scale(0.9)`,
                        opacity: isVisible ? 1 : 0,
                        transformOrigin: isOdd ? 'right' : 'left'
                    }}
                >
                    <div className={`p-6 bg-white rounded-lg shadow-xl border border-gray-200 text-left`}>
                        <p className="text-2xl font-bold text-[#f39c12]">{event.year}</p>
                        <h3 className="text-xl font-semibold text-gray-800 mt-2">{event.title}</h3>
                        <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex justify-center">
                 <div className={`z-10 w-5 h-5 bg-gray-200 border-2 border-[#f39c12] rounded-full transition-all duration-500 delay-500 transform ${isVisible ? 'scale-125 shadow-lg' : 'scale-0'}`}></div>
            </div>
        </div>
    );
};
export default Timeline;