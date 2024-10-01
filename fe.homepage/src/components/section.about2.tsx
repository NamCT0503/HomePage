import React, { useEffect, useState } from 'react';

const SectionAbout2: React.FC = () => {
    const [opacityQuickPart, setOpacityQuickPart] = useState(0);
    const [opacityHeadingPart, setOpacityHeadingPart] = useState(0);
    const [opacityContentPart, setOpacityContentPart] = useState(0);

    useEffect(() => {
        const widthScreen = window.innerWidth;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if(widthScreen > 739){
                if(scrollY > 560) setOpacityQuickPart(1);
                if(scrollY > 760) setOpacityHeadingPart(1);
                if(scrollY > 1160) setOpacityContentPart(1);
            } 
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [0, window.location.reload]);

  return (
    <section id="section-about2" className="section">
        <div 
            className="wrap-container-quick-intro-about2"
            style={{
                opacity: opacityQuickPart
            }}
        >
            <div className="qucick-intro-about2">
                <div className='icon-quick-about2'><i className="fa-solid fa-globe"></i></div>
                <div className="content-quick-intro-about2">
                    <h3>Web Solution</h3>
                    <span>Giải pháp dịch vụ Web</span>
                    <div 
                        className="btn-quick-intro-about2"
                        onClick={() => {
                            document.getElementById('price-web')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                        <span>Xem thêm</span>
                    </div>
                </div>
            </div>
            <div className="qucick-intro-about2">
                <div className='icon-quick-about2'><i className="fa-solid fa-mobile"></i></div>
                <div className="content-quick-intro-about2">
                    <h3>Mobile Solution</h3>
                    <span>Giải pháp dịch vụ Moblie</span>
                    <div 
                        className="btn-quick-intro-about2"
                        onClick={() => {
                            document.getElementById('price-app')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                        <span>Xem thêm</span>
                    </div>
                </div>
            </div>
        </div>
        <div 
            className="heading-section"
            style={{
                opacity: opacityHeadingPart
            }}
        >
            <p>Về chúng tôi</p>
        </div>
        <div 
            className="wrap-container-content-about2"
            style={{
                opacity: opacityContentPart
            }}
        >
            <div className="container-content-aboout2">
                <div className="content-about2">
                    <i className="fa-solid fa-check"></i>
                    <p>Cung cấp các giải pháp công nghệ tối ưu cho doanh nghiệp và cá nhân.</p>
                </div>
                <div className="content-about2">
                    <i className="fa-solid fa-check"></i>
                    <p>Đa dạng nền tảng tích hợp dịch vụ phù hợp với yêu cầu khách hàng.</p>
                </div>
                <div className="content-about2">
                    <i className="fa-solid fa-check"></i>
                    <p>Chi phí tốt nhất để có thể tiếp cận mọi tệp khách hàng.</p>
                </div>
                <div className="content-about2">
                    <i className="fa-solid fa-check"></i>
                    <p>Dễ dàng quản lý tài nguyên hệ thống của bạn.</p>
                </div>
            </div>
            <div className="btn-content-about2">
                <button className='about2-web'>Website</button>
                <button className='about2-app'>Mobile</button>
            </div>
        </div>
    </section>
  );
};

export default SectionAbout2;

