/*

    username: { type: String, unique: true, default: 'no name'},
    email: { type: String, unique: true, default: 'no email'},
    password: { type: String, default: 'no password'},
    role: { type: String, enum: ['Admin', 'User', 'Partner', 'Manager', 'Staff'] , default: 'User'},
    profile: {
      bio: { type: String, default: 'no bio'},
      profilePicture: { type: String, default: 'no profile picture'}
    },
    createdAt: { type: Date, default: Date.now }*/

    export interface UserInterface{
        _id: string;
        username: string;
        email: string;
        password: string;
        role?: string;
        profile?: {
            address?: {
                street?: string;
                city?: string;
                state?: string;
                zip?: string;
            };
            bio?: string;
            profilePicture?: string;
        };
        createdAt?: Date;
      }
      
class User implements UserInterface{

    
    username: string;
    email: string;
    password: string;
    role: string;
    profile: {
        bio: string;
        profilePicture: string;
        address: {
            street: string;
            city: string;
            state: string;
            zip: string;
        }

    }

    _id: string;
    createdAt: Date;





    //Default constructor
    constructor(){
        this.username = '';
        this.email = '';
        this.password = '';
        this.role = '';
        this.profile = {
            bio: '',
            profilePicture: '',
            address: {
                street: '',
                city: '',
                state: '',
                zip: ''
            }
        }

        this.reset = this.reset.bind(this);
    }

    setAttributesFromRow(row: any){
        this._id = row._id;
        this.username = row.username;
        this.email = row.email;
        this.role = row.role;
    }


    setAttributes(username = '', email = '', password = '', role = '', profile = {bio: '', profilePicture: ''}){
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profile = profile;

    }

    static getRole(){
        return ['Admin', 'User', 'Partner', 'Manager', 'Staff'];
    }

    reset(){
        this.username = '';
        this.email = '';
        this.password = '';
        this.role = '';
        this.profile = {
            bio: '',
            profilePicture: ''
        }
    }
}

export default User;