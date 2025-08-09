import React, { useState, useEffect, useRef } from 'react';
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};
export default useOnScreen;
// Usage in AboutHero.jsx
// import useOnScreen from '../ui/useOnScreen';

// const [ref, isVisible] = useOnScreen({ threshold: 0.3 });
// <section ref={ref} 
// style = {{
//     transform: isVisible ? 'rotateX(0deg)' : 'rotateX(90deg)',