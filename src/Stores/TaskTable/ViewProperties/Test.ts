export class a {
    a: string = "a";
}
export class b extends a {
    b: string;
}
export class c extends b {
    constructor() {
        super()
    }
}