import React, { useState, useMemo, useEffect } from 'react';
import { allProjects } from '../components/Projects/data';
import ProjectDetailPage from '../components/Projects/ProjectDetailPage';
import ProjectsListPage from '../components/Projects/ProjectsListPage';
const App = () => {
    const getPathFromHash = () => window.location.hash.slice(1) || '/projects';

    const [path, setPath] = useState(getPathFromHash());

    useEffect(() => {
        const onHashChange = () => {
            setPath(getPathFromHash());
            window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', onHashChange);
        
        if (!window.location.hash) {
            window.location.hash = '/projects';
        }

        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    // This function handles all in-app navigation by changing the hash.
    const handleNavigate = (newPath) => {
        if (getPathFromHash() !== newPath) {
            window.location.hash = newPath;
        }
    };

    const handleProjectClick = (id) => handleNavigate(`/projects/${id}`);
    const handleBackClick = () => handleNavigate('/projects');

    const [pathname, search] = path.split('?');
    const pathSegments = pathname.split('/').filter(Boolean);
    const searchParams = new URLSearchParams(search || '');

    let pageContent;
    if (pathSegments[0] === 'projects' && pathSegments[1]) {
        const projectId = pathSegments[1];
        const selectedProject = allProjects.find(p => p.id === projectId);
        pageContent = selectedProject 
            ? <ProjectDetailPage project={selectedProject} onBackClick={handleBackClick} /> 
            : <ProjectsListPage onProjectClick={handleProjectClick} initialCategory="All" onNavigate={handleNavigate} />;
    } else {
        const initialCategory = searchParams.get('category');
        pageContent = <ProjectsListPage onProjectClick={handleProjectClick} initialCategory={initialCategory} onNavigate={handleNavigate} />;
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

export default App;
