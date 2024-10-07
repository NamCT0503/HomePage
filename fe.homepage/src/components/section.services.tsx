import React, { useEffect, useState } from 'react';

// const url = 'http://localhost:5000/api/homepage/service/web/get-content';
const urlWeb = `http://localhost:5000/api/homepage/service/web/get-content/:id/${'ref'}`;
const urlApp = `http://localhost:5000/api/homepage/service/app/get-content/:id/${'ref'}`;

const SectionServices: React.FC = () => {
  const [opacityHeading, setOpacityHeading] = useState(0);
  const [transXWrapOverContent, setTransXWrapOverContent] = useState('translateX(-100%)');
  const [opacityWrapPackagesWeb, setOpacityWrapPackagesWeb] = useState(0);
  const [opacityWrapPackagesApp, setOpacityPackagesApp] = useState(0);
  const [dataSerWeb, setDataSerWeb] = useState<any[]>();
  const [filterDataWeb, setFilterDateWeb] = useState<any[]>();
  const [dataSerApp, setDataSerApp] = useState<any[]>();
  const [filterDataApp, setFilterDateApp] = useState<any[]>();

  useEffect(() => {
    fetcher(urlWeb, true);
    fetcher(urlApp, false);
  }, []);

  useEffect(() => {
    const widthScreen = window.innerWidth;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if(widthScreen > 739){
            if(scrollY > 1550){
              setOpacityHeading(1);
              setTransXWrapOverContent('translateX(0)');
            }
            if(scrollY > 2360) setOpacityWrapPackagesWeb(1);
            if(scrollY > 3320) setOpacityPackagesApp(1);
        } 
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
  }, [0, window.location.reload]);

  const fetcher = async (url: string, type: boolean) => {
    try {
      const res = await fetch(url, {
        method: "GET"
      });
      const data = await res.json();
      
      // const filData = await data?.filter((items: any, index: any, self: any) => 
      //   index === self?.findIndex((filter: any) => filter.serweb_id === items.serweb_id)
      // ); 

      if(type){
        const filData = await data?.filter((items: any, index: any, self: any) => 
          index === self?.findIndex((filter: any) => filter.serweb_id === items.serweb_id)
        ); 
        console.log('true')
        setDataSerWeb(data);
        setFilterDateWeb(filData);
      } else {
        const filData = await data?.filter((items: any, index: any, self: any) => 
          index === self?.findIndex((filter: any) => filter.serapp_id === items.serapp_id)
        ); 
        console.log('false')
        setDataSerApp(data);
        setFilterDateApp(filData);
      }
    } catch (error) {
      console.log('Fetch Error: ', error);
    }
  }

  console.log('dtapp: ', dataSerApp);
  console.log('filapp: ', filterDataApp);
  return (
    <section id="section-services" className="section">
      <div 
        className="heading-section"
        style={{
          opacity: opacityHeading
        }}
      >
        <p>Dịch vụ của chúng tôi</p>
      </div>
      <div 
        className="wrap-container-overview-content"
        style={{
          transform: transXWrapOverContent
        }}
      >
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
      <div 
        className="wrap-container-service-package" 
        id='price-web'
        style={{
          opacity: opacityWrapPackagesWeb
        }}
      >
        <div className="content-package-web-service">
          <h2>GÓI DỊCH VỤ WEBSITE</h2>
          <p>Công nghệ web hàng đầu - Tiết kiệm chi phí - Bàn giao web nhanh chóng</p>
          <div className="wrap-packages-web">
            {filterDataWeb?.map(items => {
              let subClass: string = '';
              const content = dataSerWeb?.filter((data) => data.serweb_id === items.serweb_id).map((data) => data.content);

              if(items.title?.includes('CƠ BẢN')) subClass = 'basic';
              if(items.title?.includes('SEO')) subClass = 'seo'
              if(items.title?.includes('BÁN HÀNG')) subClass = 'sup-sale'
              if(items.title?.includes('CHUYÊN NGHIỆP')) subClass = 'pro'

              return(
                <div className={`package-web ${subClass}`}>
                  <p className="prices-web">{items.price}</p>
                  <p className="types-web">{items.title}</p>
                  <div className="type-package-web">TRỌN GÓI</div>
                  <div className="content-package-web">
                    {content?.map(conts => {
                      return(
                        <div className="content-in-package-web">
                          <p>{conts}</p>
                        </div>
                      )
                    })}
                  </div>
                  <input type="button" value="Đăng ký" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <img 
        src="/services-separate-page.png" 
        alt=""
        style={{
          opacity: opacityWrapPackagesApp,
          transition: 'all 0.5s ease-in-out'
        }}
      />
      <div 
        className="wrap-container-service-package app" 
        id='price-app'
        style={{
          opacity: opacityWrapPackagesApp
        }}
      >
        <div className="content-package-app-services">
          <h2>GÓI DỊCH VỤ APP</h2>
          <p>Giá thành ưu đãi - Chất lượng ưu việt</p>
        </div>
        <div className="wrap-container-packages-app-service">
          {filterDataApp?.map(items => {
            let subClass = '';
            const content = dataSerApp?.filter(data => data.serapp_id === items.serapp_id)
            .map(data => ({
              icon: data.icon,
              content: data.content
            }));

            if(items.type === 'Personal') subClass = 'personal';
            if(items.type === 'Professional') subClass = 'professional';
            if(items.type === 'Business') subClass = 'business';
            return(
              <div className={`container-packages-app-services ${subClass}`}>
                <span>{items.type}</span>
                <div className="contact-services-app">
                  <h1>{items.title}</h1>
                  <h3>{items.subtitle}</h3>
                </div>
                <div className="content-package-app">
                  {content?.map(items => {
                    return(
                      <div className="content-line">
                        <i className={`${items.icon}`}></i>
                        <p>{items.content}</p>
                      </div>
                    )
                  })}
                </div>
                <button><i className="fa-solid fa-phone"></i>Gọi ngay!</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionServices;
