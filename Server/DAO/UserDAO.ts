import { Error } from "mongoose";
import User, { UserInterface } from "../Models/User.js";
import DatabaseError from "./DataBaseError/DatabaseError.js";

//Allowed characters are letters and numbers and @ and _ and - 


interface UserDAOInterface {
    create(user: UserInterface): Promise<UserResult>;
    findById(id: string): Promise<UserResult>;
    deleteById(id: string): Promise<UserResult>;
    updateById(id: string, user: UserInterface): Promise<UserResult>;
    findAll(): Promise<UserArrayResult>;
    findByUserNameAndPassword(username: string, password: string): Promise<UserResult>;
    findByEmail(email: string): Promise<UserResult>;
    findByUserName(username: string): Promise<UserResult>;
    updateAvatar(id: string, fileName: string): Promise<UserResult>;
    exists(id: string): Promise<boolean>;

}

export type UserResult = UserInterface | DatabaseError | null;

export type UserArrayResult = UserInterface[] | DatabaseError | null;

class UserDAO implements UserDAOInterface
{
    async create(user: UserInterface) : Promise<UserResult>
    
    {
        try{
            const newUser = new User(user);
            const result = await newUser.save();
            return result;
        }catch(error){
            return new DatabaseError('Error creating user', error);
        }
    }
    //Read
    async findById(id: string)  : Promise<UserResult>
    {
        try{
            const user = await User.findById(id);
            return user;
        }catch(error){
            return new DatabaseError('Error finding user by ID', error);
        }
    }
    //Update
    async updateById(id: string, user: UserInterface) : Promise<UserResult>{
        try{
            const updatedUser = await User.findByIdAndUpdate(id, user);
            return updatedUser;
        }catch(error){
            return new DatabaseError('Error updating user by ID', error);
        }

    }
    //Delete
    async deleteById(id: string)  : Promise<UserResult>
    {
        try{
            const deletedUser = await User.findByIdAndDelete(id);
            return deletedUser;
        }catch(error){
            return new DatabaseError('Error deleting user', error);
        }
    }
    //Read
    async findAll() : Promise<UserArrayResult>{
        try{
            const users = await User.find();
            return users;
        }catch(error){
            return new DatabaseError('Error finding all users', error);
        }
    }

    async findByUserNameAndPassword(username: string, password: string) : Promise<UserResult>{
        try{
            const user = await User.findOne({username: username, password: password});
            return user;
        }catch(error){
            return new DatabaseError('Error finding user by username and password', error);
        }
    }
    async findByEmail(email: string) : Promise<UserResult>{
        try{
            const user = await User
            .findOne({email: email});
            return user;
        }catch(error){
            return new DatabaseError('Error finding user by email', error);
        }
    }

    async findByUserName(username: string) : Promise<UserResult>{
        try{
            const user = await User
            .findOne({username: username});
            return user;
        }catch(error){
            return new DatabaseError('Error finding user by username', error);
        }
    }


    async updateAvatar(id: string, fileName: string) : Promise<UserResult>{
        try{
            const updated = await User.findByIdAndUpdate(id, {profile: {profilePicture: fileName}});
            return updated;
        }catch(error){
            return new DatabaseError('Error updating user avatar', error);
        }
    }

    async exists(id: string) : Promise<boolean>{
        const result = await User.exists({_id: id});
        return result !== null;
    }

}
export default UserDAO;