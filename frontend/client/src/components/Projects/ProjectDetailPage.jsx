import React from 'react';
import { Timeline } from "../ui/timeline";
import { DraggableCardContainer, DraggableCardBody } from "../ui/draggable-card";

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// This is now a simple "presentational" component. It just displays the data it's given.
const ProjectDetailPage = ({ project, onBackClick }) => {
    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : 'Ongoing';
    
    // A fallback in case the project data is not yet available
    if (!project) {
        return <div className="text-center p-12">Project not found.</div>;
    }

    return (
        <div className="pt-24 pb-16 container mx-auto px-4 animate-fade-in">
            <button onClick={onBackClick} className="inline-flex items-center mb-8 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 font-semibold">
                <ArrowLeftIcon /> Back to All Projects
            </button>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Use imgurl from backend */}
                <img src={project.imgurl} alt={project.title} className="w-full h-96 object-cover" />
                <div className="p-8 md:p-12">
                    {/* Use typeId (you'll map this to a name later) */}
                    <p className="text-base font-semibold text-indigo-600 mb-2">{project.typeId}</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{project.title}</h1>
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-b border-gray-200 py-6">
                        <div><p className="text-sm text-gray-500">Client</p><p className="text-lg font-semibold text-gray-800">{project.details.client}</p></div>
                        <div><p className="text-sm text-gray-500">Location</p><p className="text-lg font-semibold text-gray-800">{project.details.location}</p></div>
                        <div><p className="text-sm text-gray-500">Start Date</p><p className="text-lg font-semibold text-gray-800">{formatDate(project.startdate)}</p></div>
                        <div><p className="text-sm text-gray-500">End Date</p><p className="text-lg font-semibold text-gray-800">{formatDate(project.endDate)}</p></div>
                    </div>
                    {/* This section for contractors will need to be updated once you fetch contractor data */}
                    <div className="mt-8"><h2 className="text-2xl font-bold text-gray-800 mb-4">Contractors</h2><div className="flex flex-wrap gap-4">{project.contractorIds.map(id => (<div key={id} className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg"><span className="font-semibold text-gray-700">Contractor ID: {id}</span></div>))}</div></div>
                    <div className="mt-8"><h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2><p className="text-gray-700 leading-relaxed">{project.details.about}</p></div>
                </div>
            </div>
            <div className="mt-12"><h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Project Timeline</h2><Timeline data={project.progressTimeline} /></div>
            <div className="mt-12"><h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Project Gallery</h2>
                <DraggableCardContainer
                    className="relative flex h-screen min-h-[60vh] w-full items-center justify-center overflow-clip rounded-lg shadow-xl p-4 bg-gray-800 bg-[radial-gradient(circle,gray_1px,transparent_1px)] bg-[size:24px_24px]"
                >
                    {project.gallery.map((item, index) => (
                        <DraggableCardBody key={index} className={item.className + " "}>
                            <img src={item.imgurl} alt={`Gallery ${index}`} className="pointer-events-none relative z-10 h-full w-full object-cover rounded-md shadow-lg" />
                            <div className="relative top-4 left-0 right-0 text-black bg-opacity-50 p-4 rounded-b-md">
                                <h3 className="text-lg font-semibold ">{item.title}</h3>
                                <p className="text-sm ">{item.description}</p>
                            </div>
                        </DraggableCardBody>
                    ))}
                </DraggableCardContainer>
            </div>
        </div>
    );
};

export default ProjectDetailPage;
