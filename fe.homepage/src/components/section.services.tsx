import React from 'react';

const SectionServices: React.FC = () => {
  console.log(process.env.IMG_OVERVIEW)
  return (
    <section id="section-services" className="section">
      <div className="heading-section">
        <p>Dịch vụ của chúng tôi</p>
      </div>
      <div className="wrap-container-overview-content">
        <div className="wrap-container-image">
          <img src="/services-overview.png" width={200} height={200} />
        </div>
        <div className="wrap-container-content-service-overview">
          <h3>Giải pháp tiên tiến - Ứng dụng thông minh - Tác vụ chuyên nghiệp</h3>
            <div className='list-overview'>
              <i className="fa-solid fa-caret-right"></i>
              <p>Giá thành vừa phải, chất lượng sản phẩm như ý.</p>
            </div>
            <div className='list-overview'>
              <i className="fa-solid fa-caret-right"></i>
              <p>Hỗ trợ xây dựng đa nền tảng: Web - Mobile.</p>
            </div>
            <div className='list-overview'>
              <i className="fa-solid fa-caret-right"></i>
              <p>Lợi ích khi sử dụng: </p>
            </div>
            <div className='sub-list-overview'>
              <i className="fa-solid fa-check"></i>
              <p>Cập nhật chức năng, dịch vụ theo yêu cầu.</p>
            </div>
            <div className='sub-list-overview'>
              <i className="fa-solid fa-check"></i>
              <p>Tích hợp nhiều tiện ích, bàn giao nhanh chóng.</p>
            </div>
            <div className='sub-list-overview'>
              <i className="fa-solid fa-check"></i>
              <p>Tư vấn, hỗ trợ trọn gói theo từng dịch vụ.</p>
            </div>
        </div>
      </div>
      <div className="wrap-container-service-package">
        {/* <img src="/service-package-theme.jpg" alt="" /> */}
        <div className="content-package-web-service">
          <h2>GÓI DỊCH VỤ WEBSITE</h2>
          <p>Công nghệ web hàng đầu - Tiết kiệm chi phí - Bàn giao web nhanh chóng</p>
          <div className="wrap-packages-web">
            <div className="package-web basic">
              <p className='prices-web'>1.450.000</p>
              <p className='types-web'>GÓI WEB CƠ BẢN</p>
              <div className="type-package-web">
                TRỌN GÓI
              </div>
              <div className="content-package-web">
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
              </div>
              <input type="button" value="Đăng ký" />
            </div>
            <div className="package-web seo">
              <p className='prices-web'>1.450.000</p>
              <p className='types-web'>GÓI WEB CƠ BẢN</p>
              <div className="type-package-web">
                TRỌN GÓI
              </div>
              <div className="content-package-web">
                <div className="content-in-package-web">
                  
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
              </div>
              <input type="button" value="Đăng ký" />
            </div>
            <div className="package-web sup-sale">
              <div className="recommend-web"></div>
              <span>Nên dùng</span>
              <p className='prices-web'>1.450.000</p>
              <p className='types-web'>GÓI WEB CƠ BẢN</p>
              <div className="type-package-web">
                TRỌN GÓI
              </div>
              <div className="content-package-web">
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
              </div>
              <input type="button" value="Đăng ký" />
            </div>
            <div className="package-web pro">
              <p className='prices-web'>1.450.000</p>
              <p className='types-web'>GÓI WEB CƠ BẢN</p>
              <div className="type-package-web">
                TRỌN GÓI
              </div>
              <div className="content-package-web">
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
                <div className="content-in-package-web">
                  <p>avsg asgsad adhaush ashaudh ajdai ashas dáh</p>
                </div>
              </div>
              <input type="button" value="Đăng ký" />
            </div>
          </div>
        </div>
      </div>
      <img src="/services-separate-page.png" alt="" />
      <div className="wrap-container-service-package app">
        <div className="content-package-app-services">
          <h2>GÓI DỊCH VỤ APP</h2>
          <p>Giá thành ưu đãi - Chất lượng ưu việt</p>
        </div>
        <div className="wrap-container-packages-app-service">
          <div className="container-packages-app-services personal">
            <span>Personal</span>
            <div className="contact-services-app">
              <h1>Liên hệ</h1>
              <h3>0985.008.180</h3>
            </div>
            <div className="content-package-app">
              <div className="content-line">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <p>App theo mẫu lựa chọn có sẵn.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-android"></i>
                <p>Phiên bản App Mobile Android.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-apple"></i>
                <p>Phiên bản App Mobile iOS.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-code"></i>
                <p>Phiên bản Backend - API.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-earth-americas"></i>
                <p>Website giới thiệu cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-chrome"></i>
                <p>01 Logo cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-file-video"></i>
                <p>Video ngắn thương hiệu.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-file-image"></i>
                <p>02 Banner cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-address-card"></i>
                <p>Mẫu danh thiếp.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-cloud"></i>
                <p>02 tháng Server tại Việt Nam.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-headset"></i>
                <p>Hỗ trợ trong giờ hành chính.</p>
              </div>
            </div>
            <button><i className="fa-solid fa-phone"></i>Gọi ngay!</button>
          </div>
          <div className="container-packages-app-services professional">
            <span>Professional</span>
            <div className="contact-services-app">
              <h1>Liên hệ</h1>
              <h3>0985.008.180</h3>
            </div>
            <div className="content-package-app">
              <div className="content-line">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <p>App theo mẫu lựa chọn có sẵn.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-android"></i>
                <p>Phiên bản App Mobile Android.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-apple"></i>
                <p>Phiên bản App Mobile iOS.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-code"></i>
                <p>Phiên bản Backend - API.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-earth-americas"></i>
                <p>Website giới thiệu cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-chrome"></i>
                <p>01 Logo cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-file-video"></i>
                <p>Video ngắn thương hiệu.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-file-image"></i>
                <p>02 Banner cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-address-card"></i>
                <p>Mẫu danh thiếp.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-cloud"></i>
                <p>02 tháng Server tại Việt Nam.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-headset"></i>
                <p>Hỗ trợ trong giờ hành chính.</p>
              </div>
            </div>
            <button><i className="fa-solid fa-phone"></i>Gọi ngay!</button>
          </div>
          <div className="container-packages-app-services business">
            <span>Personal</span>
            <div className="contact-services-app">
              <h1>Business</h1>
              <h3>0985.008.180</h3>
            </div>
            <div className="content-package-app">
              <div className="content-line">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <p>App theo mẫu lựa chọn có sẵn.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-android"></i>
                <p>Phiên bản App Mobile Android.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-apple"></i>
                <p>Phiên bản App Mobile iOS.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-code"></i>
                <p>Phiên bản Backend - API.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-earth-americas"></i>
                <p>Website giới thiệu cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-brands fa-chrome"></i>
                <p>01 Logo cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-file-video"></i>
                <p>Video ngắn thương hiệu.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-file-image"></i>
                <p>02 Banner cơ bản.</p>
              </div>
              <div className="content-line">
                <i className="fa-regular fa-address-card"></i>
                <p>Mẫu danh thiếp.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-cloud"></i>
                <p>02 tháng Server tại Việt Nam.</p>
              </div>
              <div className="content-line">
                <i className="fa-solid fa-headset"></i>
                <p>Hỗ trợ trong giờ hành chính.</p>
              </div>
            </div>
            <button><i className="fa-solid fa-phone"></i>Gọi ngay!</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionServices;
