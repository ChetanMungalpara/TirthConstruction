import React, { useMemo } from 'react';
import { FaUsers, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import { contractors, events } from './data';
const AllFoundersView = ({ setSelectedEvent }) => {
    const totalProjects = useMemo(() => contractors.reduce((sum, c) => sum + c.projectsCount, 0), []);
    const combinedExperience = useMemo(() => contractors.reduce((sum, c) => sum + c.experience, 0), []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto border-t-4 border-yellow-400">
            <div className="text-center">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Our Founders</h2>
                 <p className="text-xl text-yellow-600 font-bold mt-2">The Pillars of Tirth Construction</p>
                 <div className="flex justify-center my-6">
                    {contractors.map((c, index) => (
                        <img key={c.id} src={c.imgSrc} alt={c.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-lg" style={{ zIndex: contractors.length - index, marginLeft: index > 0 ? '-20px' : '0' }} />
                    ))}
                 </div>
                 <p className="text-gray-700 mt-4 leading-relaxed text-lg max-w-3xl mx-auto">
                    Each founder brings a unique set of skills and unwavering dedication, forming the strong foundation upon which our company is built. Together, they lead with a shared vision of quality, integrity, and excellence. Click on an individual above to learn more about their specific role and expertise.
                 </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <FaBuilding className="text-4xl text-yellow-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-800">{totalProjects}+</p>
                    <p className="text-gray-500 font-semibold">Projects Completed</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <FaCalendarAlt className="text-4xl text-yellow-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-800">{combinedExperience}+</p>
                    <p className="text-gray-500 font-semibold">Years Combined Experience</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <FaUsers className="text-4xl text-yellow-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-800">4</p>
                    <p className="text-gray-500 font-semibold">Core Founders</p>
                </div>
            </div>
            <div className="mt-16">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Happenings at Tirth</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event.id} className="cursor-pointer group relative rounded-lg overflow-hidden shadow-lg" onClick={() => setSelectedEvent(event)}>
                            <img src={event.imgSrc} alt={event.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-lg font-bold text-center p-4">{event.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default AllFoundersView;