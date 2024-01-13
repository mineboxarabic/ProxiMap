import User from "../Models/User.js";

//Allowed characters are letters and numbers and @ and _ and - 

class UserDAO {
    async create(user) {
        const newUser = new User(user);
        
        const result = await newUser.save().catch((err) => {

            console.log('\x1b[31m%s\x1b[0m', "Database Error: " + err);
            return {error: err};
        });

        return result;
    }
    //Read
    async findById(id) {
        const user = await User.findById(id).catch((err) => { 
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

    async findByUserNameAndPassword(username, password) {
        return await User.findOne({ username: username, password: password });
    }

    async findByEmail(email){
        return await User.findOne({email: email});
    }
    async findByUserName(username){
         return await User.findOne({username: username});
    }

}
export default UserDAO;