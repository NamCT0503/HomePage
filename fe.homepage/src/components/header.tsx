import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [positionHeader, setPositionHeader] = useState('unset');
    const [paddingHeader, setPaddingHeader] = useState('20px');
    const [opacityHeader, setOpacityHeader] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          console.log('Scroll position: ', scrollY);
          if(scrollY === 0){
            setPaddingHeader('20px');
            setPositionHeader('unset');
            setOpacityHeader(1);
          } else {
            setPaddingHeader('5px');
            setPositionHeader('sticky');
            setOpacityHeader(0.3);
          }
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, []);

    return (
        <header 
            className="header" 
            style={{
                padding: paddingHeader,
                position: positionHeader as any,
                opacity: opacityHeader
            }}
        >
        <div className="title-header">
            <h1>My Website</h1>
        </div>
        <nav className='menubar'>
            <ul>
            <li><a href="#section-intro">Home</a></li>
            <li><a href="#section-about">About</a></li>
            <li><a href="#section-services">Services</a></li>
            <li><a href="#section-contact">Contact</a></li>
            </ul>
        </nav>
        </header>
    );
};

export default Header;
