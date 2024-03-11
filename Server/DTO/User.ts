export default class UserDTO {
    email: any;
    name: any;
    role: any;
    constructor(name: any, email: any, role: any) {
        this.name = name;
        this.email = email;
        this.role = role;
    }


    getUser() {
        return {
            name: this.name,
            email: this.email,
            role: this.role
        }
    }
}