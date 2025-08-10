import React, { useState, useEffect, useRef } from 'react';
import useOnScreen from '../ui/useOnScreen';

// =================================================================================
// Team Section
// BG: Dark Gray (#262626). Animation: 3D perspective tilt.
// =================================================================================
const Team = () => {
    const teamMembers = [
        { name: "Pravinbhai G. Mungalpara", role: "Founder & Visionary", id: 1 },
        { name: "Vinubhai G. Mungalpara", role: "Co-Founder & Operations Head", id: 2 },
        { name: "Nareshbhai G. Mungalpara", role: "Co-Founder & Project Manager", id: 3 },
        { name: "Rajubhai Bhadani", role: "Founding Partner & Site Supervisor", id: 4 }
    ];

    return (
        <section className="w-full bg-neutral-800 py-16 sm:py-20 rounded-xl shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">The Pillars Of Our Company</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1200px' }}>
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TeamMemberCard = ({ member, index }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });

    return (
        <a 
            ref={ref} 
            className={`group text-center bg-neutral-900 rounded-lg transition-all duration-700 ease-out border border-neutral-700 hover:!shadow-2xl hover:!shadow-orange-500/20`}
            href={`http://localhost:5173/contractors#/contractors/${member.id}`}
            style={{
                transform: isVisible ? 'rotateY(0) translateZ(0)' : 'rotateY(-45deg) translateZ(-100px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d'
            }}
        >
            <div className="p-6 transition-transform duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="relative inline-block mb-4">
                    <div className="w-40 h-40 rounded-full mx-auto bg-neutral-700 shadow-lg flex items-center justify-center border-2 border-neutral-600 transition-all duration-300 group-hover:border-[#f39c12] group-hover:shadow-lg group-hover:shadow-orange-500/30">
                        <p className="text-gray-400 text-sm">Image</p>
                    </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-[#f39c12] font-semibold">{member.role}</p>
            </div>
        </a>
    );
};
export default Team;