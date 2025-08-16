
import React, { useState, useEffect } from 'react';
import {
    fetchProjects,
    adminDeleteProject,
    adminCreateProject,
    fetchTypesOfWork,
    fetchStatuses,
    fetchContractors
} from '../../../client/src/services/apiService';
import { Briefcase, Edit, Trash2, PlusCircle, X } from 'lucide-react';
import ProjectForm from '../components/ProjectForm'; // Import the new form

const ManageProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for form dropdowns
    const [availableData, setAvailableData] = useState({
        types: [],
        statuses: [],
        contractors: []
    });

    const loadPageData = async () => {
        setLoading(true);
        try {
            // Fetch all data in parallel
            const [projectsRes, typesRes, statusesRes, contractorsRes] = await Promise.all([
                fetchProjects(),
                fetchTypesOfWork(),
                fetchStatuses(),
                fetchContractors()
            ]);
            setProjects(projectsRes.data);
            setAvailableData({
                types: typesRes.data,
                statuses: statusesRes.data,
                contractors: contractorsRes.data
            });
        } catch (error) {
            console.error("Failed to load page data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPageData();
    }, []);

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await adminDeleteProject(projectId);
                loadPageData(); // Refresh list
            } catch (error) {
                alert('Failed to delete project.');
            }
        }
    };

    const handleAddProject = async (projectData) => {
        try {
            // Create a new object without the _id field
            const { _id, ...newProjectData } = projectData;

            await adminCreateProject(newProjectData); // <-- Send the clean object

            setIsModalOpen(false);
            loadPageData(); // Refresh the project list
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Error: Could not create project.');
        }
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Briefcase className="mr-3" /> Manage All Projects</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center transition">
                    <PlusCircle size={20} className="mr-2" /> Add New Project
                </button>
            </div>
            {/* ... table code remains the same ... */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Title</th>
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Status</th>
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-left">Start Date</th>
                            <th className="px-5 py-3 border-b-2 border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm font-semibold">{project.title}</td>
                                {/* Now we can display the actual status title */}
                                <td className="px-5 py-4 text-sm">{availableData.statuses.find(s => s._id === project.statusId)?.title || 'N/A'}</td>
                                <td className="px-5 py-4 text-sm">{new Date(project.startdate).toLocaleDateString()}</td>
                                <td className="px-5 py-4 text-sm text-center flex justify-center space-x-4">
                                    <button className="text-indigo-600 hover:text-indigo-900"><Edit size={20} /></button>
                                    <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900"><Trash2 size={20} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add New Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Add New Project</h2>
                            <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <ProjectForm
                            onSubmit={handleAddProject}
                            onCancel={() => setIsModalOpen(false)}
                            availableData={availableData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProjectsPage;