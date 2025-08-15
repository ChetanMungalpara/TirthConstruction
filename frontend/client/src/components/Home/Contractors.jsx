import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { fetchContractors } from '../../services/apiService';

const PinPerspective = ({ title, href, isPinned }) => {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-0 z-[60] transition-opacity duration-500",
        isPinned && "opacity-100"
      )}
    >
      <div className="w-96 h-96 -mt-7 flex-none inset-0">
        {/* The title link that appears at the top */}
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            className="pointer-events-auto relative flex space-x-2 items-center z-[1000] rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10"
          >
            <span className="relative z-20 text-white text-base font-bold inline-block py-0.5">
              {title}
            </span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500"></span>
          </a>
        </div>

        {/* This container creates the 3D perspective for the glowing ripple effects */}
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(35deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: isPinned ? [0, 1, 0.5, 0] : 0, scale: isPinned ? 1 : 0, z: 0 }}
              transition={{ duration: 6, repeat: Infinity, delay: 0 }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: isPinned ? [0, 1, 0.5, 0] : 0, scale: isPinned ? 1 : 0, z: 0 }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: isPinned ? [0, 1, 0.5, 0] : 0, scale: isPinned ? 1 : 0, z: 0 }}
              transition={{ duration: 6, repeat: Infinity, delay: 4 }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
          </>
        </div>

        {/* This creates the actual pin line and head, animated from the top */}
        <>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isPinned ? '12rem' : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-5 w-px bg-gradient-to-b from-transparent via-cyan-500 to-cyan-500"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isPinned ? '12rem' : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-5 w-px bg-gradient-to-b from-transparent via-cyan-500 to-cyan-500 blur-[2px]"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isPinned ? 1 : 0, opacity: isPinned ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.4, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(1.25rem+12rem)]"
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-cyan-600 w-[12px] h-[12px] rounded-full z-40 blur-[3px]" />
            <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-cyan-300 w-[4px] h-[4px] rounded-full z-40" />
          </motion.div>
        </>
      </div>
    </motion.div>
  );
};


/**
 * ContractorsBanner Component
 * The main component that renders the interactive 3D carousel.
 */
