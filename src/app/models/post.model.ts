export class PostModel {

    message: string;
    coords: ICoord;

    constructor() {
        this.message = '';
        this.coords = {
            type: 'Point',
            coordinates: [0, 0]
        };
    }
}

interface ICoord {
    type: string;
    coordinates: number[];
}
