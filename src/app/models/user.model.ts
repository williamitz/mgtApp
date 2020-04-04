export class UserModel {
    name: string;
    surname: string;
    nameUser: string;
    passwordUser: string;
    accountPrivate: boolean;
    imgUser: string;
    sex: string;

    constructor() {

        this.name = '';
        this.surname = '';
        this.nameUser = '';
        this.passwordUser = '';
        this.accountPrivate = false;
        this.imgUser = 'av-1.png';
        this.sex = 'M';
    }
}
