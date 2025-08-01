import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data ---
// Storing contractor data in a constant makes it easy to update.
const contractors = [
  { name: 'Pravinbhai', phone: '+91 9483748943' },
  { name: 'Vinubhai', phone: '+91 9616620866' },
  { name: 'Nareshbhai', phone: '+91 8861681151' },
  { name: 'Rajubhai', phone: '+91 9688818166'}
];


// --- SVG Icons ---
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  
  // Ref for the map container
  const mapContainerRef = useRef(null);
  // Ref to store the map instance
  const mapInstanceRef = useRef(null);

  // --- Effect to load Leaflet scripts ---
  useEffect(() => {
    // This effect should only run once.
    let script, cssLink;
    if (!window.L) {
        // Load CSS
        cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        cssLink.crossOrigin = '';
        document.head.appendChild(cssLink);

        // Load JavaScript
        script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.async = true;
        
        script.onload = () => {
            setLeafletLoaded(true);
        };
        document.body.appendChild(script);
    } else {
        setLeafletLoaded(true);
    }
    
    // Cleanup function to remove the added elements
    return () => {
        if (cssLink && document.head.contains(cssLink)) {
            document.head.removeChild(cssLink);
        }
        if (script && document.body.contains(script)) {
            document.body.removeChild(script);
        }
    };
  }, []); // Empty dependency array ensures this runs only once.

  // --- Leaflet Map Initialization ---
  useEffect(() => {
    // This effect depends on leafletLoaded and the map container ref.
    if (!leafletLoaded || !mapContainerRef.current) {
        return;
    }

    // Use ResizeObserver to detect when the container is ready.
    const resizeObserver = new ResizeObserver(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            const officeLocation = [21.6024, 71.2202]; // Approx. coordinates for Amreli, Gujarat
            
            // Initialize the map
            const map = window.L.map(mapContainerRef.current).setView(officeLocation, 14);
            mapInstanceRef.current = map;

            // Add the tile layer
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Custom Marker
            const customMarkerIcon = window.L.divIcon({
                html: `<div class="relative flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full shadow-lg animate-pulse">
                         <div class="w-3 h-3 bg-white rounded-full"></div>
                         <div class="absolute bottom-0 w-2 h-4 bg-blue-600" style="clip-path: polygon(50% 100%, 0 0, 100% 0);"></div>
                       </div>`,
                className: '',
                iconSize: [32, 42],
                iconAnchor: [16, 42],
                popupAnchor: [0, -42]
            });

            // Add marker to the map
            window.L.marker(officeLocation, { icon: customMarkerIcon }).addTo(map)
                .bindPopup("<b>Tirth Construction Head Office</b><br>Amreli, Gujarat, 365620")
                .openPopup();
        }
        // If map instance exists, invalidate its size to handle resizes.
        if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
        }
    });

    // Start observing the map container.
    resizeObserver.observe(mapContainerRef.current);

    // Cleanup function
    return () => {
        // Stop observing
        if (mapContainerRef.current) {
            resizeObserver.unobserve(mapContainerRef.current);
        }
        // Remove the map instance
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
    };
  }, [leafletLoaded]); // Rerun when leaflet is loaded.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSubmitted(false);
    }, 4000);
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  return (
      <div className="bg-gray-50 font-sans overflow-hidden min-h-screen rounded-[9.6px]">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tighter">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Contact Information Section */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
              <p className="text-gray-600">
                Fill up the form and our team will get back to you within 24 hours. For urgent inquiries, please use the contact details below.
              </p>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="text-blue-600 pt-1"><LocationIcon /></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Address</h3>
                    <p className="text-gray-600">Amreli, Gujarat, India - 365620</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="text-blue-600 pt-1"><PhoneIcon /></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Call Us</h3>
                    {contractors.map((contractor) => (
                      <p key={contractor.name} className="text-gray-600">
                        {contractor.name}: <a href={`tel:${contractor.phone}`} className="hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-all duration-200">{contractor.phone}</a>
                      </p>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="text-blue-600 pt-1"><EmailIcon /></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Us</h3>
                    <p className="text-gray-600">
                        <a href="mailto:contact@tirthconstruction.com" className="hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-all duration-200">contact@tirthconstruction.com</a>
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interactive Map */}
              <motion.div 
                className="h-64 bg-gray-200 rounded-lg mt-8 overflow-hidden shadow-inner"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                 <div ref={mapContainerRef} className="w-full h-full" />
              </motion.div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                    className="text-center py-10 flex flex-col justify-center items-center h-full min-h-[500px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
                    <p className="text-gray-600 mt-2">Your message has been sent successfully. We'll be in touch soon.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300" placeholder="John Doe" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300" placeholder="you@example.com" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                      <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300" placeholder="+91 12345 67890" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea name="message" id="message" required rows="5" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300" placeholder="How can we help you?"></textarea>
                    </motion.div>

                    <div>
                      <motion.button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        Send Message
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
  );
}

export default ContactForm;
