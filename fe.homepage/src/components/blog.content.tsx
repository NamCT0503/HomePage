// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import style from "../css.module/blog.content.module.css";
import parent from "../css.module/blogs.module.css";
import { useEffect, useState } from 'react';

const BlogContent = () => {
    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', viewCurrentClient);

        return () => window.removeEventListener('scroll', viewCurrentClient);
    }, []);

    const viewCurrentClient = () => {
        const container = document.querySelector(`.${style.containerContentBC}`);
        const areaTable = document.querySelector(`.${style.areaTableOfContent}`);
        
        if(container && areaTable){
            const containerBottom = container.getBoundingClientRect().bottom;
            const areaTableHeight = areaTable.getBoundingClientRect().height;
            const viewportHeight = window.innerHeight;

            if (containerBottom <= areaTableHeight + viewportHeight) {
                setIsSticky(false);
            } else {
                setIsSticky(true);
            }
        }
    }

    return(
        <>
        {/* <Helmet>
            <style>{`
                body, html {
                    overflow-x: hidden;
                }
            `}</style>
        </Helmet> */}
        <HelmetProvider>
        <Helmet>
            <style>{`
                body, html {
                    overflow-x: hidden;
                }
            `}</style>
        </Helmet>
        </HelmetProvider>
        <div className={style.wrapContainerBlogContent}>
            <header className={parent.header} id='header'>
                <Link 
                    to={'/'} 
                    style={{
                        textDecoration: 'none',
                        color: 'white'
                    }}
                >
                    <div className={parent.titleHeader}>
                        <h1>My Website</h1>
                    </div>
                </Link>
                <div className={parent.containerBtnSignupSignin}>
                    <div className={parent.btnSignup}>
                        Đăng ký
                    </div>
                    <div className={parent.btnSignin}>
                        Đăng nhập
                    </div>
                </div>
            </header>
            <div className={style.wrapContainerContentBC}>
                <div className={style.navbarTittleBC}>
                    <div className={style.pathNavbar}>Home</div>
                    <div className={style.pathNavbar}>Website</div>
                    <div className={style.titleBC}>
                        Weekly Articles with Insight
                    </div>
                </div>
                <div className={style.containerBlogOverview}>
                    <div className={style.contentBC}>
                        <div className={parent.tagBlog}>
                            <div className={parent.tag}>Business</div>
                        </div>
                        <div className={style.headerBC}>
                            Weekly Articles with Insight
                        </div>
                        <div className={style.containerTagBC}>
                            <div>NamCT</div>
                            <div>01-10-2024</div>
                        </div>
                    </div>
                    <img src="/blog-all-outstanding.png" alt="" />
                </div>
                <div className={style.containerContentBC}>
                    <div className={style.areaShowContentBC}>
                        <div className={style.textNormalBC}>
                            Today, we are thrilled to announce 
                            a significant milestone in the field 
                            of information and communication technology: 
                            the strategic partnership between Stringee and 
                            CXsphere. This collaboration not only opens up 
                            numerous new opportunities but also solidifies 
                            the positions of both companies in providing 
                            the most comprehensive and advanced solutions 
                            to our clients.
                        </div>
                        <div className={style.textHeaderBC}>
                            Introduction to the Partners
                        </div>
                        <div className={style.imgInContentBC}>
                            <img src="/blog4.jpg" alt="" />
                        </div>
                        <div className={style.textNormalBC}>
                        Stringee is one of the leading providers of communication API platforms in Vietnam. By integrating calling, messaging, and video services into businesses' applications and websites, Stringee has empowered thousands of enterprises to enhance their customer interaction efficiency. <br />
Besides, we have StringeeX, an all-in-one communication solution that seamlessly integrates voice, messaging, and video capabilities into your applications and websites. <br />
CXsphere specializes in delivering comprehensive customer experience (CX) solutions. Utilizing cutting-edge technologies such as artificial intelligence (AI) and data analytics, CXsphere helps businesses gain deeper insights into their customers' needs and behaviors, thereby enabling them to offer more personalized and effective customer service.
                        </div>
                        <div className={style.textHeaderBC}>
                            Goals and Vision of the Partnership
                        </div>
                        <div className={style.textNormalBC}>
                        Businesses partnering with Stringee and CXsphere will experience numerous benefits, including:
Unified Communication Platform: A single, integrated platform for all communication needs, reducing complexity and improving efficiency.
Advanced Analytics: Access to powerful analytics tools that provide actionable insights into customer interactions and feedback.
Enhanced Scalability: Solutions that can grow with the business, ensuring that communication and customer experience capabilities remain robust as the company expands.
Increased Competitive Edge: By offering superior customer service and communication capabilities, businesses can stand out in a crowded market.
                        </div>
                    </div>
                    <div className={style.areaTableOfContent} style={{ position: isSticky ? 'sticky' : 'relative' }}>
                        <div className={style.headerToC}>
                            <h3>Nội dung bài đăng</h3>
                            <i className="fa-solid fa-chevron-up"></i>
                        </div>
                        <div className={style.tableOfContent}>
                            <div className={style.indexToC}>Introduction to the Partners</div>
                            <div className={style.indexToC}>Goals and Vision of the Partnership</div>
                            <div className={style.indexToC}>Introduction to the Partners</div>
                            <div className={style.indexToC}>Introduction to the Partners</div>
                        </div>
                    </div>
                </div>
                <div className={style.wrapContainerOrtherBlogsBC}>
                    <h3>Bài viết khác</h3>
                    <div className={style.containerOrtherBlogsBC}>
                        <i className="fa-solid fa-chevron-left"></i>
                        <div className={`${parent.containerGroup3Blogs} ${style.containerBlogsBC}`}>
                            <div className={parent.wrapContainerAllBlog}>
                                <img src="/blog1.png" alt="" />
                                <div className={parent.containerBlog}>
                                    <div className={parent.footerBlog}>
                                        <div className={parent.tagBlog}>
                                            <div className={parent.tag}>Business</div>
                                            <div>1 day ago</div>
                                        </div>
                                    </div>
                                    <div className={parent.headerBlog}>
                                        Here is header blog
                                    </div>
                                    <div className={parent.postedAt}>
                                        Đăng ngày: 01-10-2024.
                                    </div>
                                    <div className={parent.description}>
                                        Here is description.
                                    </div>
                                </div>
                            </div>
                            <div className={parent.wrapContainerAllBlog}>
                                <img src="/blog2.jpg" alt="" />
                                <div className={parent.containerBlog}>
                                    <div className={parent.footerBlog}>
                                        <div className={parent.tagBlog}>
                                            <div className={parent.tag}>Business</div>
                                            <div>1 day ago</div>
                                        </div>
                                    </div>
                                    <div className={parent.headerBlog}>
                                        Here is header blog2
                                    </div>
                                    <div className={parent.postedAt}>
                                        Đăng ngày: 01-10-2024.
                                    </div>
                                    <div className={parent.description}>
                                        Here is description.
                                    </div>
                                </div>
                            </div>
                            <div className={parent.wrapContainerAllBlog}>
                                <img src="/blog3.jpg" alt="" />
                                <div className={parent.containerBlog}>
                                    <div className={parent.footerBlog}>
                                        <div className={parent.tagBlog}>
                                            <div className={parent.tag}>Business</div>
                                            <div>1 day ago</div>
                                        </div>
                                    </div>
                                    <div className={parent.headerBlog}>
                                        Here is header blog3
                                    </div>
                                    <div className={parent.postedAt}>
                                        Đăng ngày: 01-10-2024.
                                    </div>
                                    <div className={parent.description}>
                                        Here is description.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BlogContent;