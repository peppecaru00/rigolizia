import React from 'react';
import Hero from '../components/Hero';
import IconicPlaces from '../components/IconicPlaces';
import Community from '../components/Community';
import Visit from '../components/Visit';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="bg-[#FFF9F0] min-h-screen">
      <Hero />
      <IconicPlaces />
      <Community />
      <Visit />
      <Footer />
    </div>
  );
};

export default Home;
