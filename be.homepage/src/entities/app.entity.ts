export interface AccountEntity {
    id?: number;
    fullname: string;
    username: string;
    password: string;
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
    postedAt: Date;
    postedBy: number;
    tag?: string;
    isOutstanding?: boolean;
    view: number;
}

export interface BlogContentEntity {
    id?: number;
    blogid: number;
    type_content: string;
    content: string;
}

export interface ServiceWeb {
    id?: number;
    title: string;
    price: number;
}

export interface ContentWeb {
    id?: number;
    serweb_id: number;
    content: string;
}

export interface ServiceApp {
    id?: number;
    type: string;
    title: string;
    subtitle: string;
}

export interface ContentApp {
    id?: number;
    serapp_id: number;
    icon?: string;
    content: string;
}