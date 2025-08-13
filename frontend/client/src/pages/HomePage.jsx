import React from 'react';
import Hero from '../components/Home/Hero';
import Count from '../components/Home/Count';
import Expertise from '../components/Home/Expertise';
import ContractorsBanner from '../components/Home/Contractors';

const HomePage = () => {
  return (
    <div className='gap-10 flex flex-col items-center justify-center'>
      <Hero />
      <Count />
      <Expertise/>
      <ContractorsBanner/>
    </div>
  );
};

export default HomePage;