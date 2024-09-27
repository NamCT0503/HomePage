import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [positionHeader, setPositionHeader] = useState('unset');
    const [paddingHeader, setPaddingHeader] = useState('20px');
    const [opacityHeader, setOpacityHeader] = useState(1);
    const [hiddenHeader, setHiddenHeader] = useState(false);
    // const [widthScreen, setWidthScreen] = useState<number>();

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
            handleClick('null')
          } else {
            setPaddingHeader('5px');
            setPositionHeader('sticky');
            setOpacityHeader(0.3);
            if(scrollY > 82 && scrollY <= 1030) handleClick('intro'); //1268
            if(scrollY > 1031 && scrollY <= 1970) handleClick('about'); //2511
            if(scrollY > 1971 && scrollY <= 4430) handleClick('services'); //3736
            if(scrollY >= 4430) handleClick('contact'); //3736
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

    return (
        <header 
              className="header" 
              style={{
                  padding: paddingHeader,
                  position: positionHeader as any,
                  opacity: opacityHeader
              }}
              // hidden={true}
          >
            <div className="title-header">
                <h1>My Website</h1>
            </div>
            <nav className='menubar'>
                <ul>
                <li id='intro' onClick={() => handleClick('intro')}><a href="#section-intro">Home</a></li>
                <li id='about' onClick={() => handleClick('about')}><a href="#section-about">About</a></li>
                <li id='services' onClick={() => handleClick('services')}><a href="#section-services">Services</a></li>
                <li id='contact' onClick={() => handleClick('contact')}><a href="#section-contact">Contact</a></li>
                </ul>
            </nav>
          </header>
    );
};

export default Header;
// <div className='wrap-header'>
          {/* <label htmlFor="set-show-hide" className='btn-menubar-mobile'>
            <i className="fa-solid fa-bars"></i>
          </label>
          <input type="checkbox" id="set-show-hide" hidden/> */}
          
        {/* </div> */}