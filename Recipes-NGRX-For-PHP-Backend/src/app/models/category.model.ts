export class Category {
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    id: number;
    name: string;
    type: string;
}