import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import ProjectDetailPage from '../components/Projects/ProjectDetailPage';
import ProjectsListPage from '../components/Projects/ProjectsListPage';

const ProjectsPage = () => {
    // State to hold all projects, fetched from the backend
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // State to manage the current URL path from the hash
    const [path, setPath] = useState(() => window.location.hash.slice(1) || '/projects');

    // Fetch all projects from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/api/projects/')
            .then(response => {
                setAllProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    // Effect to listen for changes in the URL hash
    useEffect(() => {
        const onHashChange = () => {
            setPath(window.location.hash.slice(1) || '/projects');
            window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', onHashChange);
        if (!window.location.hash) {
            window.location.hash = '/projects';
        }
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const handleNavigate = (newPath) => {
        if ((window.location.hash.slice(1) || '/projects') !== newPath) {
            window.location.hash = newPath;
        }
    };

    const handleProjectClick = (id) => handleNavigate(`/projects/${id}`);
    const handleBackClick = () => handleNavigate('/projects');

    // --- RENDER LOGIC ---

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-800 animate-pulse">Loading Projects...</h1>
            </div>
        );
    }

    const [pathname, search] = path.split('?');
    const pathSegments = pathname.split('/').filter(Boolean);
    const searchParams = new URLSearchParams(search || '');

    let pageContent;
    if (pathSegments[0] === 'projects' && pathSegments[1]) {
        const projectId = pathSegments[1];
        // Find the selected project from the data we fetched
        const selectedProject = allProjects.find(p => p.id === projectId);
        pageContent = selectedProject 
            ? <ProjectDetailPage project={selectedProject} onBackClick={handleBackClick} /> 
            : <ProjectsListPage allProjects={allProjects} onProjectClick={handleProjectClick} initialCategory="All" onNavigate={handleNavigate} />;
    } else {
        const initialCategory = searchParams.get('category');
        pageContent = <ProjectsListPage allProjects={allProjects} onProjectClick={handleProjectClick} initialCategory={initialCategory} onNavigate={handleNavigate} />;
    }

    return (
        <div className="bg-gray-50 min-h-screen rounded-[9.6px] font-sans">
            {pageContent}
            <style>{`
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                } 
                .animate-fade-in { 
                    animation: fadeIn 0.5s ease-in-out forwards; 
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;
