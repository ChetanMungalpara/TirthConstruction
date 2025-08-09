import React from 'react';
import AboutHero from '../components/About/AboutHero';
import Timeline from '../components/About/Timeline';
import Team from '../components/About/Team';
import OurWorkShowcase from '../components/About/OurWorkShowcase';

const About = () => {
  return (
        <div className="gap-10 flex flex-col items-center justify-center font-sans">
          <AboutHero />
          <Timeline />
          <Team />
          <OurWorkShowcase />
        </div>
  );
};



export default About;
