import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [positionHeader, setPositionHeader] = useState('unset');
    const [paddingHeader, setPaddingHeader] = useState('20px');
    const [opacityHeader, setOpacityHeader] = useState(1);
    const [hiddenUptoTop, setHiddenUptoTop] = useState('none');
    const [widthHeadeer, setWidthheader] = useState('100%');

    useEffect(() => {
      const widthScreen = window.innerWidth;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        console.log('Scroll position: ', scrollY);
        if(widthScreen > 739){
          if(scrollY === 0){
            setPaddingHeader('20px'); 
            setPositionHeader('unset');
            setOpacityHeader(1);
            setHiddenUptoTop('none');
            handleClick('null')
          } else {
            setWidthheader('100%')
            // setPaddingHeader('5px 0');
            setPositionHeader('sticky');
            setOpacityHeader(0.3);
            setHiddenUptoTop('block');
            if(scrollY > 82 && scrollY <= 760){
              handleClick('intro');//1030
            }
            if(scrollY > 761 && scrollY <= 1760){
              handleClick('about2');//1970
            }
            if(scrollY > 1961 && scrollY <= 4590){
              handleClick('services');//5600
            }
            if(scrollY > 4591) handleClick('contact');
          }
        } 
      }
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, []);

    const handleClick = (id: string) => {
      const liTag = document.getElementsByTagName('li');
      const liTagCurrent = document.getElementById(id);

      for(let i=0; i<liTag.length; i++){
        liTag[i].style.borderBottom = 'none';
        liTag[i].style.paddingBottom = '0%';
      }

      if(liTagCurrent === null){
        for(let i=0; i<liTag.length; i++){
          liTag[i].style.borderBottom = 'none';
          liTag[i].style.paddingBottom = '0%';
        }
        return;
      }

      liTagCurrent!.style.borderBottom = '3px solid white';
      liTagCurrent!.style.paddingBottom = '5%';
    }

    return (
        <header 
            className="header" 
            id='header'
            style={{
                padding: paddingHeader,
                position: positionHeader as any,
                width: widthHeadeer
            }}
        >
          <div 
            className="title-header" 
            style={{opacity: opacityHeader}}
          >
            <h1>My Website</h1>
          </div>
          <nav className='menubar'>
              <ul>
                <li 
                  id='intro' 
                  style={{opacity: opacityHeader}} 
                  onClick={() => handleClick('intro')}
                >
                  <a href="#section-intro">Home</a>
                </li>
                <li 
                  id='about2' 
                  style={{opacity: opacityHeader}} 
                  onClick={() => handleClick('about')}
                >
                  <a href="#section-about2">About</a>
                </li>
                <li 
                  id='services' 
                  style={{opacity: opacityHeader}} 
                  onClick={() => handleClick('services')}
                >
                  <a href="#section-services">Services</a>
                </li>
                <li 
                  id='contact' 
                  style={{opacity: opacityHeader}} 
                  onClick={() => handleClick('contact')}
                >
                  <a href="#section-contact">Contact</a>
                </li>
                <li 
                  id='blogs' 
                  style={{opacity: opacityHeader}} 
                >
                  <Link to={'/blogs'}>Blogs</Link>
                </li>
              </ul>
          </nav>
          <i 
            className="fa-solid fa-angles-up" 
            id='upto-top' 
            style={{display: hiddenUptoTop}}
            onClick={() => {
              setHiddenUptoTop('none');
              document.getElementById('section-intro')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
          </i>
        </header>
    );
};

export default Header;