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
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="home-page">
      <Helmet>
        <script src="https://kit.fontawesome.com/1c03073856.js" crossOrigin="anonymous"></script>
      </Helmet>
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