const ContractorsBanner = () => {

  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalContractors = contractors.length;
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isPinVisible, setIsPinVisible] = useState(false); // New state for delayed pin visibility
  const animationFrameId = useRef(null);
  const startRotationRef = useRef(rotation);
  const pinTimeoutRef = useRef(null); // Ref to hold the timeout ID

  const handleCardClick = (index) => {
    if (isPaused && index === activeIndex) {
      setIsPaused(false);
    } else {
      setActiveIndex(index);
      setIsPaused(true);
    }
  };
   useEffect(() => {
        // --- REFACTORED DATA FETCHING ---
        fetchContractors()
            .then(response => {
                setContractors(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching contractors:", error);
                setLoading(false);
            });
    }, []);
// Add this new useEffect hook inside your ContractorsBanner component

useEffect(() => {
    if (!totalContractors || loading) return;

    const cardAngle = 360 / totalContractors;
    const carouselItems = document.querySelectorAll('.carousel-item');

    carouselItems.forEach((item, index) => {
        const content = item.querySelector('.card-content');
        if (!content) return;

        // Calculate the absolute angle of the card in the 360-degree circle
        const itemRotation = (rotation + index * cardAngle) % 360;
        const normalizedAngle = (itemRotation + 360) % 360; // Ensure angle is positive

        if (normalizedAngle > 80 && normalizedAngle < 280) {
            content.style.transform = 'rotateY(180deg)';
        } else {
            content.style.transform = '';
            content.style.filter = '';
        }
    });
}, [rotation, totalContractors, loading]); // Rerun when rotation changes
  useEffect(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    // Clear any pending pin timeout when state changes
    if (pinTimeoutRef.current) {
      clearTimeout(pinTimeoutRef.current);
    }

    if (isPaused) {
      const targetRotation = -(activeIndex * (360 / totalContractors));
      const currentRotation = rotation % 360;
      let diff = targetRotation - currentRotation;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const newRotation = currentRotation + diff;
      setRotation(newRotation);
      startRotationRef.current = newRotation;

      // Set a timeout to show the pin after 2 seconds
      pinTimeoutRef.current = setTimeout(() => {
        setIsPinVisible(true);
      }, 500);

    } else {
      // Immediately hide the pin when resuming
      setIsPinVisible(false);
      const startTime = Date.now();
      const initialRotation = startRotationRef.current;
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const newRotation = initialRotation + (elapsedTime * 0.01);
        setRotation(newRotation);
        animationFrameId.current = requestAnimationFrame(animate);
      };
      animationFrameId.current = requestAnimationFrame(animate);
    }

    // Cleanup timeouts on component unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (pinTimeoutRef.current) {
        clearTimeout(pinTimeoutRef.current);
      }
    };
  }, [isPaused, activeIndex]);

  const activeContractor = isPaused ? contractors[activeIndex] : null;

  if (loading) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white animate-pulse">Loading Contractors...</h2>
      </section>
    );
  }
  return (
    <section className="w-full h-screen rounded-lg flex flex-col items-center justify-center py-12 bg-gray-100 dark:bg-slate-900 [background-image:repeating-linear-gradient(to_right,transparent_0_100px,#00000011_100px_101px),repeating-linear-gradient(to_bottom,transparent_0_100px,#00000011_100px_101px)] overflow-hidden font-sans">
      <style>{`
                .carousel-container {
                  perspective: 2000px;
                }

                .carousel-item {
                    transform: rotateY(calc(var(--position) * (360deg / ${totalContractors}))) translateZ(25vw) rotateX(-15deg);
                    will-change: transform;
                    cursor: pointer;
                    transition: transform 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6);
                    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
                }
                .card-content {
                    transition: transform 0.4s, filter 0.4s;
                }

                .carousel-item.is-active {
                    transform: rotateY(calc(var(--position) * (360deg / ${totalContractors})))translateY(3vw) translateZ(18vw) scale(1.1) rotateX(40deg);
                    z-index: 10;
                    cursor: default;
                    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
                }

                .carousel-item:not(.is-active):hover {
                    transform: rotateY(calc(var(--position) * (360deg / ${totalContractors}))) translateZ(26vw) scale(1.02) rotateX(-10deg);
                }
                
                @media (max-width: 768px) {
                    .carousel-item {
                        transform: rotateY(calc(var(--position) * (360deg / ${totalContractors}))) translateZ(50vw) rotateX(-15deg);
                    }
                    .carousel-item.is-active {
                        transform: rotateY(calc(var(--position) * (360deg / ${totalContractors}))) translateZ(30vw) scale(1.05) rotateX(40deg);
                    }
                    .carousel-item:not(.is-active):hover {
                       transform: rotateY(calc(var(--position) * (360deg / ${totalContractors}))) translateZ(53vw) scale(1.02) rotateX(-10deg);
                    }
                }
            `}</style>

      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">Our Expert Contractors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Click a card to learn more.</p>
      </div>

      <div className="relative h-96 w-full flex items-center justify-center carousel-container">
        <div
          className="relative w-[220px] h-[280px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isPaused ? 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
          }}
        >
          {contractors.map((contractor, index) => {
            const isActive = isPaused && activeIndex === index;
            return (
              <div
                key={contractor._id}
                className={cn(
                  "carousel-item absolute top-0 left-0 w-full h-full bg-white dark:bg-zinc-900 rounded-xl p-6 flex flex-col items-center justify-center text-center border border-gray-200 dark:border-white/[0.1]",
                  { "is-active": isActive }
                )}
                style={{ '--position': index }}
                onClick={() => handleCardClick(index)}
              >
                {/* The content of the card itself */}
                <div className="card-content w-full h-full flex flex-col items-center justify-center">

                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-zinc-700 shadow-md mb-4 flex-shrink-0">
                    <img
                      src={contractor.dpimageurl}
                      alt={contractor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/112x112/CCCCCC/FFFFFF?text=Error'; }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{contractor.name}</h3>
                  <p className="text-md text-gray-500 dark:text-gray-400">{contractor.role}</p>
                </div>
              </div>
            );
          })}
        </div>
        <PinPerspective
          title={activeContractor ? "View Profile" : ""}
          href={activeContractor ? `/contractors/${activeContractor._id}` : "#"}
          isPinned={isPinVisible}
        />
      </div>
    </section>
  );
};

export default ContractorsBanner;
