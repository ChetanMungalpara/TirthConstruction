import React from 'react';
import { useNavigate } from 'react-router-dom';
import useOnScreen from '../ui/useOnScreen';
const OurWorkShowcase = () => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    const navigate = useNavigate();
    return (
        <section ref={ref} className="w-full py-16 sm:py-20 bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                <div className={`md:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">A Testament to Our Skill</h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Our craftsmanship is not just for our clients; it's a part of our lives. The beautiful farmhouse we built for our own family stands as a testament to our design philosophy and construction quality.
                    </p>
                    <p className="mt-4 text-gray-500">
                        This project showcases our ability to blend aesthetics with functionality, creating spaces that are both stunning and livable. It's a living portfolio of what Tirth Construction can achieve.
                    </p>
                    <button className="mt-8 group relative inline-block text-[#f39c12] font-bold py-3 px-8 rounded-lg border-2 border-[#f39c12] overflow-hidden transition-all duration-300 shadow-lg shadow-orange-500/20" onClick={() => navigate("/projects")}>
                        <span className="absolute inset-0 bg-[#f39c12] z-0 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                        <span className="relative z-10 text-[#f39c12] group-hover:text-white transition-colors duration-300">
                            View Our Projects
                        </span>
                    </button>

                </div>
                <div className={`md:w-1/2 grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ perspective: '800px' }}>
                    <div className={`group relative h-80 bg-neutral-800 rounded-lg shadow-xl flex items-center justify-center text-gray-500 transition-all duration-1000 border border-neutral-700 hover:!shadow-orange-400/20`}
                        style={{ transform: isVisible ? 'rotateY(-5deg) scale(1)' : 'rotateY(-35deg) scale(0.9)', transformStyle: 'preserve-3d' }}>
                        <p>Farmhouse Image</p>
                    </div>
                    <div className={`group relative h-80 bg-neutral-800 rounded-lg shadow-xl flex items-center justify-center text-gray-500 transition-all duration-1000 delay-200 mt-8 border border-neutral-700 hover:!shadow-orange-400/20`}
                        style={{ transform: isVisible ? 'rotateY(5deg) scale(1)' : 'rotateY(35deg) scale(0.9)', transformStyle: 'preserve-3d' }}>
                        <p>Mango Farm Image</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default OurWorkShowcase;