
// --- MOCK DATA ---
export const contractors = [
  {
    id: 1,
    name: "Pravinbhai Mungalpara",
    role: "Founder & Visionary",
    imgSrc: "https://placehold.co/500x650/EAB308/FFFFFF?text=P",
    bio: "The cornerstone of Tirth Construction, Pravinbhai's unwavering dedication to craftsmanship and client satisfaction has been the guiding principle of the company since 1995. He leads with experience and a deep understanding of the construction lifecycle.",
    quote: "We don't just build structures; we build trust that lasts for generations.",
    experience: new Date().getFullYear() - 1995,
    projectsCount: 75,
    contact: { phone: "+91 98765 43210", email: "pravin.m@tirth.dev" },
    keySkills: ["Strategic Planning", "Client Relations", "Quality Assurance", "Leadership"]
  },
  {
    id: 2,
    name: "Vinubhai Mungalpara",
    role: "Co-Founder & Head of Operations",
    imgSrc: "https://placehold.co/500x650/3B82F6/FFFFFF?text=V",
    bio: "Vinubhai is the operational engine of the company. He excels at managing logistics, resources, and on-site teams to ensure every project runs smoothly, on time, and within budget.",
    quote: "Efficiency and precision on the ground are what turn a blueprint into a reality.",
    experience: 25,
    projectsCount: 68,
    contact: { phone: "+91 98765 43211", email: "vinu.m@tirth.dev" },
    keySkills: ["Logistics Management", "Budgeting & Cost Control", "Team Coordination", "Problem Solving"]
  },
  {
    id: 3,
    name: "Nareshbhai Mungalpara",
    role: "Co-Founder & Project Manager",
    imgSrc: "https://placehold.co/500x650/10B981/FFFFFF?text=N",
    bio: "As the lead Project Manager, Nareshbhai oversees projects from inception to completion, ensuring the client's vision is perfectly executed with transparent communication.",
    quote: "A successful project is one where the client's expectations are not just met, but exceeded.",
    experience: 22,
    projectsCount: 62,
    contact: { phone: "+91 98765 43212", email: "naresh.m@tirth.dev" },
    keySkills: ["Project Management", "Stakeholder Communication", "Risk Assessment", "Timeline Adherence"]
  },
  {
    id: 4,
    name: "Rajubhai Bhadani",
    role: "Co-Founder & Technical Expert",
    imgSrc: "https://placehold.co/500x650/EF4444/FFFFFF?text=R",
    bio: "Rajubhai brings deep technical and engineering expertise to the team. He is responsible for implementing innovative construction techniques and ensuring the structural integrity of every project.",
    quote: "Innovation in engineering is key to building stronger, safer, and more sustainable structures.",
    experience: 20,
    projectsCount: 55,
    contact: { phone: "+91 98765 43213", email: "rajubhai.b@tirth.dev" },
    keySkills: ["Structural Engineering", "Material Science", "CAD & BIM Software", "Technical Innovation"]
  }
];

export const projects = [
    { id: 1, name: "Skyline Residences", type: "Residential", imgSrc: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Skyline", description: "A luxury high-rise apartment complex with state-of-the-art amenities.", contractorIds: [1, 3] },
    { id: 2, name: "Innovatech Park", type: "Commercial", imgSrc: "https://placehold.co/600x400/10B981/FFFFFF?text=Innovatech", description: "A sprawling business park designed for technology companies.", contractorIds: [2, 4] },
    { id: 3, name: "Greenwood Estates", type: "Residential", imgSrc: "https://placehold.co/600x400/EAB308/FFFFFF?text=Greenwood", description: "An eco-friendly gated community featuring sustainable materials.", contractorIds: [1, 4] },
    { id: 4, name: "Oceanic Trade Center", type: "Commercial", imgSrc: "https://placehold.co/600x400/EF4444/FFFFFF?text=Oceanic", description: "A modern commercial hub with office spaces and retail outlets.", contractorIds: [2, 3, 4] },
    { id: 5, name: "Serenity Villas", type: "Residential", imgSrc: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Serenity", description: "Exclusive villas with private pools and landscaped gardens.", contractorIds: [1, 2, 3] },
    { id: 6, name: "Apex Industrial Hub", type: "Industrial", imgSrc: "https://placehold.co/600x400/78716C/FFFFFF?text=Apex", description: "Large-scale industrial sheds and warehousing solutions.", contractorIds: [2, 4] },
];

export const events = [
    { id: 1, title: "25th Anniversary Gala", imgSrc: "https://placehold.co/500x300/D946EF/FFFFFF?text=Gala", description: "Celebrating a quarter-century of building excellence with our clients, partners, and team. It was a night of reflection, gratitude, and looking forward to the future." },
    { id: 2, title: "Annual Safety Awards", imgSrc: "https://placehold.co/500x300/F97316/FFFFFF?text=Awards", description: "Recognizing our teams' commitment to the highest standards of on-site safety. Congratulations to all the winners for their diligence and hard work." },
    { id: 3, title: "Community Foundation Laying", imgSrc: "https://placehold.co/500x300/06B6D4/FFFFFF?text=Community", description: "Breaking ground on the new community center, a pro-bono project dedicated to giving back to the community that has supported us for years." },
];