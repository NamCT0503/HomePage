export interface ServiceMobileEntity {
    id: number;
    type: string;
    title: string;
    subtitle: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: Date | string;
}

export interface ServiceWebEntity {
    id: number;
    title: string;
    price: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: Date | string;
}

export interface ContentMobileEntity{
    id: number;
    serapp_id: number;
    icon: string;
    content: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: Date | string;
}

export interface ContentWebEntity{
    id: number;
    serweb_id: number;
    content: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    deletedAt: Date | string;
}