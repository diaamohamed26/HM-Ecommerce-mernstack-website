import React, { useState } from 'react';
import { toast } from 'react-toastify';
import heroimg from '../assets/hero.jpg'
import ProductShowcase from '../components/ProductShowcase';
import CTABanners from '../components/CTABanners';
import Hero from '../components/Hero';
import Footer from '../components/Footer';



const Home = () => {
  return (
    <div className='home'>
      
    <Hero/>     
    <ProductShowcase/>

    <CTABanners/>
    </div>
  )
}

export default Home
