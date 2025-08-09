
// --- MOCK DATA & CONFIG ---
export const contractorsData = {
    'pravin': { id: 1, name: 'Pravinbhai Mungalpara', designation: 'Founder & Lead Contractor', image: 'https://placehold.co/100x100/EFEFEF/333?text=PM' },
    'vinu': { id: 2, name: 'Vinubhai Mungalpara', designation: 'Site Manager', image: 'https://placehold.co/100x100/EFEFEF/333?text=VM' },
    'naresh': { id: 3, name: 'Nareshbhai Mungalpara', designation: 'Project Coordinator', image: 'https://placehold.co/100x100/EFEFEF/333?text=NM' },
    'raju': { id: 4, name: 'Rajubhai Bhadani', designation: 'Founding Partner', image: 'https://placehold.co/100x100/EFEFEF/333?text=RB' },
    'sanjay': { id: 5, name: 'Sanjaybhai Patel', designation: 'Senior Engineer', image: 'https://placehold.co/100x100/EFEFEF/333?text=SP' },
    'anil': { id: 6, name: 'Anilbhai Desai', designation: 'Electrical Engineer', image: 'https://placehold.co/100x100/EFEFEF/333?text=AD' },
    'sunil': { id: 7, name: 'Sunilbhai Joshi', designation: 'Civil Engineer', image: 'https://placehold.co/100x100/EFEFEF/333?text=SJ' },
};

export const statusDescriptions = {
    'Archived': 'Project fully finished and handed over.',
    'Under Construction': 'Active building phase, structural work in progress.',
    'Planning': 'Design, budgeting, and permitting in progress.',
};

