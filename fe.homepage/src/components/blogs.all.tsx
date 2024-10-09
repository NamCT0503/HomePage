import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import style from "../css.module/blogs.module.css"
import { dataSearchBlogs } from "./breaking.news";

export interface Blogs {
    blogs: any[]
}

const url_getBlogs = 'http://localhost:5000/api/homepage/service/blog/get-blogs/:filter/:page';
const url_getBlogOutstanding = `http://localhost:5000/api/homepage/service/blog/get-blogs/isOutstanding/:page`

const BlogAll = (props: Blogs) => {
    const navigate = useNavigate();
    const {blogs} = props;

    const [dataBlogs, setDataBlogs] = useState<any[]>([]);
    const [blogOutstanding, setBlogOutstanding] = useState<any>();

    const handleClickViewBlog = () => {
        navigate('post/view-blog');
    }

    useEffect(() => {
        fetcher(url_getBlogs, false);
        fetcher(url_getBlogOutstanding, true);
    }, []);

    const recordPage = dataBlogs[0]?.recordPage;
    const numberDiv = Math.ceil(recordPage / 3);

    const postedAtBlogOut = blogOutstanding?.rows[0].postedAt;

    const fetcher = async (url: string, isOutstanding: boolean) => {
        try {
            const res = await fetch(url, {
                method: 'GET'
            });
            const data = await res.json();
            if(isOutstanding){
                setBlogOutstanding(data);
            } else {
                setDataBlogs([data]);
            }
        } catch (error) {
            console.log('Fetch Error: ', error);
        }
    }

    const getDayPassed = (date: string) => {
        const posted_day = date?.split('T')[0];
        const lastPosted = Date.now() - new Date(posted_day).getTime();
        const dayPassed = Math.floor(lastPosted / (1000*60*60*24));
        return dayPassed;
    }

    const handleClickPreNextPage = (pre_next: string, data: any) => {
        try {
            let url = `http://localhost:5000/api/homepage/service/blog/get-blogs/:filter/`;
            const totalPage = data[0]?.totalPages;
            let pageCurrent = data[0]?.currentPage;
            if(pre_next === 'next'){
                if(pageCurrent < totalPage){
                    url = url+`${pageCurrent+=1}`;
                    fetcher(url, false);
                } else {
                    return alert('Đã đến số trang tối đa!');
                }
            }

            if(pre_next === 'pre'){
                if(pageCurrent > 1){
                    url = url+`${pageCurrent-=1}`;
                    fetcher(url, false);
                } else {
                    return alert('Đã đến trang đầu tiên!');
                }
            }
        } catch (error) {
            console.log('Pre-Next Error: ', error);
        }
    }

    return(
        <div className={style.wrapContainerBlogAll}>
            <div className={style.containerBlogOutstanding}>
                <img src={blogOutstanding?.rows[0].img} onClick={handleClickViewBlog} />
                <div className={style.contentOutStandingAll}>
                    <div className={style.headerOutstandingAll}>
                        {blogOutstanding?.rows[0].title}
                    </div>
                    <div className={style.postedAt}>
                        Đăng ngày: {postedAtBlogOut?.split('T')[0]}
                    </div>
                    <div className={style.description}>
                        {blogOutstanding?.rows[0].description}
                    </div>
                    <div className={style.footerBlog}>
                        <div className={style.tagBlog}>
                            <div className={style.tag}>
                                {blogOutstanding?.rows[0].tag}
                            </div>
                            <div>{getDayPassed(postedAtBlogOut) === 0? "Trong hôm nay": getDayPassed(postedAtBlogOut)+" ngày trước."}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.containerAllBlogs}>
                {blogs[0]?.blogs? Array.from({length: numberDiv}, (_, index) => (
                    <div className={style.containerGroup3Blogs}>
                        {blogs[0]?.blogs.slice(index * 3, index * 3 + 3)
                            .map((items: any) => {
                                const dayPassed = getDayPassed(items?.postedAt);
                            return(
                                <div className={style.wrapContainerAllBlog}>
                                    <img src={items.img} alt="" />
                                    <div className={style.containerBlog}>
                                        <div className={style.footerBlog}>
                                            <div className={style.tagBlog}>
                                                <div className={style.tag}>{items.tag}</div>
                                                <div>
                                                    {
                                                        dayPassed === 0?
                                                        "Trong hôm nay": 
                                                        dayPassed+" ngày trước"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.headerBlog}>
                                            {items?.title}
                                        </div>
                                        <div className={style.postedAt}>
                                            Đăng ngày: {items?.postedAt.split('T')[0]}.
                                        </div>
                                        <div className={style.description}>
                                            {items?.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )): Array.from({length: numberDiv}, (_, index) => (
                    <div className={style.containerGroup3Blogs}>
                        {dataBlogs[0]?.blogs.slice(index * 3, index * 3 + 3)
                            .map((items: any) => {
                                const dayPassed = getDayPassed(items?.postedAt);
                            return(
                                <div className={style.wrapContainerAllBlog}>
                                    <img src={items.img} alt="" />
                                    <div className={style.containerBlog}>
                                        <div className={style.footerBlog}>
                                            <div className={style.tagBlog}>
                                                <div className={style.tag}>{items.tag}</div>
                                                <div>
                                                    {
                                                        dayPassed === 0?
                                                        "Trong hôm nay": 
                                                        dayPassed+" ngày trước"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.headerBlog}>
                                            {items?.title}
                                        </div>
                                        <div className={style.postedAt}>
                                            Đăng ngày: {items?.postedAt.split('T')[0]}.
                                        </div>
                                        <div className={style.description}>
                                            {items?.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className={style.containerPrevNext}>
                <i 
                    className="fa-solid fa-chevron-left"
                    onClick={() => handleClickPreNextPage('pre', dataBlogs)}    
                ></i>
                <div className={style.pageCurrent}>
                    {dataBlogs[0]?.currentPage}
                </div>
                <i 
                    className="fa-solid fa-chevron-right"
                    onClick={() => handleClickPreNextPage('next', dataBlogs)}    
                ></i>
            </div>
        </div>
    )
}

export default BlogAll;