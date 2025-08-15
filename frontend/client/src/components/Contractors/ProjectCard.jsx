import React from 'react';
import { FaHome, FaBuilding, FaTools, FaCalendarAlt } from 'react-icons/fa';

// This sub-component finds the correct contractors from the full list
// and displays their avatars.
const ProjectContractors = ({ contractorIds, allContractors = [] }) => {
    const projectContractors = contractorIds
        .map(id => allContractors.find(c => c._id === id))
        .filter(Boolean); // This removes any nulls if a contractor isn't found

    return (
        <div className="relative flex -space-x-3">
            {projectContractors.slice(0, 4).map(contractor => (
                <img
                    key={contractor._id}
                    src={contractor.dpimageurl}
                    alt={contractor.name}
                    title={contractor.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/CCCCCC/FFFFFF?text=TC'; }}
                />
            ))}
        </div>
    );
};

// The main ProjectCard component. It is now a "presentational" component
// that just displays the data it receives.
const ProjectCard = ({ project, allContractors }) => {

    const formatDateRange = (start, end) => {
        const options = { year: 'numeric', month: 'short' };
        const startDate = new Date(start).toLocaleDateString('en-US', options);
        // If there's no end date, the project is ongoing.
        if (!end) return `${startDate} - Present`;
        const endDate = new Date(end).toLocaleDateString('en-US', options);
        return `${startDate} - ${endDate}`;
    };

    // This function will need to be updated when you fetch "Project Types" data.
    const getIcon = (typeId) => {
        switch (typeId) {
            case '1': return <FaHome className="text-yellow-500" />;    // Residential
            case '2': return <FaBuilding className="text-blue-500" />; // Commercial
            case '3': return <FaTools className="text-gray-500" />;    // Industrial
            default: return <FaBuilding />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
            <div className="relative">
                {/* Use imgurl from the backend project data */}
                <img src={project.imgurl} alt={project.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                    {/* Pass the necessary props to the sub-component */}
                    <ProjectContractors contractorIds={project.contractorIds} allContractors={allContractors} />
                </div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 text-sm font-bold rounded-tr-lg flex items-center gap-2">
                    {getIcon(project.typeId)}
                    {/* This will be replaced with the type name later */}
                    Type: {project.typeId}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                {/* Use title from the backend project data */}
                <h4 className="text-xl font-bold text-gray-800">{project.title}</h4>
                <p className="text-gray-600 mt-2 text-sm flex-grow line-clamp-3">{project.description}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <FaCalendarAlt />
                    {/* Use startdate and endDate from the backend */}
                    <span>{formatDateRange(project.startdate, project.endDate)}</span>
                </div>
                <a
                    href={`/projects/${project._id}`}
                    className="inline-block mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 text-sm text-center"
                >
                    View Project
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
