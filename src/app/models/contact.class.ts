export class Contact {
    picture: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    constructor(obj?: any) {
        this.picture = obj ? obj.picture : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
    }
}

