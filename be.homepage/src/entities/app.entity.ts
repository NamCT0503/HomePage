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
    postedAt: Date | string;
    postedBy: number;
    tag?: string;
    isOutstanding?: number;
    view: number;
}

export interface BlogContentEntity {
    id?: number;
    blogid: number;
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