import { Helmet } from 'react-helmet';
import {Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Section from './components/section';
import SectionIntro from './components/section.intro';
import SectionAbout from './components/section.about';
import SectionServices from './components/section.services';
import SectionContact from './components/section.contact';
import SectionAbout2 from './components/section.about2';
import BreakingNews from './components/breaking.news';

function App() {
  return (
    <div className="home-page">
      <Helmet>
        <script src="https://kit.fontawesome.com/1c03073856.js" crossOrigin="anonymous"></script>
      </Helmet>
      <Routes>
        <Route path='/' element={[
          <Header></Header>,
          <SectionIntro></SectionIntro>, 
          <SectionAbout2></SectionAbout2>,
          <SectionServices></SectionServices>,
          <SectionContact></SectionContact>
        ]}/>
        <Route path='/blogs/*' element={<BreakingNews></BreakingNews>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
