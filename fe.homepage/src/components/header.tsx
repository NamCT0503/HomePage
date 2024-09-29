import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [positionHeader, setPositionHeader] = useState('unset');
    const [paddingHeader, setPaddingHeader] = useState('20px');
    const [opacityHeader, setOpacityHeader] = useState(1);
    const [hiddenHeader, setHiddenHeader] = useState(false);
    const [hiddenUptoTop, setHiddenUptoTop] = useState('none');

    useEffect(() => {
      const widthScreen = window.innerWidth;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        // console.log('Scroll position: ', scrollY);
        if(widthScreen > 739){
          if(scrollY === 0){
            setPaddingHeader('20px');
            setPositionHeader('unset');
            setOpacityHeader(1);
            setHiddenUptoTop('none');
            handleClick('null')
          } else {
            setPaddingHeader('5px');
            setPositionHeader('sticky');
            setOpacityHeader(0.3);
            setHiddenUptoTop('block');
            if(scrollY > 82 && scrollY <= 1030) handleClick('intro'); //1268
            if(scrollY > 1031 && scrollY <= 1970) handleClick('about'); //2511
            if(scrollY > 1971 && scrollY <= 5600) handleClick('services'); //3736
            if(scrollY > 5600) handleClick('contact'); //3736
          }
        } else {
          setHiddenHeader(true);
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

    const handleClickHiddenMenuBar = () => {

    }

    return (
        <header 
            className="header" 
            id='header'
            style={{
                padding: paddingHeader,
                position: positionHeader as any
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
                  id='about' 
                  style={{opacity: opacityHeader}} 
                  onClick={() => handleClick('about')}
                >
                  <a href="#section-about">About</a>
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