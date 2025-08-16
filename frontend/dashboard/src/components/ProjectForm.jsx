
import React, { useState } from 'react';

const ProjectForm = ({ onSubmit, initialData = {}, onCancel, availableData }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        imgurl: initialData.imgurl || '',
        typeId: initialData.typeId || '',
        statusId: initialData.statusId || '',
        contractorIds: initialData.contractorIds || [],
        startdate: initialData.startdate ? initialData.startdate.split('T')[0] : '',
        details: {
            client: initialData.details?.client || '',
            location: initialData.details?.location || '',
        }
    });

    const { types, statuses, contractors } = availableData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'client' || name === 'location') {
            setFormData(prev => ({ ...prev, details: { ...prev.details, [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleContractorSelect = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, contractorIds: selectedIds }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Project Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Type of Work</label>
                    <select name="typeId" value={formData.typeId} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md">
                        <option value="">Select a Type</option>
                        {types.map(type => <option key={type._id} value={type._id}>{type.title}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select name="statusId" value={formData.statusId} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md">
                        <option value="">Select a Status</option>
                        {statuses.map(status => <option key={status._id} value={status._id}>{status.title}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" className="mt-1 w-full p-2 border rounded-md"></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium">Assign Contractors (Ctrl/Cmd + click to select multiple)</label>
                <select
                    name="contractorIds"
                    multiple
                    value={formData.contractorIds}
                    onChange={handleContractorSelect}
                    className="mt-1 w-full p-2 border rounded-md h-32"
                >
                    {contractors.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium">Client</label>
                    <input type="text" name="client" value={formData.details.client} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
                </div>
                 <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input type="text" name="location" value={formData.details.location} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Start Date</label>
                    <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Main Image URL</label>
                    <input type="text" name="imgurl" value={formData.imgurl} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md" />
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Save Project</button>
            </div>
        </form>
    );
};

export default ProjectForm;