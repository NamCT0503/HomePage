export interface AccountEntity {
    id?: number;
    fullname: string;
    username: string;
    password: string;
    avatar: File | any;
    email?: string;
    role: string;
    createdAt: Date;
    updateAt: Date;
    deletedAt: Date
}

export interface BlogEntity {
    id?: number;
    img?: string;
    title: string;
    description: string;
    postedAt: Date | string;
    postedBy: number;
    tag?: string;
    isOutstanding?: number;
    view: number;
}

export interface BlogContentEntity {
    id?: number;
    blogid: number;
    stt: number;
    type_content: string;
    content: string;
}

export interface ServiceWebEntity {
    id?: number;
    title: string;
    price: string;
}

export interface ContentWebEntity {
    id?: number;
    serweb_id: number;
    content: string;
}

export interface ServiceAppEntity {
    id?: number;
    type: string;
    title: string;
    subtitle: string;
}

export interface ContentAppEntity {
    id?: number;
    serapp_id: number;
    icon?: string;
    content: string;
}

export interface NotificationEntity {
    id?: number;
    actionid: number;
    type_noti: string;
    status: string;
    actionBy: number;
}

export interface NotiDetailEntity {
    id?: number;
    accountid: number;
    notiid: number;
    seen?: boolean;
    dataChange: string;
}