export class Category {
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    _id: string;
    name: string;
    type: string;
    edit?: boolean;
}