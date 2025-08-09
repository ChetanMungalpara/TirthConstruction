import React, { useState, useMemo, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { allProjects } from './data';

const ProjectsListPage = ({ onProjectClick, initialCategory, onNavigate }) => {
    const activeFilter = initialCategory || 'All';
    const categories = useMemo(() => ['All', ...new Set(allProjects.map(p => p.category))], []);

    const handleFilterClick = (category) => {
        if (category === 'All') {
            onNavigate('/projects');
        } else {
            onNavigate(`/projects?category=${category}`);
        }
    };

    const sortedAndFilteredProjects = useMemo(() => {
        return allProjects
            .filter(p => activeFilter === 'All' || p.category === activeFilter)
            .sort((a, b) => {
                if (a.status === 'Under Construction' && b.status !== 'Under Construction') return -1;
                if (a.status !== 'Under Construction' && b.status === 'Under Construction') return 1;
                if (a.endDate === null && b.endDate !== null) return -1;
                if (a.endDate !== null && b.endDate === null) return 1;
                return new Date(b.startDate) - new Date(a.startDate);
            });
    }, [activeFilter]);

    return (
        <div className="pt-24 pb-16 container mx-auto px-4 animate-fade-in">
            <div className="text-center mb-12"><h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">Our Projects</h1><p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">A testament to our dedication, quality, and timely delivery.</p></div>
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">{categories.map(category => (<button key={category} onClick={() => handleFilterClick(category)} className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${activeFilter === category ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}>{category}</button>))}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">{sortedAndFilteredProjects.map((project) => (<ProjectCard key={project.id} project={project} onProjectClick={onProjectClick}/>))}</div>
        </div>
    );
};

export default ProjectsListPage;
