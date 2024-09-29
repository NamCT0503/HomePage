import React from 'react';

const SectionAbout: React.FC = () => {
  return (
    <section id="section-about" className="section">
      <div className="heading-section">
        <p>Về chúng tôi</p>
      </div>
      <div className="wrap-container-content-about">
        <div className="general-introduction">
          <div className="content-gen-intro">
            <div>
              Trong những năm qua, chúng tôi đã phát triển dần dần 
              từ một công ty sản phẩm đơn lẻ thành một công ty giải pháp 
              công nghệ đa kênh. Với sự hiện diện trên nhiều loại hình - 
              từ Web-app, App Android, App iOS. Chúng tôi giúp định hình 
              xã hội nói chung và cam kết cung cấp các giải pháp công nghệ 
              tích hợp tốt nhất.
            </div> <br />
            <div>
              Tầm nhìn của chúng tôi là vươn tới tầm cao mới, 
              luôn tạo ra sự khác biệt và phát triển theo 
              đúng hướng.
            </div> <br />
            <div>
              Thông qua đó, chúng tôi vẫn kiên định với cam kết 
              mang đến cho bạn nội dung thúc đẩy hành động. 
              Và kể những câu chuyện cần phải kể, vì chúng 
              có sức mạnh truyền cảm hứng.
            </div>
          </div>
          <div className="img-gen-intro">
            <img src="/about-general-intro-img.png" alt="" />
          </div>
        </div>
        <div className='title-about-founder'><p>Founder</p></div>
        <div className="wrap-container-about-founder">
          <div className="container-about-founder">
            <div className="content-part-hidden">
              <img src="/about-founder-img1.webp" alt="" />
              <div className="content-hidden">
                <h3>Mr. Nguyen Van Anh</h3>
                <span>Người phát triển - Maketing</span>
                <div className="wrap-icon-founder">
                  <div className="icon-founder">
                    <i className="fa-solid fa-certificate"></i>
                    <span>Kinh nghiệm: 5 năm</span>
                  </div>
                  <div className="icon-founder exp">
                    <i className="fa-brands fa-linkedin"></i>
                    <span>Linkedin</span>
                  </div>
                  <div className="icon-founder profile">
                    <i className="fa-brands fa-facebook"></i>
                    <span>Facebook</span>
                  </div>
                  <div className="icon-founder quick-contact">
                    <i className="fa-brands fa-telegram"></i>
                    <span>Telegram</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-show-all">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing 
                elit. Donec nec sem sed erat aliquet ullamcorper. 
                Maecenas a mauris sollicitudin, faucibus odio quis, 
                accumsan risus. Nunc pharetra lorem velit, ut sagittis 
                enim tincidunt sit amet. Maecenas non augue ultrices, 
                pretium erat vitae, semper lacus. Suspendisse congue 
                tortor eget ex aliquet suscipit. Aliquam at libero eu 
                justo pulvinar interdum. Aenean auctor enim eget lectus 
                pretium, id rhoncus neque tempor. Morbi ante diam, 
                cursus vel orci id, venenatis accumsan eros. 
                In ullamcorper metus porta nibh porttitor, at imperdiet 
                sem dapibus. Pellentesque habitant morbi tristique 
                senectus et netus et malesuada fames ac turpis egestas. 
                Donec purus sapien, rutrum sed tortor et, tincidunt 
                lobortis massa. Integer at laoreet mauris, ut feugiat 
                lorem. Pellentesque id lectus euismod lectus porta 
                consequat.
              </span>
            </div>
          </div>
          <div className="container-about-founder founder2">
            <div className="content-part-hidden">
              <img src="/about-founder-img2.png" alt="" />
              <div className="content-hidden">
                <h3>Mr. Nguyen Van Anh</h3>
                <span>Người phát triển - Maketing</span>
                <div className="wrap-icon-founder">
                  <div className="icon-founder">
                    <i className="fa-solid fa-certificate"></i>
                    <span>Kinh nghiệm: 5 năm</span>
                  </div>
                  <div className="icon-founder exp">
                    <i className="fa-brands fa-linkedin"></i>
                    <span>Linkedin</span>
                  </div>
                  <div className="icon-founder profile">
                    <i className="fa-brands fa-facebook"></i>
                    <span>Facebook</span>
                  </div>
                  <div className="icon-founder quick-contact">
                    <i className="fa-brands fa-telegram"></i>
                    <span>Telegram</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-show-all">
              Lorem ipsum dolor sit amet, consectetur adipiscing 
              elit. Donec nec sem sed erat aliquet ullamcorper. 
              Maecenas a mauris sollicitudin, faucibus odio quis, 
              accumsan risus. Nunc pharetra lorem velit, ut sagittis 
              enim tincidunt sit amet. Maecenas non augue ultrices, 
              pretium erat vitae, semper lacus. Suspendisse congue 
              tortor eget ex aliquet suscipit. Aliquam at libero eu 
              justo pulvinar interdum. Aenean auctor enim eget lectus 
              pretium, id rhoncus neque tempor. Morbi ante diam, 
              cursus vel orci id, venenatis accumsan eros. 
              In ullamcorper metus porta nibh porttitor, at imperdiet 
              sem dapibus. Pellentesque habitant morbi tristique 
              senectus et netus et malesuada fames ac turpis egestas. 
              Donec purus sapien, rutrum sed tortor et, tincidunt 
              lobortis massa. Integer at laoreet mauris, ut feugiat 
              lorem. Pellentesque id lectus euismod lectus porta 
              consequat.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAbout;
