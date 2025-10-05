import React from 'react' 
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination';
import ExcelusiveOffers from '../components/ExcelusiveOffers';
import Testimonial from '../components/Testimonial';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import RecommendedHotels from '../components/RecommendedHotels';

const Home = () => {
    return (
        <>
            <Hero />
            <RecommendedHotels />
            <FeaturedDestination />
            <ExcelusiveOffers />
            <Testimonial />
            <NewsLetter />
            
        </>
    );
}


export default Home ;