export const allProjects = [
    // --- PROJECT 1: Industrial ---
    {
        id: 'ind-01',
        category: 'Industrial',
        title: 'Ginning & Pressing Mill',
        description: 'A large-scale jean and cotton mill with advanced infrastructure.',
        imageUrl: 'https://images.unsplash.com/photo-1567954970774-58d6ce8c4324?q=80&w=1974&auto=format&fit=crop',
        startDate: '2023-11-01',
        endDate: null,
        status: 'Under Construction',
        contractors: [contractorsData.pravin, contractorsData.naresh, contractorsData.raju],
        details: {
            client: 'Gujarat Cotton Co.',
            location: 'Gondal, Gujarat',
            summary: 'This large-scale industrial project includes the construction of the main processing facility, multiple warehouses, and administrative offices.'
        },
        timeline: [
            {
                title: 'November 2023',
                content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Planning & Mobilization</h4><p className="mb-4 text-sm text-gray-700">The project kicked off with contract finalization, detailed planning, and site mobilization.</p><img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="Planning" className="max-h-48 w-auto rounded-lg shadow-md" /></div>)
            },
            {
                title: 'February 2024',
                content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Foundation & Multi-Image Demo</h4><p className="mb-4 text-sm text-gray-700">Major earthworks were completed, and foundations were poured. The team documented progress extensively.</p><div className="flex gap-2 mt-2 flex-wrap"><img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" alt="Foundation Work" className="max-h-40 w-auto rounded-lg shadow-md" /><img src="https://images.unsplash.com/photo-1580982327299-a3a163725178?q=80&w=1974&auto=format&fit=crop" alt="Heavy Machinery" className="max-h-40 w-auto rounded-lg shadow-md" /></div></div>)
            },
            {
                title: 'June 2024',
                content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Structural Erection</h4><p className="mb-4 text-sm text-gray-700">Erection of the primary steel structure began, giving the site its first real sense of scale.</p><img src="https://images.unsplash.com/photo-1559227655-7f47497ef404?q=80&w=1974&auto=format&fit=crop" alt="Steel Structure" className="max-h-48 w-auto rounded-lg shadow-md" /></div>)
            },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1616401784845-180844d1ba34?q=80&w=2070&auto=format&fit=crop', title: 'Initial Site Layout', description: 'Aerial view of the site during the initial planning phase.', className: "absolute top-10 left-[20%] rotate-[-5deg]" },
            { image: 'https://images.unsplash.com/photo-1580982327299-a3a163725178?q=80&w=1974&auto=format&fit=crop', title: 'Heavy Machinery', description: 'Bringing in the heavy equipment for foundation work.', className: "absolute top-40 left-[45%] rotate-[8deg]" },
            { image: 'https://images.unsplash.com/photo-1556741533-4020f6011019?q=80&w=2070&auto=format&fit=crop', title: 'Steel Frame', description: 'The primary steel frame of the main building takes shape.', className: "absolute top-20 right-[20%] rotate-[-2deg]" },
        ]
    },
    // --- PROJECT 2: Residential ---
    {
        id: 'res-01',
        category: 'Residential',
        title: 'Modern Family Home',
        description: 'A beautiful and sturdy home for the Shah Family.',
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop',
        startDate: '2022-03-15',
        endDate: '2022-12-20',
        status: 'Archived',
        contractors: [contractorsData.pravin, contractorsData.vinu],
        details: {
            client: 'The Shah Family',
            location: 'Amreli, Gujarat',
            summary: 'This project involved a complete design and build for a modern 4-bedroom family home. We focused on open-plan living and natural light.'
        },
        timeline: [
            { title: 'April 2022', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Groundbreaking</h4><p className="mb-4 text-sm text-gray-700">Site preparation and foundation works began, laying the groundwork for the home.</p></div>) },
            { title: 'September 2022', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Shell Completion</h4><p className="mb-4 text-sm text-gray-700">The structure, walls, and roof were completed, fully enclosing the building.</p><img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop" alt="Structure" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'December 2022', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Handover</h4><p className="mb-4 text-sm text-gray-700">Final interior works were completed before handing over the keys to a happy family.</p></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', title: 'Exterior Facade', description: 'The finished exterior showcases modern design elements.', className: "absolute top-10 left-[15%] rotate-[3deg]" },
            { image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop', title: 'Living Area', description: 'An open-plan living area designed for comfort.', className: "absolute top-48 left-[40%] rotate-[-5deg]" },
            { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', title: 'Poolside View', description: 'The backyard features a beautiful poolside area.', className: "absolute top-24 right-[18%] rotate-[6deg]" },
        ]
    },
    // --- PROJECT 3: Commercial ---
    {
        id: 'com-01',
        category: 'Commercial',
        title: 'Nexus Business Hub',
        description: 'A state-of-the-art office complex in a prime business district.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        startDate: '2023-01-10',
        endDate: '2024-05-30',
        status: 'Completed',
        contractors: [contractorsData.sanjay, contractorsData.anil, contractorsData.raju],
        details: {
            client: 'Innovate Corp.',
            location: 'Mumbai, Maharashtra',
            summary: 'A 15-story office building featuring smart technology, green spaces, and a modern architectural design to foster collaboration.'
        },
        timeline: [
            { title: 'Q1 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Site Excavation</h4><p className="mb-4 text-sm text-gray-700">Excavation for the triple-level underground parking was a major undertaking.</p><img src="https://images.unsplash.com/photo-1504917595217-d4dc5b707035?q=80&w=2070&auto=format&fit=crop" alt="Excavation" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q4 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Facade Installation</h4><p className="mb-4 text-sm text-gray-700">The glass curtain wall was installed, defining the building’s sleek exterior.</p><img src="https://images.unsplash.com/photo-1600272803323-141e54341934?q=80&w=1935&auto=format&fit=crop" alt="Facade" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q2 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Interior Finishing</h4><p className="mb-4 text-sm text-gray-700">Lobby marble, office fixtures, and rooftop garden were completed.</p><div className="flex gap-2 mt-2 flex-wrap"><img src="https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=1974&auto=format&fit=crop" alt="Lobby" className="max-h-40 w-auto rounded-lg shadow-md" /><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2134&auto=format&fit=crop" alt="Office Space" className="max-h-40 w-auto rounded-lg shadow-md" /></div></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1542370285-b8eb8317691c?q=80&w=1974&auto=format&fit=crop', title: 'Architectural Model', description: 'The initial 3D model of the project.', className: "absolute top-12 left-[18%] rotate-[-4deg]" },
            { image: 'https://images.unsplash.com/photo-1599493356649-50b43a7a7933?q=80&w=1974&auto=format&fit=crop', title: 'Rooftop Garden', description: 'A green oasis in the middle of the city.', className: "absolute top-44 left-[50%] rotate-[7deg]" },
            { image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop', title: 'Main Entrance', description: 'The grand entrance of Nexus Business Hub.', className: "absolute top-24 right-[15%] rotate-[2deg]" },
        ]
    },
    // --- PROJECT 4: Infrastructure ---
    {
        id: 'inf-01',
        category: 'Infrastructure',
        title: 'Coastal Road Project',
        description: 'A major highway connecting coastal towns to improve transit.',
        imageUrl: 'https://images.unsplash.com/photo-1545274222-b2d355024e46?q=80&w=2070&auto=format&fit=crop',
        startDate: '2022-08-20',
        endDate: null,
        status: 'In Progress',
        contractors: [contractorsData.naresh, contractorsData.vinu],
        details: {
            client: 'State Government',
            location: 'Coastal Karnataka',
            summary: 'A 50km stretch of 4-lane highway with bridges and overpasses, designed to withstand monsoon conditions and reduce travel time by 40%.'
        },
        timeline: [
            { title: 'Q4 2022', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Land Acquisition & Clearing</h4><p className="mb-4 text-sm text-gray-700">The initial phase involved securing the land corridor and clearing vegetation.</p></div>) },
            { title: 'Q2 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Bridge Construction</h4><p className="mb-4 text-sm text-gray-700">Construction of a key bridge over the Sharavathi river began.</p><img src="https://images.unsplash.com/photo-1524122369336-63b72351d541?q=80&w=2070&auto=format&fit=crop" alt="Bridge Construction" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q1 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Paving Operations</h4><p className="mb-4 text-sm text-gray-700">Asphalt laying commenced on the first 10km section.</p><img src="https://images.unsplash.com/photo-1588613783548-39534648715c?q=80&w=2070&auto=format&fit=crop" alt="Paving" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1590824357793-9549661413d7?q=80&w=2070&auto=format&fit=crop', title: 'Highway Stretch', description: 'An aerial view of a completed section.', className: "absolute top-10 left-[25%] rotate-[5deg]" },
            { image: 'https://images.unsplash.com/photo-1559493246-534383a15082?q=80&w=1974&auto=format&fit=crop', title: 'Coastal View', description: 'The scenic route created by the new road.', className: "absolute top-48 left-[45%] rotate-[-3deg]" },
            { image: 'https://images.unsplash.com/photo-1612088318721-91a03a799985?q=80&w=2070&auto=format&fit=crop', title: 'Tunnel Entrance', description: 'One of the tunnels built to bypass sensitive areas.', className: "absolute top-20 right-[22%] rotate-[4deg]" },
        ]
    },
    // --- And 11 more projects... ---
    {
        id: 'ren-01',
        category: 'Renovation',
        title: 'Heritage Hotel Restoration',
        description: 'Breathing new life into a 100-year-old heritage property.',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbb563?q=80&w=2070&auto=format&fit=crop',
        startDate: '2023-05-01',
        endDate: '2024-07-15',
        status: 'Completed',
        contractors: [contractorsData.raju, contractorsData.sunil],
        details: {
            client: 'The Palace Group',
            location: 'Udaipur, Rajasthan',
            summary: 'A meticulous restoration project focusing on preserving historical architecture while upgrading amenities to modern luxury standards.'
        },
        timeline: [
            { title: 'Q2 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Structural Assessment</h4><p className="mb-4 text-sm text-gray-700">Detailed assessment to identify areas needing structural reinforcement.</p></div>) },
            { title: 'Q4 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Artisan Restoration</h4><p className="mb-4 text-sm text-gray-700">Local artisans were brought in to restore intricate frescoes and stonework.</p><div className="flex gap-2 mt-2 flex-wrap"><img src="https://images.unsplash.com/photo-1618821475559-2476712a52a4?q=80&w=1964&auto=format&fit=crop" alt="Artisan Work" className="max-h-40 w-auto rounded-lg shadow-md" /><img src="https://images.unsplash.com/photo-1598965775222-38491325852c?q=80&w=1964&auto=format&fit=crop" alt="Details" className="max-h-40 w-auto rounded-lg shadow-md" /></div></div>) },
            { title: 'Q2 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Grand Re-opening</h4><p className="mb-4 text-sm text-gray-700">The hotel was unveiled with its restored glory and modern comforts.</p><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" alt="Re-opening" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop', title: 'Courtyard', description: 'The central courtyard after restoration.', className: "absolute top-10 left-[15%] rotate-[-3deg]" },
            { image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1974&auto=format&fit=crop', title: 'Suite Interior', description: 'A blend of classic design and modern luxury.', className: "absolute top-48 left-[40%] rotate-[5deg]" },
            { image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop', title: 'Pool Area', description: 'The newly added infinity pool.', className: "absolute top-24 right-[18%] rotate-[-6deg]" },
        ]
    },
    {
        id: 'res-02',
        category: 'Residential',
        title: 'Greenwood Apartments',
        description: 'An eco-friendly apartment complex with vertical gardens.',
        imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
        startDate: '2024-02-01',
        endDate: null,
        status: 'Under Construction',
        contractors: [contractorsData.pravin, contractorsData.sunil, contractorsData.sanjay],
        details: {
            client: 'EcoBuild Developers',
            location: 'Pune, Maharashtra',
            summary: 'A residential project focused on sustainability, featuring rainwater harvesting, solar power, and extensive green cover.'
        },
        timeline: [
            { title: 'March 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Foundation and Basement</h4><p className="mb-4 text-sm text-gray-700">Work began on the multi-level basement and foundation slabs.</p><img src="https://images.unsplash.com/photo-1529940340007-8ef64abc36ae?q=80&w=2070&auto=format&fit=crop" alt="Foundation" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'July 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Vertical Structure</h4><p className="mb-4 text-sm text-gray-700">The first five floors of the main structure were completed.</p><img src="https://images.unsplash.com/photo-1517692923334-3e9b2c833527?q=80&w=1964&auto=format&fit=crop" alt="Structure" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop', title: 'Living Room Concept', description: 'Artist rendering of the interior space.', className: "absolute top-10 left-[20%] rotate-[4deg]" },
            { image: 'https://images.unsplash.com/photo-1624562522026-63e8a4ff3032?q=80&w=1974&auto=format&fit=crop', title: 'Green Balconies', description: 'The signature vertical gardens in progress.', className: "absolute top-48 left-[45%] rotate-[-2deg]" },
            { image: 'https://images.unsplash.com/photo-1558855658-e1ea1145073d?q=80&w=2070&auto=format&fit=crop', title: 'Community Area', description: 'The planned rooftop community space.', className: "absolute top-20 right-[25%] rotate-[6deg]" },
        ]
    },
    // Adding more projects to reach 15
    {
        id: 'ind-02',
        category: 'Industrial',
        title: 'Logistics & Warehousing Park',
        description: 'A massive logistics park with automated warehousing solutions.',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-069241123c20?q=80&w=2070&auto=format&fit=crop',
        startDate: '2023-09-15',
        endDate: null,
        status: 'In Progress',
        contractors: [contractorsData.naresh, contractorsData.vinu],
        details: {
            client: 'SwiftLogistics Inc.',
            location: 'Chennai, Tamil Nadu',
            summary: 'Developing a 2 million sq. ft. logistics park near the port to streamline supply chains with state-of-the-art automation.'
        },
        timeline: [
            { title: 'Q4 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Site Leveling</h4><p className="mb-4 text-sm text-gray-700">Extensive earthworks to level the large project site.</p><img src="https://images.unsplash.com/photo-1617954350136-68033213a42e?q=80&w=2070&auto=format&fit=crop" alt="Site Leveling" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q2 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Warehouse Superstructures</h4><p className="mb-4 text-sm text-gray-700">Erection of pre-engineered steel buildings for the warehouses.</p><img src="https://images.unsplash.com/photo-1621993204944-537e3a478a77?q=80&w=2070&auto=format&fit=crop" alt="Warehouse Structure" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1578575437130-5278ce68242d?q=80&w=2071&auto=format&fit=crop', title: 'Warehouse Interior', description: 'The vast interior of a completed warehouse unit.', className: "absolute top-10 left-[15%] rotate-[-5deg]" },
            { image: 'https://images.unsplash.com/photo-1605799148843-094a1b945778?q=80&w=2070&auto=format&fit=crop', title: 'Loading Docks', description: 'Multiple loading docks ready for operation.', className: "absolute top-48 left-[40%] rotate-[3deg]" },
            { image: 'https://images.unsplash.com/photo-1565526234584-50b4578f134f?q=80&w=2070&auto=format&fit=crop', title: 'Automated Sorter', description: 'Installation of the automated sorting system.', className: "absolute top-24 right-[18%] rotate-[-2deg]" },
        ]
    },
    {
        id: 'com-02',
        category: 'Commercial',
        title: 'Orion Multiplex & Mall',
        description: 'A modern shopping mall with a 10-screen multiplex.',
        imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
        startDate: '2022-11-01',
        endDate: '2024-08-01',
        status: 'Completed',
        contractors: [contractorsData.pravin, contractorsData.sanjay, contractorsData.raju],
        details: {
            client: 'Entertainment World Cinemas',
            location: 'Hyderabad, Telangana',
            summary: 'A premier entertainment and retail destination with over 100 retail stores, a large food court, and a state-of-the-art cinema.'
        },
        timeline: [
            { title: 'Q1 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Structural Frame</h4><p className="mb-4 text-sm text-gray-700">Completion of the massive steel and concrete frame for the mall.</p><img src="https://images.unsplash.com/photo-1598092147128-19a1508b5e93?q=80&w=2070&auto=format&fit=crop" alt="Mall Structure" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q3 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Glass Atrium Installation</h4><p className="mb-4 text-sm text-gray-700">The central glass atrium, a key architectural feature, was installed.</p><img src="https://images.unsplash.com/photo-1599056299404-a7b3a73a83e6?q=80&w=1974&auto=format&fit=crop" alt="Atrium" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1556740772-1a28a1a39f79?q=80&w=2070&auto=format&fit=crop', title: 'Retail Stores', description: 'A view of the retail corridor.', className: "absolute top-12 left-[20%] rotate-[6deg]" },
            { image: 'https://images.unsplash.com/photo-1579541626635-54e642a8566b?q=80&w=2070&auto=format&fit=crop', title: 'Cinema Interior', description: 'Inside one of the luxury cinema screens.', className: "absolute top-44 left-[48%] rotate-[-4deg]" },
            { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop', title: 'Food Court', description: 'The bustling food court area.', className: "absolute top-20 right-[22%] rotate-[3deg]" },
        ]
    },
    {
        id: 'res-03',
        category: 'Residential',
        title: 'The Skyview Towers',
        description: 'Luxury residential towers offering panoramic city views.',
        imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop',
        startDate: '2023-03-20',
        endDate: null,
        status: 'Under Construction',
        contractors: [contractorsData.pravin, contractorsData.naresh, contractorsData.anil],
        details: {
            client: 'Prestige Homes Ltd.',
            location: 'Bengaluru, Karnataka',
            summary: 'Two 40-story residential towers with premium apartments, a sky lounge, and world-class amenities.'
        },
        timeline: [
            { title: 'Q2 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Core Construction</h4><p className="mb-4 text-sm text-gray-700">The central core of both towers reached the 10th floor.',</p><img src="https://images.unsplash.com/photo-1605276374104-5de67d18334a?q=80&w=1974&auto=format&fit=crop" alt="Core Construction" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q1 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Cladding Work</h4><p className="mb-4 text-sm text-gray-700">Exterior cladding and window installation began on the lower floors.</p><img src="https://images.unsplash.com/photo-1560440021-33f9b867899d?q=80&w=1974&auto=format&fit=crop" alt="Cladding" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop', title: 'Penthouse View', description: 'An artist\'s impression of the view from the penthouse.', className: "absolute top-10 left-[15%] rotate-[-3deg]" },
            { image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop', title: 'Interior Design', description: 'The modern and minimalist interior design concept.', className: "absolute top-48 left-[40%] rotate-[5deg]" },
            { image: 'https://images.unsplash.com/photo-1617103996426-c0c86b373f7c?q=80&w=2070&auto=format&fit=crop', title: 'Rooftop Pool', description: 'The planned infinity pool on the rooftop.', className: "absolute top-24 right-[18%] rotate-[-6deg]" },
        ]
    },
    {
        id: 'inf-02',
        category: 'Infrastructure',
        title: 'City Metro Expansion',
        description: 'Expanding the city\'s metro network with a new 25km line.',
        imageUrl: 'https://images.unsplash.com/photo-1559332434-2593d3d225d3?q=80&w=2070&auto=format&fit=crop',
        startDate: '2022-06-01',
        endDate: null,
        status: 'In Progress',
        contractors: [contractorsData.naresh, contractorsData.vinu],
        details: {
            client: 'City Metro Rail Corporation',
            location: 'Delhi, NCR',
            summary: 'The Phase IV expansion includes underground and elevated sections, connecting the city\'s eastern and western corridors.'
        },
        timeline: [
            { title: 'Q3 2022', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Tunnel Boring</h4><p className="mb-4 text-sm text-gray-700">Tunnel Boring Machines (TBMs) were deployed for the underground sections.</p><img src="https://images.unsplash.com/photo-1623087515159-281b53755318?q=80&w=2070&auto=format&fit=crop" alt="TBM" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q4 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Viaduct Erection</h4><p className="mb-4 text-sm text-gray-700">Launching girders to erect segments for the elevated viaducts.</p><img src="https://images.unsplash.com/photo-1609329929113-bc5a2a2c0f61?q=80&w=2070&auto=format&fit=crop" alt="Viaduct" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1581134885547-9f456834b6f7?q=80&w=2070&auto=format&fit=crop', title: 'Underground Station', description: 'Construction of a new underground metro station.', className: "absolute top-10 left-[25%] rotate-[5deg]" },
            { image: 'https://images.unsplash.com/photo-1506501139174-099020df2d7d?q=80&w=2070&auto=format&fit=crop', title: 'Elevated Track', description: 'A view of the newly laid tracks on an elevated section.', className: "absolute top-48 left-[45%] rotate-[-3deg]" },
            { image: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?q=80&w=2070&auto=format&fit=crop', title: 'Modern Train', description: 'The new rolling stock for the expanded line.', className: "absolute top-20 right-[22%] rotate-[4deg]" },
        ]
    },
    {
        id: 'ren-02',
        category: 'Renovation',
        title: 'Public Library Modernization',
        description: 'Upgrading a historic library with modern tech and spaces.',
        imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
        startDate: '2024-01-10',
        endDate: null,
        status: 'In Progress',
        contractors: [contractorsData.raju, contractorsData.sanjay],
        details: {
            client: 'City Municipal Corporation',
            location: 'Kolkata, West Bengal',
            summary: 'A project to preserve the architectural integrity of the central library while creating collaborative digital media labs and modern reading areas.'
        },
        timeline: [
            { title: 'Q1 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Interior Demolition</h4><p className="mb-4 text-sm text-gray-700">Careful demolition of non-structural interior walls to create open spaces.</p></div>) },
            { title: 'Q2 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Electrical & Data Cabling</h4><p className="mb-4 text-sm text-gray-700">Complete overhaul of the electrical systems and installation of high-speed data infrastructure.</p><img src="https://images.unsplash.com/photo-1580577662520-a8846b38c230?q=80&w=2070&auto=format&fit=crop" alt="Cabling" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop', title: 'Main Reading Hall', description: 'The restored main reading hall.', className: "absolute top-10 left-[15%] rotate-[-3deg]" },
            { image: 'https://images.unsplash.com/photo-1558003429-6b7493710834?q=80&w=2070&auto=format&fit=crop', title: 'Digital Media Lab', description: 'The new state-of-the-art digital media lab.', className: "absolute top-48 left-[40%] rotate-[5deg]" },
            { image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2106&auto=format&fit=crop', title: 'Children\'s Section', description: 'The vibrant and engaging new children\'s section.', className: "absolute top-24 right-[18%] rotate-[-6deg]" },
        ]
    },
    {
        id: 'ind-03',
        category: 'Industrial',
        title: 'Pharmaceutical R&D Center',
        description: 'A cutting-edge research facility for a major pharma company.',
        imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a1d6?q=80&w=2070&auto=format&fit=crop',
        startDate: '2023-07-01',
        endDate: null,
        status: 'In Progress',
        contractors: [contractorsData.anil, contractorsData.sanjay],
        details: {
            client: 'Aura Life Sciences',
            location: 'Ahmedabad, Gujarat',
            summary: 'Construction of a high-tech R&D facility with specialized clean rooms, advanced laboratories, and collaborative workspaces.'
        },
        timeline: [
            { title: 'Q3 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Specialized Foundations</h4><p className="mb-4 text-sm text-gray-700">Pouring foundations designed to isolate sensitive lab equipment from vibrations.</p></div>) },
            { title: 'Q2 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Clean Room Installation</h4><p className="mb-4 text-sm text-gray-700">Installation of modular clean room panels and specialized HVAC systems.</p><img src="https://images.unsplash.com/photo-1630947230474-3742ac6a1334?q=80&w=2070&auto=format&fit=crop" alt="Clean Room" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1581094483342-8a8b5a7e0a4f?q=80&w=2070&auto=format&fit=crop', title: 'Research Lab', description: 'A typical research lab setup.', className: "absolute top-10 left-[20%] rotate-[4deg]" },
            { image: 'https://images.unsplash.com/photo-1532187643623-dbf2f5a734c8?q=80&w=2070&auto=format&fit=crop', title: 'Microscopy Suite', description: 'The advanced electron microscopy suite.', className: "absolute top-48 left-[45%] rotate-[-2deg]" },
            { image: 'https://images.unsplash.com/photo-1581092446333-5b5179b50b55?q=80&w=2070&auto=format&fit=crop', title: 'Scientist at Work', description: 'A researcher in the new facility.', className: "absolute top-20 right-[25%] rotate-[6deg]" },
        ]
    },
    {
        id: 'res-04',
        category: 'Residential',
        title: 'Hillside Villa Estate',
        description: 'Exclusive villas with stunning valley views.',
        imageUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021a88a4?q=80&w=2070&auto=format&fit=crop',
        startDate: '2023-10-01',
        endDate: null,
        status: 'Under Construction',
        contractors: [contractorsData.pravin, contractorsData.sunil],
        details: {
            client: 'The Highlands Group',
            location: 'Lonavala, Maharashtra',
            summary: 'A gated community of 20 luxury villas, each with a private pool and garden, designed to blend with the natural landscape.'
        },
        timeline: [
            { title: 'Q4 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Terracing and Landscaping</h4><p className="mb-4 text-sm text-gray-700">Major earthworks to create terraces for the villas and initial landscaping work.</p><img src="https://images.unsplash.com/photo-1540483862306-388b39411a3a?q=80&w=2070&auto=format&fit=crop" alt="Landscaping" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
            { title: 'Q2 2024', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Villa Construction</h4><p className="mb-4 text-sm text-gray-700">Construction of the first set of five villas is underway.</p><img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop" alt="Villa" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1600585152225-358ea60c2189?q=80&w=2070&auto=format&fit=crop', title: 'Villa Exterior', description: 'A completed villa exterior.', className: "absolute top-12 left-[18%] rotate-[-4deg]" },
            { image: 'https://images.unsplash.com/photo-1618221195710-dd6b41fa2ebb?q=80&w=2070&auto=format&fit=crop', title: 'Modern Interior', description: 'The luxurious and modern interior design.', className: "absolute top-44 left-[50%] rotate-[7deg]" },
            { image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop', title: 'Infinity Pool', description: 'The private infinity pool with a valley view.', className: "absolute top-24 right-[15%] rotate-[2deg]" },
        ]
    },
    {
        id: 'com-03',
        category: 'Commercial',
        title: 'Riverside Convention Center',
        description: 'A large-scale convention and exhibition center.',
        imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2070&auto=format&fit=crop',
        startDate: '2022-04-10',
        endDate: '2024-06-01',
        status: 'Completed',
        contractors: [contractorsData.naresh, contractorsData.anil],
        details: {
            client: 'Global Exhibitions Ltd.',
            location: 'Goa',
            summary: 'A 500,000 sq. ft. facility with multiple exhibition halls, auditoriums, and meeting rooms, located on the banks of the Mandovi River.'
        },
        timeline: [
            { title: 'Q3 2022', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Piling Work</h4><p className="mb-4 text-sm text-gray-700">Extensive piling work was required due to the riverside location.</p></div>) },
            { title: 'Q2 2023', content: (<div><h4 className="font-bold text-lg mb-2 text-gray-800">Roof Truss Installation</h4><p className="mb-4 text-sm text-gray-700">Lifting and installation of the massive steel roof trusses for the main exhibition hall.</p><img src="https://images.unsplash.com/photo-1505819244306-ef53954f9212?q=80&w=2070&auto=format&fit=crop" alt="Roof Truss" className="max-h-48 w-auto rounded-lg shadow-md" /></div>) },
        ],
        gallery: [
            { image: 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=2120&auto=format&fit=crop', title: 'Exhibition Hall', description: 'The vast, empty main exhibition hall.', className: "absolute top-10 left-[25%] rotate-[5deg]" },
            { image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=2070&auto=format&fit=crop', title: 'Auditorium', description: 'The main auditorium with seating for 2000 people.', className: "absolute top-48 left-[45%] rotate-[-3deg]" },
            { image: 'https://images.unsplash.com/photo-1551818255-e6e10975846a?q=80&w=2070&auto=format&fit=crop', title: 'Riverfront View', description: 'The stunning view from the center\'s promenade.', className: "absolute top-20 right-[22%] rotate-[4deg]" },
        ]
    }
];