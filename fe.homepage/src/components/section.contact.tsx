import React, { useEffect, useState } from 'react';

const SectionContact: React.FC = () => {
  const [opacityHeader, setOpacityHeader] = useState(0);
  const [transXForm, setTransXForm] = useState('translateX(150%)');
  const [opacityOrther, setOpacityOrther] = useState(0);
  const [transYOrtherIcon, setTransYOrtherIcon] = useState('translateY(-100%)');

  useEffect(() => {
    const widthScreen = window.innerWidth;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if(widthScreen > 739){
            if(scrollY > 4480) setOpacityHeader(1); 
            if(scrollY > 4870) setTransXForm('translateX(0)');
            if(scrollY > 5000){
              setOpacityOrther(1);
              setTransYOrtherIcon('translateY(0)');
            }
        } 
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
  }, [0, window.location.reload]);

  return (
    <section id="section-contact" className="section">
      <div 
        className="heading-section"
        style={{
          opacity: opacityHeader
        }}
      >
        <p>Liên hệ với chúng tôi</p>
      </div>
      <div className="wrap-container-contact">
        <div 
          className="wrap-container-form-contact"
          style={{
            transform: transXForm
          }}
        >
          <div className="wrap-form-contact">
            <form action="">
              <h3>Gửi email cho chúng tôi</h3>
              <div className="input-content-contact">
                <input type="text" name="" id="" required/>
                <label htmlFor="">Email của bạn</label>
              </div>
              <div className="input-content-contact">
                <textarea name="" id="" rows={6} required></textarea>
                <label htmlFor="">Nội dung</label>
              </div>
              <button className='btn-contact'>
                <i className="fa-regular fa-paper-plane"></i>&nbsp;
                Gửi
              </button>
            </form>
          </div>
          <div className="img-contact-form">
            <img src="/contact-image-form.jpeg" />
          </div>
        </div>
        <div className="wrap-orther-contact">
          <div className="text-orther-contact" style={{opacity: opacityOrther}}>
            <p>Hoặc</p>
          </div>
          <div className="orther-contact-group">
            <div className="orther-contact fb" style={{transform: transYOrtherIcon}}>
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </div>
            <div className="orther-contact linkedin" style={{transform: transYOrtherIcon}}>
              <i className="fa-brands fa-linkedin"></i>
              <span>Linkedin</span>
            </div>
            <div className="orther-contact telegram" style={{transform: transYOrtherIcon}}>
              <i className="fa-brands fa-telegram"></i>
              <span>Telegram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;
