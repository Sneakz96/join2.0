export class Contact {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    phone!: string;
    color!: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.phone = obj ? obj.phone : '';
    }
}