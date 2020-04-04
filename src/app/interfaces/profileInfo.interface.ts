import { IPost } from './post.interface';
export interface IResponseProfileInfo {
    ok: boolean;
    error?: any;
    followed?: boolean; // bandera pasa saber si ya estoy siguiendo a este usuario
    user?: IUser;
    comunity?: IComunity;
    post?: IPost;
}

interface IUser {
    _id?: string;
    imgUser?: string;
    aboutMe?: string;
    nameComplete?: string;
    nameUser?: string;
    registered?: IRegistered;
}

interface IRegistered {
    date: string;
    ipUser: string;
    idUser?: string;
}


interface IComunity {
    _id: string;
    registered?: IRegistered;
    statusRegister?: boolean;
    user?: string;
    followers: any[];
    followed: any[];
}

