import React from "react";
import { useNavigate } from 'react-router-dom';
import style from "../css.module/blogs.module.css"

const BlogAll: React.FC = () => {
    const navigate = useNavigate();

    const handleClickViewBlog = () => {
        navigate('post/view-blog');
    }

    return(
        <div className={style.wrapContainerBlogAll}>
            <div className={style.containerBlogOutstanding}>
                <img src="/blog-all-outstanding.png" onClick={handleClickViewBlog}/>
                <div className={style.contentOutStandingAll}>
                    <div className={style.headerOutstandingAll}>
                        Weekly Articles with Insight — Our blog at 
                        Newbreak Church is where you get weekly 
                        insight into the weekend's message. Find 
                        guidance on love, sex, dating, and all 
                        your relationships. 
                        Even marriage! Ocean Beach.
                    </div>
                    <div className={style.postedAt}>
                        Đăng ngày: 01-10-2024.
                    </div>
                    <div className={style.description}>
                        Here is description.
                    </div>
                    <div className={style.footerBlog}>
                        <div className={style.tagBlog}>
                            <div className={style.tag}>Business</div>
                            <div>1 day ago</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.containerAllBlogs}>
                <div className={style.containerGroup3Blogs}>
                    <div className={style.wrapContainerAllBlog}>
                        <img src="/blog1.png" alt="" />
                        <div className={style.containerBlog}>
                            <div className={style.footerBlog}>
                                <div className={style.tagBlog}>
                                    <div className={style.tag}>Business</div>
                                    <div>1 day ago</div>
                                </div>
                            </div>
                            <div className={style.headerBlog}>
                                Here is header blog
                            </div>
                            <div className={style.postedAt}>
                                Đăng ngày: 01-10-2024.
                            </div>
                            <div className={style.description}>
                                Here is description.
                            </div>
                        </div>
                    </div>
                    <div className={style.wrapContainerAllBlog}>
                        <img src="/blog2.jpg" alt="" />
                        <div className={style.containerBlog}>
                            <div className={style.footerBlog}>
                                <div className={style.tagBlog}>
                                    <div className={style.tag}>Business</div>
                                    <div>1 day ago</div>
                                </div>
                            </div>
                            <div className={style.headerBlog}>
                                Here is header blog2
                            </div>
                            <div className={style.postedAt}>
                                Đăng ngày: 01-10-2024.
                            </div>
                            <div className={style.description}>
                                Here is description.
                            </div>
                        </div>
                    </div>
                    <div className={style.wrapContainerAllBlog}>
                        <img src="/blog3.jpg" alt="" />
                        <div className={style.containerBlog}>
                            <div className={style.footerBlog}>
                                <div className={style.tagBlog}>
                                    <div className={style.tag}>Business</div>
                                    <div>1 day ago</div>
                                </div>
                            </div>
                            <div className={style.headerBlog}>
                                Here is header blog3
                            </div>
                            <div className={style.postedAt}>
                                Đăng ngày: 01-10-2024.
                            </div>
                            <div className={style.description}>
                                Here is description.
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.containerGroup3Blogs}>
                    <div className={style.wrapContainerAllBlog}>
                        <img src="/blog1.png" alt="" />
                        <div className={style.containerBlog}>
                            <div className={style.footerBlog}>
                                <div className={style.tagBlog}>
                                    <div className={style.tag}>Business</div>
                                    <div>1 day ago</div>
                                </div>
                            </div>
                            <div className={style.headerBlog}>
                                Here is header blog
                            </div>
                            <div className={style.postedAt}>
                                Đăng ngày: 01-10-2024.
                            </div>
                            <div className={style.description}>
                                Here is description.
                            </div>
                        </div>
                    </div>
                    <div className={style.wrapContainerAllBlog}>
                        <img src="/blog2.jpg" alt="" />
                        <div className={style.containerBlog}>
                            <div className={style.footerBlog}>
                                <div className={style.tagBlog}>
                                    <div className={style.tag}>Business</div>
                                    <div>1 day ago</div>
                                </div>
                            </div>
                            <div className={style.headerBlog}>
                                Here is header blog2
                            </div>
                            <div className={style.postedAt}>
                                Đăng ngày: 01-10-2024.
                            </div>
                            <div className={style.description}>
                                Here is description.
                            </div>
                        </div>
                    </div>
                    <div className={style.wrapContainerAllBlog}>
                        <img src="/blog3.jpg" alt="" />
                        <div className={style.containerBlog}>
                            <div className={style.footerBlog}>
                                <div className={style.tagBlog}>
                                    <div className={style.tag}>Business</div>
                                    <div>1 day ago</div>
                                </div>
                            </div>
                            <div className={style.headerBlog}>
                                Here is header blog3
                            </div>
                            <div className={style.postedAt}>
                                Đăng ngày: 01-10-2024.
                            </div>
                            <div className={style.description}>
                                Here is description.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.containerPrevNext}>
                <i className="fa-solid fa-chevron-left"></i>
                <div className={style.pageCurrent}>1</div>
                <i className="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    )
}

export default BlogAll;