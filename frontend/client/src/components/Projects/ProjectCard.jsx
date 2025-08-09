import React from 'react';
import { statusDescriptions } from './data';

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const ContractorAvatars = ({ contractors }) => {
    const getInitials = (name) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const colors = ['bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-red-500'];

    return (
        <div className="flex -space-x-3">
            {contractors.slice(0, 4).map((contractor, index) => (
                <div
                    key={contractor.id}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white ${colors[index % colors.length]}`}
                    title={contractor.name} // Simple tooltip on hover
                >
                    {getInitials(contractor.name)}
                </div>
            ))}
        </div>
    );
};



const StatusBadge = ({ status }) => {
    const statusColor = status === 'Archived' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    return (
        <div className="group relative z-10">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                {status}
            </span>
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {statusDescriptions[status]}
            </div>
        </div>
    );
};

const ProjectCard = ({ project, onProjectClick }) => (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group cursor-pointer flex flex-col"
      onClick={() => onProjectClick(project.id)}
    >
      <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-semibold text-indigo-600">{project.category}</p>
            <StatusBadge status={project.status} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <ContractorAvatars contractors={project.contractors} />
          <div className="inline-flex items-center text-indigo-600 font-semibold group-hover:text-indigo-800 transition-colors duration-300">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
);

export default ProjectCard;