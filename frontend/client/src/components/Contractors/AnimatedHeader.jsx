import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';

// The component now correctly receives props from its parent (ContractorsPage)
const AnimatedHeader = ({ contractors, selectedId, setSelectedId }) => {
    // We construct the 'items' array by adding the "All" button to the contractors list from props
    const items = [{ id: "0", name: 'All', Icon: FaUsers }, ...contractors];
    const hasSelection = selectedId !== "0";

    return (
        <div className="relative w-full h-48 flex justify-center items-center mb-12 px-4 overflow-x-auto">
            <AnimatePresence>
                <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex items-center gap-4 p-4"
                >
                    {/* This section renders the large, selected contractor icon */}
                    {hasSelection && items.filter(i => i.id === selectedId).map(item => (
                         <motion.div
                            key={item.id}
                            layoutId={`contractor-${item.id}`}
                            onClick={() => setSelectedId(item.id)}
                            className="cursor-pointer group flex flex-col items-center flex-shrink-0"
                        >
                            {/* Use dpimageurl from the backend data */}
                            <img 
                                src={item.dpimageurl} 
                                alt={item.name} 
                                className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-yellow-400"
                            />
                             <p className="mt-2 font-semibold text-gray-800">{item.name.split(' ')[0]}</p>
                         </motion.div>
                    ))}
                    {/* This section renders the list of other, smaller icons */}
                    <div className={`flex items-center gap-4 ${hasSelection ? 'pl-8 border-l-2 border-gray-200' : ''}`}>
                        {items.filter(item => hasSelection ? item.id !== selectedId : true).map(item => (
                            <motion.div
                                key={item.id}
                                layoutId={`contractor-${item.id}`}
                                onClick={() => setSelectedId(item.id)}
                                className="cursor-pointer group flex flex-col items-center flex-shrink-0"
                            >
                                <div className="relative">
                                    {/* Logic for the "All" button */}
                                    {item.id === "0" ? (
                                        <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110 ${selectedId === "0" ? 'ring-4 ring-yellow-400' : 'ring-2 ring-gray-300'}`}>
                                            <FaUsers className={`text-3xl transition-colors ${selectedId === "0" ? 'text-yellow-500' : 'text-gray-500'}`} />
                                        </div>
                                    ) : (
                                        // Logic for the individual contractor images
                                        <img 
                                            src={item.dpimageurl} 
                                            alt={item.name} 
                                            className="w-16 h-16 rounded-full object-cover shadow-md transition-all duration-300 group-hover:scale-110 ring-2 ring-gray-300"
                                        />
                                    )}
                                </div>
                                <p className={`text-center mt-2 font-semibold text-sm transition-colors duration-300 ${selectedId === "0" && item.id === "0" ? 'text-yellow-600' : 'text-gray-500 group-hover:text-gray-800'}`}>
                                    {item.name.split(' ')[0]}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
export default AnimatedHeader;
