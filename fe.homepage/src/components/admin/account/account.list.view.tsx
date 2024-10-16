/* eslint-disable */

import { AccountEntity } from "../../../types/app.types";
import style from "../../../css.module/admin/service.package.module.css";
import accMana from "../../../css.module/admin/account.manage.module.css";
import React, { useEffect, useRef, useState } from "react";
import { sendReq } from "../../auth.signin";

interface AccList {
    data: AccountEntity[]
}

const url = 'http://localhost:5000/api/homepage/account/delete-account';
const url_update = 'http://localhost:5000/api/homepage/account/update-account';
const url_changpwd = 'http://localhost:5000/api/homepage/account/change-password';

const AccountListView = (props: AccList) => {
    const {data} = props;
    console.log(data)

    const [dataChange, setDataChange] = useState({
        fullname: '',
        username: '',
        email: '',
        role: ''
    });
    const [password, setPassword] = useState({
        oldpass: '',
        newpass: ''
    });
    const [showChangePwd, setShowChangePwd] = useState(false);

    const handleDelete = async (id: number) => {
        try {
            const confirmDel = confirm('Hành động không thể hoàn tác!\nBạn vẫn muốn thực hiện?');
            if(confirmDel){
                const res = await sendReq(url, {
                    method: 'DELETE',
                    body: JSON.stringify({ id: id})
                });
    
                const dataRes = await res.json();
                return alert(dataRes.message);
            }
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataChange({
            ...dataChange,
            [e.target.name]: e.target.value
        })

        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleClickSave = async () => {
        try {
            const res = await sendReq(url_update, {
                method: "PUT",
                body: JSON.stringify(dataChange)
            })
            const dataRes = await res.json();
            alert(dataRes.message);
        } catch (error) {
            console.log('Update Error: ', error);
        }
    }

    const handleClickCancel = () => {
        setDataChange({
            fullname: (data as any).fullname,
            username: (data as any).username,
            email: (data as any).email? (data as any)?.email: "Không có",
            role: (data as any).role
        })
    }

    const handleClickSpanChangePwd = () => {
        setShowChangePwd((show => show? false: true));
    }

    const handleChangePwd = async () => {
        try {
            const res = await sendReq(url_changpwd, {
                method: "PUT",
                body: JSON.stringify(password)
            });
            const dataRes = await res.json();
            return alert(dataRes.message);
        } catch (error) {
            console.log('Change Password Error: ', error);
        }
    }

    return(
        <div className={`${style.wrapTable} ${accMana.wrapTable}`}>
            {
                data.map?
                <table>
                    <tr className={accMana.headTable}>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Username</th>
                        <th>Avatar</th>
                        <th>Email</th>
                        <th>Chức vụ</th>
                        <th>Tùy chọn</th>
                    </tr>
                    <tbody>
                        {data.map((items => {
                            return(
                                <tr className={accMana.trContent}>
                                    <td className={accMana.tdID}>{items.id}</td>
                                    <td>{items.fullname}</td>
                                    <td>{items.username}</td>
                                    <td className={accMana.tdAvatar}>{items.avatar? <img src={`http://localhost:5000${items.avatar}`}/>: "Không có"}</td>
                                    <td>{items.email? items.email: "Không có"}</td>
                                    <td>{items.role}</td>
                                    <td 
                                        className={style.areaButton}
                                        style={{
                                            transform: items.avatar? 'translatey(100%)': 'translatey(0)'
                                        }}
                                    >
                                        <button 
                                            className={style.btnDelete}
                                            onClick={() => handleDelete(items.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>:
                <div className={accMana.wrapContainerInfoAccount}>
                    <h3>Thông tin tài khoản</h3>
                    <div className={accMana.containerInfoAccont}>
                        <img src={(data as any).avatar? `http://localhost:5000${(data as any).avatar}`? `http://localhost:5000${(data as any).avatar}`: (data as any).avatar: ''} alt="" />
                        <div className={accMana.areaInfoAccount}>
                            <input 
                                type="text"
                                name="fullname"
                                value={dataChange.fullname===''? (data as any)?.fullname: dataChange.fullname}
                                onChange={handleChange}
                                style={{
                                    display: showChangePwd? 'none': 'block'
                                }}
                            />
                            <input 
                                type="text"
                                name="username"
                                value={dataChange.username===''? (data as any)?.username: dataChange.username}
                                onChange={handleChange}
                                style={{
                                    display: showChangePwd? 'none': 'block'
                                }}
                            />
                            <input 
                                type="email"
                                name="email"
                                value={dataChange.email===''? (data as any)?.email? (data as any)?.email: 'Không có': dataChange.email}
                                onChange={handleChange}
                                style={{
                                    display: showChangePwd? 'none': 'block'
                                }}
                            />
                            <input 
                                type="text"
                                name="role"
                                value={(data as any)?.role}
                                onChange={handleChange}
                                readOnly
                                style={{
                                    display: showChangePwd? 'none': 'block'
                                }}
                            />
                            <input 
                                type="text" 
                                name="oldpass"
                                value={password.oldpass}
                                onChange={handleChange}
                                placeholder="Mật khẩu cũ"
                            />
                            <input 
                                type="text" 
                                name="newpass"
                                value={password.newpass}
                                onChange={handleChange}
                                placeholder="Mật khẩu mới"
                            />
                            <span 
                                onClick={handleClickSpanChangePwd}
                                style={{
                                    display: showChangePwd? 'none': 'block'
                                }}
                            >
                                    Đổi mật khẩu
                            </span>
                            <div className={accMana.areaBtn}>
                                <button onClick={showChangePwd? handleChangePwd: handleClickSave}>Lưu</button>
                                <button onClick={showChangePwd? handleClickSpanChangePwd: handleClickCancel}>Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccountListView;