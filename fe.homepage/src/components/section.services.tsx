import React from 'react';

const SectionServices: React.FC = () => {
  console.log(process.env.IMG_OVERVIEW)
  return (
    <section id="section-services" className="section">
      <div className="heading-section-service">
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
    </section>
  );
};

export default SectionServices;
