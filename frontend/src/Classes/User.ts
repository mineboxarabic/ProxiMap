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

import { ObjectInterface } from "./Object";

    export interface UserInterface{
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
      
class User implements UserInterface, ObjectInterface{

    
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

    };

    _id: string;
    createdAt: Date;





    //Default constructor
    constructor(user?: User){
        this.username = user?.username ?? '';
        this.email = user?.email ?? '';
        this.password = user?.password ?? '';
        this.role = user?.role ?? '';
        this.profile = {
            bio: user?.profile?.bio ?? '',
            profilePicture: user?.profile?.profilePicture ?? '',
            address: {
                street: user?.profile?.address?.street ?? '',
                city: user?.profile?.address?.city ?? '',
                state: user?.profile?.address?.state ?? '',
                zip: user?.profile?.address?.zip ?? ''
            }
        }
        this._id = user?._id ?? '';
        this.createdAt = user?.createdAt ?? new Date();
    }

    //get id
    getId(): string {
        return this._id;
    }

    //get role
    getRole() : string{
        return this.role;
    }

    //get username
    getUsername() : string{
        return this.username;
    }

    //get email
    getEmail() : string{
        return this.email;
    }

    //get profile
    getProfile() : { bio: string; profilePicture: string; address: { street: string; city: string; state: string; zip: string; }; }{
        return this.profile;
    }

    //get createdAt
    getCreatedAt() : Date{
        return this.createdAt;
    }

    //set id
    setId(id: string): void {
        this._id = id;
    }

    reset(){
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
        };
    }
}

export default User;