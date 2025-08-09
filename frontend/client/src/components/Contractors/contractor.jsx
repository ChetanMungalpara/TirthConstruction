import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaBriefcase, FaPhone, FaEnvelope, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { projects } from './data';
import ProjectCard from './ProjectCard';
const IndividualFounderView = ({ contractor }) => {
    const [filter, setFilter] = useState('All');
    const contractorProjects = useMemo(() => {
        const p = projects.filter(proj => proj.contractorIds.includes(contractor.id));
        if (filter === 'All') return p;
        return p.filter(proj => proj.type === filter);
    }, [contractor.id, filter]);

    const projectTypes = useMemo(() => ['All', ...new Set(projects.filter(p => p.contractorIds.includes(contractor.id)).map(p => p.type))], [contractor.id]);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto border-t-4 border-yellow-400">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
                <div className="md:col-span-1">
                    <img
                        src={contractor.imgSrc}
                        alt={contractor.name}
                        className="w-full h-auto aspect-[3/4] object-cover rounded-lg shadow-2xl"
                    />
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{contractor.name}</h2>
                    <p className="text-xl text-yellow-600 font-bold mt-2">{contractor.role}</p>
                    <hr className="my-6" />
                    <p className="text-gray-700 mt-6 leading-relaxed text-lg">{contractor.bio}</p>
                </div>
            </div>

            <div className="my-12 italic bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-400">
                <FaQuoteLeft className="text-yellow-500 text-2xl mb-2" />
                <p className="text-gray-800 text-lg">{contractor.quote}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                         <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2"><FaStar className="text-yellow-500"/> Key Skills</h3>
                         <div className="flex flex-wrap gap-2">
                            {contractor.keySkills.map(skill => (
                                <span key={skill} className="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                                    {skill}
                                </span>
                            ))}
                         </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Key Statistics</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><FaBriefcase className="text-yellow-500"/><span>{contractor.projectsCount}+ Projects Delivered</span></div>
                            <div className="flex items-center gap-3"><FaCalendarAlt className="text-yellow-500"/><span>{contractor.experience} Years of Experience</span></div>
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><FaEnvelope className="text-yellow-500"/><a href={`mailto:${contractor.contact.email}`} className="text-blue-600 hover:underline">{contractor.contact.email}</a></div>
                            <div className="flex items-center gap-3"><FaPhone className="text-yellow-500"/><span>{contractor.contact.phone}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Associated Projects</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-600">Filter by type:</span>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500">
                           {projectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                 </div>
                <AnimatePresence>
                    <motion.div 
                        layout 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {contractorProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </motion.div>
                 </AnimatePresence>
                 {contractorProjects.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No projects found for this filter.</p>
                 )}
            </div>
        </div>
    );
};
export default IndividualFounderView;