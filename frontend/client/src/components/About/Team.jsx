import React, { useState, useEffect, useRef } from 'react';
import useOnScreen from '../ui/useOnScreen';
import axios from 'axios';

// =================================================================================
// Team Section
// Fetches contractor data from the backend and displays it.
// =================================================================================
const Team = () => {
    // State to hold the fetched data and loading status
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/contractors/')
            .then(response => {
                setTeamMembers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching team members:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section className="w-full bg-neutral-800 py-16 sm:py-20 rounded-xl shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">The Pillars Of Our Company</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1200px' }}>
                    {loading ? (
                        // Display a simple loading text or skeleton loaders
                        <p className="text-white col-span-4 text-center">Loading team...</p>
                    ) : (
                        // Map over the data fetched from the backend
                        teamMembers.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} />
                        ))
                    )}
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
            // The link now correctly uses the database _id
            href={`/contractors#/contractors/${member.id}`}
            className={`group text-center bg-neutral-900 rounded-lg transition-all duration-700 ease-out border border-neutral-700 hover:!shadow-2xl hover:!shadow-orange-500/20`}
            style={{
                transform: isVisible ? 'rotateY(0) translateZ(0)' : 'rotateY(-45deg) translateZ(-100px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d'
            }}
        >
            <div className="p-6 transition-transform duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="relative inline-block mb-4">
                    <div className="w-40 h-40 rounded-full mx-auto bg-neutral-700 shadow-lg flex items-center justify-center border-2 border-neutral-600 transition-all duration-300 group-hover:border-[#f39c12] group-hover:shadow-lg group-hover:shadow-orange-500/30 overflow-hidden">
                        {/* Use the dpimageurl from the backend */}
                        <img 
                            src={member.dpimageurl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/160x160/404040/FFFFFF?text=Image'; }}
                        />
                    </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-[#f39c12] font-semibold">{member.role}</p>
            </div>
        </a>
    );
};
export default Team;
