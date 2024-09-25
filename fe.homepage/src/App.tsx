import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Section from './components/section';
import SectionIntro from './components/section.intro';
import SectionAbout from './components/section.about';
import SectionServices from './components/section.services';
import SectionContact from './components/section.contact';

function App() {
  let lastScrollY = 0;
  
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     console.log('Scroll position: ', scrollY);
  //     if(scrollY !== 0){
        
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, []);

  return (
    <div className="home-page">
      <Header></Header>
      <SectionIntro></SectionIntro>
      <SectionAbout></SectionAbout>
      <SectionServices></SectionServices>
      <SectionContact></SectionContact>
      <Footer></Footer>
    </div>
  );
}

export default App;
