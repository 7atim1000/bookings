import React from 'react' ;
import Title from './Title';

const NewsLetter = () => {
    return (
       
        <div class="w-full md:max-w-5xl lg:max-w-5xl lg:mx-auto rounded-2xl bg-slate-900 px-14 md:px-12 lg:px-24 text-center text-white py-10 flex flex-col items-center justify-center">
            <Title title ="Stay Inspired" subTitle ="Join our newsletter and be the first to discover new destinations,
            exclusive offers, and travel inspiration."/> 
           
            <div class="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
                <input type="text" class="bg-transparent outline-none rounded-full px-4 h-full flex-1" placeholder="Enter your email address" />
                <button class="bg-[#49b9ff] text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center cursor-pointer">
                    Subscribe now
                </button>
            </div>
        </div>
    );
}


export default NewsLetter ;