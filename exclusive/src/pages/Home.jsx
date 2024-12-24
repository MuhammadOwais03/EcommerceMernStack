import React from 'react';
import Hero from '../../components/Hero';
import LatestCollections from '../../components/latestCollections';
import BestSellers from '../../components/BestSellers';
import { Service } from '../../components/Service';


const Home = () => {
  return (
    <>
        <Hero />
        <LatestCollections/>
        <BestSellers/>
        <Service/>
    </>
  )
};

export default Home;
