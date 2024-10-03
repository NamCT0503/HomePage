import React, { useState } from 'react';
import style from "../blogs.module.css";
import { Link, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BlogAll from './blogs.all';
import BlogsWebsite from './blogs.website';
import BlogsMobile from './blogs.mobile';

const BreakingNews: React.FC = () => {
    const [currentBgAtAll, setCurrentBgAtAll] = useState('#C60000');
    const [currentTextAtAll, setCurrentTextAtAll] = useState('white');
    const [currentBgAtWeb, setCurrentBgAtWeb] = useState('white');
    const [currentTextAtWeb, setCurrentTextAtWeb] = useState('black');
    const [currentBgAtApp, setCurrentBgAtApp] = useState('white');
    const [currentTextAtApp, setCurrentTextAtApp] = useState('black');
    const [bgColorBlogAll, setBgColorBlogAll] = useState('#C60000');
    const [bgColorBlogWeb, setBgColorBlogWeb] = useState('white');
    const [bgColorBlogApp, setBgColorBlogApp] = useState('white');
    const [colorBlogAll, setColorBlogAll] = useState('white');
    const [colorBlogWeb, setColorBlogWeb] = useState('black');
    const [colorBlogApp, setColorBlogApp] = useState('black');

    const blogsCurrent = (blog: string) => {
        if(blog === 'all'){
            setBgColorBlogAll('#C60000');
            setBgColorBlogWeb('white');
            setBgColorBlogApp('white');
            setColorBlogAll('white');
            setColorBlogWeb('black');
            setColorBlogApp('black');
        } else if(blog === 'web'){
            setBgColorBlogAll('white');
            setBgColorBlogWeb('#C60000');
            setBgColorBlogApp('white');
            setColorBlogAll('black');
            setColorBlogWeb('white');
            setColorBlogApp('black');
        } else {
            setBgColorBlogAll('white');
            setBgColorBlogWeb('white');
            setBgColorBlogApp('#C60000');
            setColorBlogAll('black');
            setColorBlogWeb('black');
            setColorBlogApp('white');
        }
    }

    return (
        <>
        <Helmet>
            <style>{`
                body, html {
                    overflow-x: hidden;
                }
            `}</style>
        </Helmet>
        <section id='section-news' className={style.section}>
            <header className={style.header} id='header'>
                <div className={style.titleHeader}>
                    <h1>My Website</h1>
                </div>
            </header>
            <div className={style.wrapMenubarBlogs}>
                <nav className={style.menubar}>
                    <ul>
                        <Link 
                            to={'/blogs'} 
                            style={{
                                textDecoration: 'none',
                                backgroundColor: bgColorBlogAll,
                                color: colorBlogAll
                            }}
                            onClick={() => blogsCurrent('all')}
                        >
                            All
                        </Link>
                        <Link 
                            to={'website'} 
                            style={{
                                textDecoration: 'none',
                                backgroundColor: bgColorBlogWeb,
                                color: colorBlogWeb
                            }}
                            onClick={() => blogsCurrent('web')}
                        >
                            Website
                        </Link>
                        <Link 
                            to={'mobile'} 
                            style={{
                                textDecoration: 'none',
                                backgroundColor: bgColorBlogApp,
                                color: colorBlogApp
                            }}
                            onClick={() => blogsCurrent('app')}
                        >
                            Mobile
                        </Link>
                    </ul>
                </nav>
                <div className={style.containerSearch}>
                    <div className={style.inputSearch}>
                        <input type="text" name="" id="" placeholder='search' />
                    </div>
                    <div className={style.btnSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
            <div className={style.wrapContainerContentBlogs}>
                <div className={style.wrapContainerBlogs}>
                    <Routes>
                        <Route path='/' element={<BlogAll></BlogAll>}></Route>
                        <Route path='/website' element={<BlogsWebsite></BlogsWebsite>}></Route>
                        <Route path='/mobile' element={<BlogsMobile></BlogsMobile>}></Route>
                    </Routes>
                </div>
                <div className={style.wrapContainerRelatedBlogs}>
                    <div className={style.titleContainerRealted}>
                        <h3>Bài viết liên quan</h3>
                    </div>
                    <div className={style.containerContentRelatedBlog}>
                        <div className="wrapBlogsRelated">
                            <div className={style.areaHeaderBlogRelated}>
                                <div>Website</div>
                                <div>01-10-2024</div>
                            </div>
                            <div className={style.areaContentBlogRelated}>
                                <div>Announcing the Strategic Partnership between Stringee and CXsphere</div>
                            </div>
                        </div>
                        <div className="wrapBlogsRelated">
                            <div className={style.areaHeaderBlogRelated}>
                                <div>Website</div>
                                <div>02-10-2024</div>
                            </div>
                            <div className={style.areaContentBlogRelated}>
                                <div>Announcing the Strategic Partnership between Stringee and CXsphere</div>
                            </div>
                        </div>
                        <div className="wrapBlogsRelated">
                            <div className={style.areaHeaderBlogRelated}>
                                <div>Mobile</div>
                                <div>01-10-2024</div>
                            </div>
                            <div className={style.areaContentBlogRelated}>
                                <div>Announcing the Strategic Partnership between Stringee and CXsphere</div>
                            </div>
                        </div>
                        <div className="wrapBlogsRelated">
                            <div className={style.areaHeaderBlogRelated}>
                                <div>Mobile</div>
                                <div>02-10-2024</div>
                            </div>
                            <div className={style.areaContentBlogRelated}>
                                <div>Announcing the Strategic Partnership between Stringee and CXsphere</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.blogsPagination}>
                <img src="/blogs-pagination.svg" alt="" />
            </div>
        </section>
        </>
    );
};

export default BreakingNews;
