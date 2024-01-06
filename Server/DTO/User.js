export default class UserDTO {
    constructor(name, email, role) {
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