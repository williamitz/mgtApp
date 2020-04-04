export interface IPost {
    _id?: string;
    coords?: ICoords;
    img?: string[];
    message?: string;
    user?: IUser;
    created?: string;
    _v?: number;

}

interface ICoords {
    coordinates: number[];
    type: string;
}

interface IUser {
    nameUser: string;
    imgUser: string;
    nameComplete: string;
    _id: string;
}

export interface IResponsePost {
    ok: boolean;
    data: IPost[];
    error?: any;
    total?: number;
}
