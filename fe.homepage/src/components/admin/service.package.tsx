import style from "../../css.module/admin/service.package.module.css";
import parent from "../../css.module/admin/service.web.module.css"
import SerAppListView from "./serapp.listview";
import SerWebListView from "./serweb.list.view";
import { useNavigate } from "react-router-dom";

interface SerPackageEntity {
    data: any[]
}

const ServicePackage = (props: SerPackageEntity) => {
    const navigate = useNavigate();

    const {data} = props;
    if(!Array.isArray(data))
        return(
            <div>Tạm không có dữ liệu</div>
        )

    const handleNavigate = (to: string, data?: any) => {
        navigate(to, { state: data});
    }

    return(
        <>
        <div className={parent.wrapContainerLayoutMain}>
            <div className={parent.wrapContainerTitlePage}>
                <div className={parent.leftContentTitlePage}>
                    <div className={parent.iconTitlePage}>
                        {
                            data[0]?.price? 
                            <i className="fa-solid fa-window-maximize"></i>:
                            <i className="fa-solid fa-mobile"></i>
                        }
                    </div>
                    <div className={parent.contentTitlePage}>
                        <span className={parent.titlePage}>
                            {data[0]?.price? 'Website': 'Mobile'}
                        </span>
                        <span>
                            Trang quản lý dịch vụ {
                                data[0]?.price? 'website': 'mobile'
                            }
                        </span>
                    </div>
                </div>
                <div className={parent.rightContentTitlePage}>
                    <i 
                        className="fa-solid fa-briefcase"
                        onClick={() => handleNavigate('../service')}
                    >
                    </i>
                    <span 
                        className={parent.service}
                        onClick={() => handleNavigate('../service')}
                    >
                        Dịch vụ
                    </span>
                    <span>
                        {data[0]?.price? 'Website': 'Mobile'}
                    </span>
                </div>
            </div>
            <div className={style.wrapContainerLayoutContent}>
                {data[0]?.price? <SerWebListView data={data}></SerWebListView>: <SerAppListView data={data}></SerAppListView>}
            </div>
        </div>
        </>
    )
}

export default ServicePackage;