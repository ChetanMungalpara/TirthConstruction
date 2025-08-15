// TirthConstruction/frontend/client/src/pages/ContractorsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// --- UPDATED IMPORT ---
import { fetchContractors, fetchProjects } from '../services/apiService';

// Child components
import AnimatedHeader from '../components/Contractors/AnimatedHeader';
import AllFoundersView from '../components/Contractors/AllFoundersView';
import IndividualFounderView from '../components/Contractors/contractor';


const EventModal = ({ event, setSelectedEvent }) => {
    // ... (This component does not fetch data, so no changes are needed here)
    if (!event) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedEvent(null)}
            >
                <motion.div
                    initial={{ y: -50, scale: 0.9 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 50, scale: 0.9 }}
                    className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <img src={event.imagesrc} alt={event.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mt-4">{event.description}</p>
                        <button onClick={() => setSelectedEvent(null)} className="mt-6 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


function ContractorsPage() {
    const [contractors, setContractors] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // --- REFACTORED DATA FETCHING ---
                const [contractorsRes, projectsRes] = await Promise.all([
                    fetchContractors(),
                    fetchProjects()
                ]);
                setContractors(contractorsRes.data);
                setAllProjects(projectsRes.data);
            } catch (error) {
                console.error("Failed to fetch page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const selectedId = id || "0";

    const handleSelectContractor = (contractorId) => {
        if (contractorId === "0") {
            navigate('/contractors');
        } else {
            navigate(`/contractors/${contractorId}`);
        }
    };

    const selectedData = selectedId === "0" ? null : contractors.find(c => c._id === selectedId);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 animate-pulse">Loading Team...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen rounded-[9.6px] bg-gray-100 font-sans py-12 overflow-x-hidden">
                <div className="text-center mb-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Meet The Team</h1>
                    <p className="text-lg text-gray-500">The Foundation of Our Success</p>
                </div>

                <AnimatedHeader
                    contractors={contractors}
                    selectedId={selectedId}
                    setSelectedId={handleSelectContractor}
                />

                <div className="container w-full px-4 md:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {selectedId === "0" ? (
                                <AllFoundersView setSelectedEvent={setSelectedEvent} />
                            ) : (
                                selectedData && 
                                <IndividualFounderView 
                                    contractor={selectedData} 
                                    allProjects={allProjects} 
                                    allContractors={contractors} 
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <EventModal event={selectedEvent} setSelectedEvent={setSelectedEvent} />
        </>
    );
}

export default ContractorsPage;