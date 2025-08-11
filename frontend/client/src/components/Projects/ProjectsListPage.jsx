import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';

// The component now fetches all necessary data
const ProjectsListPage = ({ onProjectClick, initialCategory, onNavigate }) => {
    // State for all data types
    const [allProjects, setAllProjects] = useState([]);
    const [allContractors, setAllContractors] = useState([]);
    const [allStatuses, setAllStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all data in parallel when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Promise.all fetches all data concurrently for better performance
                const [projectsRes, contractorsRes, statusesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/projects/'),
                    axios.get('http://localhost:5000/api/contractors/'),
                    axios.get('http://localhost:5000/api/statuses/')
                ]);
                setAllProjects(projectsRes.data);
                setAllContractors(contractorsRes.data);
                setAllStatuses(statusesRes.data);
            } catch (error) {
                console.error("Failed to fetch page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const activeFilter = initialCategory || 'All';
    const categories = useMemo(() => ['All', ...new Set(allProjects.map(p => p.typeId))], [allProjects]);

    const handleFilterClick = (category) => {
        const newPath = category === 'All' ? '/projects' : `/projects?category=${category}`;
        onNavigate(newPath);
    };

    const sortedAndFilteredProjects = useMemo(() => {
        return allProjects
            .filter(p => activeFilter === 'All' || p.typeId === activeFilter)
            .sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
    }, [activeFilter, allProjects]);

    if (loading) {
        return (
            <div className="text-center py-24">
                <h1 className="text-2xl font-bold text-gray-500 animate-pulse">Loading Projects...</h1>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 container mx-auto px-4 animate-fade-in">
            <div className="text-center mb-12"><h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">Our Projects</h1><p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">A testament to our dedication, quality, and timely delivery.</p></div>
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">{categories.map(category => (<button key={category} onClick={() => handleFilterClick(category)} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${activeFilter === category ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>{category}</button>))}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {sortedAndFilteredProjects.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onProjectClick={onProjectClick}
                        // Pass all the necessary data down to the card
                        allContractors={allContractors}
                        allStatuses={allStatuses}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsListPage;
