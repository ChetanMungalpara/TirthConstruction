import react from 'react';
import { contractors } from './data';
import { FaHome, FaBuilding, FaTools } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
const ProjectCard = ({ project }) => {
    const projectContractors = contractors.filter(c => project.contractorIds.includes(c.id));
    
    const formatDateRange = (start, end) => {
        const options = { year: 'numeric', month: 'short' };
        const startDate = new Intl.DateTimeFormat('en-US', options).format(start);
        const endDate = new Intl.DateTimeFormat('en-US', options).format(end);
        return `${startDate} - ${endDate}`;
    };

    const getIcon = (type) => {
        switch(type) {
            case 'Residential': return <FaHome className="text-yellow-500" />;
            case 'Commercial': return <FaBuilding className="text-blue-500" />;
            case 'Industrial': return <FaTools className="text-gray-500" />;
            default: return <FaBuilding />;
        }
    }
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
         
            <div className="relative">
                <img src={project.imgSrc} alt={project.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 flex space-x-[-10px]">
                    {projectContractors.map(c => (
                        <img key={c.id} src={c.imgSrc} alt={c.name} title={c.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white"/>
                    ))}
                </div>
                 <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 text-sm font-bold rounded-tr-lg flex items-center gap-2">
                    {getIcon(project.type)}
                    {project.type}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-800">{project.name}</h4>
                <p className="text-gray-600 mt-2 text-sm flex-grow">{project.description}</p>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <FaCalendarAlt />
                    <span>{formatDateRange(project.startDate, project.endDate)}</span>
                </div>
                 <a 
                    href={`http://localhost:5173/projects#/projects/${project.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 text-sm text-center"
                >
                    View Project
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;