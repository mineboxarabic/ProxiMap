import User from "../Models/User.js";
import isUserValid from "../Utilities/isUserValid.js";
//Allowed characters are letters and numbers and @ and _ and - 

class UserDAO {
    async create(user) {
        const newUser = new User(user);
        
        const result = await newUser.save().catch((err) => {
            //Console log the error in red 
            console.log('\x1b[31m%s\x1b[0m', "Database Error: " + err);
            return {error: err};
        });

        return result;
    }
    //Read
    async findById(id) {

        //return await User.findById(id);
        
        const user = await User.findById(id).catch((err) => { 
            //console.log('\x1b[31m%s\x1b[0m', "Database Error: " + err);
            
            return {error: err};
        });
        return user;
    }
    //Update
    async updateById(id, user) {
        return await User.findByIdAndUpdate(id, user).catch((err) => {

     
            return {error: err};
        });
    }
    //Delete
    async deleteById(id) {
        return await User.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }


    async findAll() {
        return await User.find();
    }

}
export default UserDAO;