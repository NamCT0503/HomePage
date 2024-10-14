import { Helmet } from "react-helmet";
import style from "../../css.module/admin/index.module.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ServiceOverview from "./service.overview";
import ServicePackage from "./service.package";
import ContentPackage from "./content.package";

const url_getSerWeb = 'http://localhost:5000/api/homepage/service/web/getall';
const url_getSerApp = 'http://localhost:5000/api/homepage/service/app/get-all';

const AdminIndex = () => {
    const [transXIconSearch, setTransXIconSearch] = useState('translateX(0)');
    const [widthInputSearch, setWidthInputSearch] = useState('0px');
    const [stateIconSearch, setStateIconSearch] = useState(true);
    const [dataSerWeb, setDataSerWeb] = useState<any>([]);
    const [dataSerApp, setDataSerApp] = useState<any>([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchData(url_getSerWeb, 'web');
        fetchData(url_getSerApp, 'app');
    }, []);

    const handleClickShowHideSearch = (iconName: string) => {
        if(iconName === 'close' || (iconName === 'search' && stateIconSearch)){
            setTransXIconSearch(trans => trans === 'translateX(600%)'? 'translateX(0)': 'translateX(600%)');
            setWidthInputSearch(width => width === '80%'? '0px': '80%');
            setStateIconSearch(state => state === true? false: true);
        }
        return undefined;
    }

    const handleNavigateMenubar = (to: string) => {
        navigate(to);
    }

    const fetchData = async (url: string, type: string) => {
        try {
            const res = await fetch(url, {
                method: 'GET'
            });
            const data = await res.json();

            if(type === 'web') setDataSerWeb(data);
            if(type === 'app') setDataSerApp(data);
        } catch (error) {
            console.log('Fetch Error: ', error);
        }
    }

    return(
        <>
        <Helmet>
            <style>{`
                body, html {
                    overflow: hidden; 
                }
            `}</style>
        </Helmet>
        <div className={style.wrapContainerIndexPage}>
            <div className={style.wrapContainerMenubar}>
                <img src="/favicon.ico" alt="" onClick={() => handleNavigateMenubar('/admin/index')} />
                <div className={style.containerMenubar}>
                    <h4>Danh mục quản lý</h4>
                    <div 
                        className={
                        `${style.itemMenubar} ${location.pathname.includes('index')? style.currentPage: ''}`
                        }
                        onClick={() => handleNavigateMenubar('index')}
                    >
                        <i className="fa-solid fa-house"></i>
                        <span>Tổng quan</span>
                    </div>
                    <div 
                        className={
                            `${style.itemMenubar} ${location.pathname.includes('/admin/service')? style.currentPage: ''}`
                        }
                        onClick={() => handleNavigateMenubar('service')}
                    >
                        <i className="fa-solid fa-briefcase"></i>
                        <span>Dịch vụ</span>
                    </div>
                    <div 
                        className={
                            `${style.itemMenubar} ${location.pathname.includes('/admin/blogs/')? style.currentPage: ''}`
                        }
                    >
                        <i className="fa-solid fa-blog"></i>
                        <span>Bài đăng</span>
                        <div className={style.notifyBlogs}>
                            9+
                        </div>
                    </div>
                    <div 
                        className={
                            `${style.itemMenubar} ${location.pathname.includes('/admin/account/')? style.currentPage: ''}`
                        }
                    >
                        <i className="fa-solid fa-user-tie"></i>
                        <span>Tài khoản</span>
                    </div>
                </div>
            </div>
            <div className={style.wrapNavbarHeader}>
                <div className={style.containerSearchArea}>
                    <i 
                        id={style.iconSearch} 
                        className="fa-solid fa-magnifying-glass"
                        style={{
                            transform: transXIconSearch
                        }}
                        onClick={() => (handleClickShowHideSearch('search')? handleClickShowHideSearch('search'): console.log(1))}
                    ></i>
                    <i 
                        id={style.iconCloseSearch} 
                        className="fa-solid fa-xmark"
                        onClick={() => handleClickShowHideSearch('close')}
                    ></i>
                    <input 
                        type="text" 
                        placeholder="Nhập để tìm kiếm"
                        style={{
                            width: widthInputSearch
                        }}
                    />
                </div>
                <div className={style.containerProfileArea}>
                    <div className={style.notifyPersional}>
                        <i className="fa-regular fa-bell"></i>
                        <span>5</span>
                    </div>
                    <div className={style.chatPersional}>
                        <i className="fa-regular fa-comments"></i>
                        <span>3</span>
                    </div>
                    <div className={style.areaProfile}>
                        <img src="/about-founder-img1.webp" alt="" />
                        <span>John Wick</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div className={style.wrapContainerContent}>
                <Routes>
                    <Route path="service" element={<ServiceOverview></ServiceOverview>}></Route>
                    <Route path="service/website" element={<ServicePackage data={dataSerWeb}></ServicePackage>}></Route>
                    <Route path="service/website/*" element={<ContentPackage></ContentPackage>}></Route>
                    <Route path="service/mobile" element={<ServicePackage data={dataSerApp}></ServicePackage>}></Route>
                    <Route path="service/mobile/*" element={<ContentPackage></ContentPackage>}></Route>
                    <Route path="admin/blogs" element={<AdminIndex></AdminIndex>}></Route>
                </Routes>
            </div>
        </div>
        </>
    )
}

export default AdminIndex;