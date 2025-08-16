
import React, { useState, useEffect } from 'react';

import { fetchProjects } from '../services/apiService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ProjectDetailPage from '../components/Projects/ProjectDetailPage';
import ProjectsListPage from '../components/Projects/ProjectsListPage';

const ProjectsPage = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchProjects()
            .then(response => {
                setAllProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    // This entire useEffect for hash changes can now be DELETED.
    // The useParams() hook handles it for us automatically.

    const handleProjectClick = (projectId) => navigate(`/projects/${projectId}`);
    const handleBackClick = () => navigate('/projects');
    const handleNavigate = (newPath) => navigate(newPath);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-800 animate-pulse">Loading Projects...</h1>
            </div>
        );
    }

    // Check if an ID is present in the URL
    if (id) {
        const selectedProject = allProjects.find(p => p._id === id);
        return <ProjectDetailPage project={selectedProject} onBackClick={handleBackClick} />;
    }

    // If no ID, show the list page
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get('category');
    return <ProjectsListPage onProjectClick={handleProjectClick} initialCategory={initialCategory} onNavigate={handleNavigate} />;
};

export default ProjectsPage;