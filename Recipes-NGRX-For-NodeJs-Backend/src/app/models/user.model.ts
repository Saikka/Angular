export class User {

    constructor(id: string, token: string) {
        this._id = id;
        this.token = token;
    }

    _id: string;
    token: string;
}