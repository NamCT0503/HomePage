import React from 'react';

const SectionContact: React.FC = () => {
  return (
    <section id="section-contact" className="section">
      <div className="heading-section">
        <p>Liên hệ với chúng tôi</p>
      </div>
      <div className="wrap-container-contact">
        <div className="wrap-container-form-contact">
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
          <div className="text-orther-contact">
            <p>Hoặc</p>
          </div>
          <div className="orther-contact-group">
            <div className="orther-contact fb">
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </div>
            <div className="orther-contact linkedin">
              <i className="fa-brands fa-linkedin"></i>
              <span>Linkedin</span>
            </div>
            <div className="orther-contact telegram">
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
