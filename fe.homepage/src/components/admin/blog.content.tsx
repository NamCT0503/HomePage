/* eslint-disable */

import React, { useRef, useState } from "react";
import style from "../../css.module/admin/blog.content.module.css";
import Cookies from "js-cookie";

let idRecord: number = 0;

const BlogContent = () => {
    const accessToken = Cookies.get('accessToken');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dataBlogCover, setDataBlogCover] = useState({
        img: '' as any,
        title: '',
        description: '',
        tag: 'website',
        isOutstanding: false
    });
    const [dataTextInput, setDataTextInput] = useState();
    const [selectedFiles, setSelectedFiles] = useState<{imgid: number, img: File}[]>([]);
    const [idRecordRes, setIdRecordRes] = useState();
    const [alertCrBC, setAlertCrBC] = useState(true);

    const handleClickDivImg = () => {
        fileInputRef.current?.click();
    };

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setDataBlogCover({
            ...dataBlogCover,
            [e.target.name]: e.target.value
        })
    };

    const handleChooseTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDataBlogCover({
            ...dataBlogCover,
            tag: e.target.value
        });
    };

    const handleClickSave = async () => {
        const formData = new FormData();
        
        if(dataBlogCover.title === '' || dataBlogCover.description === '')
            return alert('Vui lòng điền tiêu đề và mô tả cho trang bìa!');

        try {
            formData.append('img', dataBlogCover.img);
            formData.append('title', dataBlogCover.title);
            formData.append('description', dataBlogCover.description);
            formData.append('tag', dataBlogCover.tag);
            formData.append('isOutstanding', String(dataBlogCover.isOutstanding));

            const url = 'http://localhost:5000/api/homepage/service/blog/create';
            const res = await fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            const dataRes = await res.json();
            console.log('res create: ', dataRes)
            setIdRecordRes(dataRes.idRecord.id);
            return alert(dataRes.message);
        } catch (error) {
            console.log('Create Error: ', error);
        }
    }

    
    const handleAddChildElement  = (type: string) => {
        const node: any = document.querySelector(`.${style.areaContentBlog}`);
        let childElement :any = document.createElement('div');; 
        childElement.id = `${type}_${idRecord+=1}`;
        childElement.contentEditable = 'true';

        if(type === 'image'){
            childElement.className = style.childDivImg;

            const inputFile = document.createElement('input');
            inputFile.type = 'file';
            
            const img = document.createElement('img');
            img.className = style.childImg;
            img.src = '';

            inputFile.onchange = (event: any) => {
                const file = event.target.files[0];
                if (file) {
                    img.src = URL.createObjectURL(file);
                    setSelectedFiles((prevFiles) => {
                        const existingFile = prevFiles.find(item => item.imgid === childElement.id);
                        if (existingFile) {
                            return prevFiles.map(item =>
                                item.imgid===childElement.id? { ...item, img: file }: item
                            );
                        } else {
                            return [...prevFiles, { imgid: childElement.id, img: file }];
                        }
                    });
                }
            };

            childElement.appendChild(img);
            childElement.appendChild(inputFile);
        } else {
            if(type === 'text' || type === 'textul' || type === 'textol'){
                childElement.className = style.childElementText;
            }
            if(type === 'heading'){
                childElement.className = style.childElementHeading;
            }
        }

        childElement.style.margin = '5px 0 5px 0'
        node?.appendChild(childElement);
        delElement(childElement.id)
    }

    const getChildElementIds = () => {
        const parentNode: any = document.querySelector(`.${style.areaContentBlog}`);
        const childElements = parentNode?.querySelectorAll('div');
        const ids = Array.from(childElements).map((element: any) => element.id);
        return ids;
    };

    const getContentById = (id: string) => {
        const divElement = document.getElementById(id);
        if (divElement) {
            if(id.includes('image')){
                return divElement.innerText;
            }
            return{
                id: id,
                text: divElement.innerText
            };
        } else {
            console.log('Div with specified ID not found.');
            return '';
        }
    };

    const handleClickCreateContentBlog = () => {
        try {
            if(!idRecordRes) return alert('Bài đăng chưa tồn tại để tạo nội dung!');
            const listId: any[] = getChildElementIds();
            listId.map(items => {
                const dataById = getContentById(items);
                dataById? 
                postContent(idRecordRes!, dataById, true): 
                postContent(idRecordRes!, 
                    selectedFiles.filter(item => item.imgid===items),
                    true
                )
            })

            if(alertCrBC) return alert('Created Successfully!');
            return alert('Creted Fail!');
        } catch (error) {
            console.log('Create Error: ', error);
        }
    }

    const delElement = (id: string) => {
        const element = document.getElementById(`${id}`);
        if (!element) return alert('Lỗi DOM!');
    
        let timeout: any = null; 

        element.onmousedown = () => {
            element.style.opacity = '0.5';
            element.dataset.isHolding = 'true';
            timeout = setTimeout(() => {
                if (element.dataset.isHolding === 'true') {
                    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa phần tử này không?");
                    if (isConfirmed) {
                        element.remove(); 
                    } else {
                        element.style.opacity = '1'; 
                    }
                }
                delete element.dataset.isHolding; 
            }, 2000);
        };
    
        element.onmouseup = () => {
            clearTimeout(timeout!)
            element.style.opacity = '1'; 
        };
    };

    const postContent = async (id: string | number, data: any, createOrUp: boolean) => {
        const url_create = 'http://localhost:5000/api/homepage/service/blog/content/create';
        const url_update = 'http://localhost:5000/api/homepage/service/blog/content/update';

        const formData = new FormData();

        try {
            let res: any;
            if(id){
                if(createOrUp){
                    formData.append('blogid', id.toString());
                    formData.append('stt', 
                        data?.id? data?.id.split('_')[1]: 
                        data[0]?.imgid.split('_')[1]
                    );
                    formData.append('type_content', 
                        data?.id? data?.id.split('_')[0]: 
                        data[0]?.imgid.split('_')[0]
                    );
                    formData.append('content', 
                        data?.text? data.text: data[0]?.img
                    );

                    res = await fetch(url_create, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });

                    const dataRes = await res.json();
                    return dataRes.status===200? setAlertCrBC(true): setAlertCrBC(false);
                } else {
                    formData.append('id', id.toString());
                    formData.append('type_content', data.type_content);
                    formData.append('content', data.content);

                    res = await fetch(url_update, {
                        method: 'PUT',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });

                    const dataRes = await res.json();
                    return alert(dataRes.message);
                }
            } else {
                return alert('Bài đăng chưa tồn tại để đăng nội dung!');
            }
        } catch (error) {
            console.log('Create Error: ', error);
        }
    }

    // console.log('textarea: ', dataTextInput)
    
    return(
        <div className={style.wrapContainerLayoutContent}>
            <div className={style.wrapContainerCoverPage}>
                <h3>Trang bìa</h3>
                <div className={style.containerContent}>
                    <img src={dataBlogCover.img? URL.createObjectURL(dataBlogCover.img): ''} alt="Ảnh bìa" />
                    <div className={style.divAddImg} onClick={handleClickDivImg}>
                        <i className="fa-solid fa-plus"></i>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setDataBlogCover({
                                        ...dataBlogCover,
                                        img: file
                                    });
                                }
                            }}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className={style.areaContentCoverPage}>
                        <input 
                            type="text" 
                            placeholder="Tiêu đề"
                            name="title"
                            value={dataBlogCover.title}
                            onChange={handleDataChange} 
                        />
                        <input 
                            type="text" 
                            placeholder="Mô tả" 
                            name="description"
                            value={dataBlogCover.description}
                            onChange={handleDataChange}
                        />
                        <div className={style.areHorizionCoverPage}>
                            <select value={dataBlogCover.tag} name="tag" onChange={handleChooseTag}>
                                <option value="website">website</option>
                                <option value="mobile">mobile</option>
                            </select>
                            <button 
                                onClick={handleClickSave}
                                // onClick={getChildElementIds}
                                // onClick={() => getContentById(2)}
                            >
                                <i className="fa-solid fa-floppy-disk"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.wrapContainerContentBlog}>
                <div className={style.containerContentBlog}>
                    <h3>Nội dung bài viết</h3>
                    <span>Nội dung được hiển thị theo thứ tự</span>
                    <div className={style.areaContainerContent}>
                        <div className={style.navbarTopContentPage}>
                            <div 
                                className={style.iconNavbarTop}
                                onClick={() => handleAddChildElement('text')}
                            >
                                text
                            </div>
                            <div 
                                className={style.iconNavbarTop}
                                onClick={() => handleAddChildElement('heading')}
                            >
                                <b>heading</b>
                            </div>
                            <div 
                                className={style.iconNavbarTop}
                                onClick={() => handleAddChildElement('textol')}
                            >
                                <i className="fa-solid fa-list-ol"></i>
                            </div>
                            <div 
                                className={style.iconNavbarTop}
                                onClick={() => handleAddChildElement('textul')}
                            >
                                <i className="fa-solid fa-list-ul"></i>
                            </div>
                            <div 
                                className={style.iconNavbarTop}
                                onClick={() => handleAddChildElement('image')}
                            >
                                <i className="fa-solid fa-panorama"></i>
                            </div>
                        </div>
                        <div className={style.areaContentBlog}>

                        </div>
                        <div className={style.btnCreate}>
                            <button onClick={handleClickCreateContentBlog}>
                                <i className="fa-solid fa-floppy-disk"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogContent