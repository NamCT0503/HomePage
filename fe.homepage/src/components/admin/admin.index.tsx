import { Helmet } from "react-helmet";
import style from "../../css.module/admin/index.module.css";

const AdminIndex = () => {
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
            1
            </div>
            <div className={style.wrapNavbarHeader}>
                2
            </div>
            <div className={style.wrapContainerContent}>
                3
                <div className={style.test}>

                </div>
            </div>
        </div>
        </>
    )
}

export default AdminIndex;