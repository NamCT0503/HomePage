import serOverview from "../../css.module/admin/service.web.module.css";
import serPackage from "../../css.module/admin/service.package.module.css";
import style from "../../css.module/admin/blogs.managenment.module.css";
import { useEffect, useState } from "react";
import BlogListView from "./blogs.list.view";
import { useNavigate } from "react-router-dom";

const AdminBlogs = () => {
    const [dataBlogOutstanding, setDataBlogOutstanding] = useState<any>([]);
    const [dataBlogs, setDataBlogs] = useState<any>([]);
    const [blogs, setBlogs] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);
    

    const fetchData = async () => {
        const url_getAllBlog = 'http://localhost:5000/api/homepage/service/blog/get-blogs/:filter/:page';
        const url_getBlogOutstanding = 'http://localhost:5000/api/homepage/service/blog/get-blogs/isOutstanding/:page';
        try {
            const res = await fetch(url_getAllBlog, {
                method: "GET"
            });
            const resData = await res.json();
            setBlogs({
                totalItems: resData.totalItems,
                totalPages: resData.totalPages,
                currentPage: resData.currentPage,
                recordPage: resData.recordPage
            })
            setDataBlogs(resData.blogs);
            
            const resOutstanding = await fetch(url_getBlogOutstanding, {
                method: "GET"
            });
            const resOutData = await resOutstanding.json();
            setDataBlogOutstanding(resOutData.rows);

            return resData;
        } catch (error) {
            console.log('Fetch Error: ', error);
        }
    }

    const handleClickBtnCreate = () => {
        navigate('content');
    }

    return(
        <div className={serOverview.wrapContainerLayoutMain}>
            <div className={serOverview.wrapContainerTitlePage}>
                <div className={serOverview.leftContentTitlePage}>
                    <div className={serOverview.iconTitlePage}>
                        <i className="fa-solid fa-blog"></i>
                    </div>
                    <div className={serOverview.contentTitlePage}>
                        <span className={serOverview.titlePage}>Bài đăng</span>
                        <span>Trang quản lý bài đăng</span>
                    </div>
                </div>
                <div className={serOverview.rightContentTitlePage}>
                    <i className="fa-solid fa-blog"></i>
                    <span>Bài đăng</span>
                </div>
            </div>
            <div className={`${serPackage.areaCreate} ${style.createBlog}`}>
                <button 
                    className={style.btnCreate}
                    onClick={handleClickBtnCreate}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div className={`${style.wrapContainerLayoutContent} ${serOverview.blogListView}`}>
                {<BlogListView data={[...dataBlogOutstanding, ...dataBlogs]}></BlogListView>}
                <div className={style.wrapContainerNavigation}>
                    <i className="fa-solid fa-backward"></i>
                    <i className="fa-solid fa-caret-left"></i>
                    <div className={style.pageCurrnent}>
                        <span>{blogs?.currentPage} / {blogs?.totalPages}</span>
                    </div>
                    <i className="fa-solid fa-caret-right"></i>
                    <i className="fa-solid fa-forward"></i> 
                </div>
            </div>
        </div>
    )
}

export default AdminBlogs;