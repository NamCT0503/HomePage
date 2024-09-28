import React, { useEffect, useState } from 'react';

const SectionIntro: React.FC = () => {
    const [textIntro, setTextIntro] = useState('Website ');
    const [colorCircleLeft, setColorCircleLeft] = useState('red');
    const [colorCircleRight, setColorCircleRight] = useState('grey');
    const [fontSizeCircleLeft, setFontSizeCircleLeft] = useState('24px');
    const [fontSizeCircleRight, setFontSizeCircleRight] = useState('20px');
    const [translateXWeb, setTranslateXWeb] = useState('translateX(0)');
    const [translateXApp, setTranslateXApp] = useState('translateX(100%)');
    const [transYTitBanner, setTransYTitBanner] = useState('translateY(0)');
    const [transYSpanTag, setTransYSpanTag] = useState('translateY(0)');
    const [transYTBtnTag, setTransYBtnTag] = useState('translateY(0)');
    const [scaleImgTag, setScaleImgTag] = useState('scale(1)');
    const [transYTitBannerApp, setTransYTitBannerApp] = useState('translateY(510%)');
    const [transYSpanTagApp, setTransYSpanTagApp] = useState('translateY(500%)');
    const [transYTBtnTagApp, setTransYBtnTagApp] = useState('translateY(200%)');
    const [scaleImgTagApp, setScaleImgTagApp] = useState('scale(0)');

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIntro(prevText => 
                prevText === 'Website ' 
                ? 'App Android/iOS ' 
                : 'Website '
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFontSizeCircleLeft(font => (font === '24px'? '20px': '24px'));
            setFontSizeCircleRight(font => (font === '20px'? '24px': '20px'));
            setColorCircleLeft(color => (color === 'red'? 'grey': 'red'));
            setColorCircleRight(color => (color === 'grey'? 'red': 'grey'));
            setTranslateXWeb(trans => (trans === 'translateX(0)'? 'translateX(-100%)': 'translateX(0)'));
            setTranslateXApp(trans => (trans === 'translateX(100%)'? 'translateX(0)': 'translateX(100%)'));

            setTransYTitBanner(trans => (trans === 'translateY(510%)'? 'translateY(0)': 'translateY(510%)'));
            setTransYSpanTag(trans => (trans === 'translateY(500%)'? 'translateY(0)': 'translateY(500%)'));
            setTransYBtnTag(trans => (trans === 'translateY(200%)'? 'translateY(0)': 'translateY(200%)'));
            setScaleImgTag(scale => (scale === 'scale(0)'? 'scale(1)': 'scale(0)'));
            setTransYTitBannerApp(trans => (trans === 'translateY(510%)'? 'translateY(0)': 'translateY(510%)'));
            setTransYSpanTagApp(trans => (trans === 'translateY(500%)'? 'translateY(0)': 'translateY(500%)'));
            setTransYBtnTagApp(trans => (trans === 'translateY(200%)'? 'translateY(0)': 'translateY(200%)'));
            setScaleImgTagApp(scale => (scale === 'scale(0)'? 'scale(1)': 'scale(0)'));
        }, 4000);

        return () => clearInterval(interval); 
    }, [translateXApp, translateXWeb]);

    const handleOnClickCircleLeft = () => {
        setColorCircleLeft('red');
        setColorCircleRight('grey');
        setFontSizeCircleLeft('24px');
        setFontSizeCircleRight('20px');
        setTranslateXApp('translateX(100%)');
        setTranslateXWeb('translateX(0)');

        setTransYTitBanner('translateY(0)');
        setTransYSpanTag('translateY(0)');
        setTransYBtnTag('translateY(0)');
        setScaleImgTag('scale(1)');
        setTransYTitBannerApp('translateY(510%)');
        setTransYSpanTagApp('translateY(500%)');
        setTransYBtnTagApp('translateY(200%)');
        setScaleImgTagApp('scale(0)');
    }

    const handleOnClickCircleRight = () => {
        setColorCircleRight('red');
        setColorCircleLeft('grey');
        setFontSizeCircleRight('24px');
        setFontSizeCircleLeft('20px');
        setTranslateXApp('translateX(0)')
        setTranslateXWeb('translateX(-100%)');

        setTransYTitBanner('translateY(510%)');
        setTransYSpanTag('translateY(500%)');
        setTransYBtnTag('translateY(200%)');
        setScaleImgTag('scale(0)');
        setTransYTitBannerApp('translateY(0)');
        setTransYSpanTagApp('translateY(0)');
        setTransYBtnTagApp('translateY(0)');
        setScaleImgTagApp('scale(1)');
    }

    return (
        <section id="section-intro" className="section">
            <div className="layout"></div>
            <div className="wrap-typing">
                <div className="typing">
                    <span>Cung cấp dịch vụ</span>
                    <div>
                        <p className='intro-typing'>{textIntro}</p>
                    </div>
                </div>
                <div className="br-intro">
                    <span>nhanh chóng, tối ưu, giá thành hợp lý dành cho bạn</span>
                </div>
            </div>
            <div className="banner-intro">
                <div 
                    className="banner web-intro"
                    style={{
                        transform: translateXWeb
                    }}
                >
                    <div className="content-banner">
                        <span 
                            className='title-banner' 
                            style={{transform: transYTitBanner}}
                        >
                            Gói dịch vụ Web
                        </span>
                        <span style={{transform: transYSpanTag}}>Cập nhật công nghệ mới nhất</span>
                        <button 
                            style={{transform: transYTBtnTag}}
                            onClick={() => {
                                document.getElementById('price-web')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Xem bảng giá
                        </button>
                    </div>
                    <img 
                        src="/intro-web-imgBanner.png" 
                        alt="" 
                        style={{transform: scaleImgTag}}
                    />
                </div>
                <div 
                    className="banner app-intro"
                    style={{
                        transform: translateXApp
                    }}
                >
                    <div className="content-banner">
                        <span 
                            className='title-banner' 
                            style={{
                                transform: transYTitBannerApp
                            }}
                        >
                            Gói dịch vụ App
                        </span>
                        <span style={{transform: transYSpanTagApp}}>Tối ưu trải nghiệm đa thiết bị</span>
                        <button 
                            style={{transform: transYTBtnTagApp}}
                            onClick={() => {
                                document.getElementById('price-app')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                                Xem bảng giá
                        </button>
                    </div>
                    <img 
                        src="/intro-app-imgBanner.png" 
                        alt=""
                        style={{transform: scaleImgTagApp}}    
                    />
                </div>
            </div>
            <div className="choose-banner">
                <i 
                    className="fa-solid fa-circle"
                    style={{
                        color: colorCircleLeft,
                        fontSize: fontSizeCircleLeft
                    }}
                    onClick={handleOnClickCircleLeft}
                ></i>
                <i 
                    className="fa-solid fa-circle"
                    style={{
                        color: colorCircleRight,
                        fontSize: fontSizeCircleRight
                    }}
                    onClick={handleOnClickCircleRight}
                ></i>
                
            </div>
        </section>
    );
};

export default SectionIntro;
