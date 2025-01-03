import React, {useEffect} from 'react';
import Hero from '../../components/Hero';
import LatestCollections from '../../components/latestCollections';
import BestSellers from '../../components/BestSellers';
import { Service } from '../../components/Service';


const Home = ({products, setMenuOpen}) => {

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
        <Hero />
        <LatestCollections products={products}/>
        <BestSellers products={products}/>
        <Service/>
    </>
  )
};

export default Home;
