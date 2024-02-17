import User from "../Models/User.js";

//Allowed characters are letters and numbers and @ and _ and - 

class UserDAO {
    async create(user: any) {
        const newUser = new User(user);
        
        const result = await newUser.save().catch((err) => {

            console.log('\x1b[31m%s\x1b[0m', "Database Error: " + err);
            return {error: err};
        });

        return result;
    }
    //Read
    async findById(id: any) {
        const user = await User.findById(id).catch((err) => { 
            return {error: err};
        });
        return user;
    }
    //Update
    async updateById(id: any, user: any) {
        return await User.findByIdAndUpdate(id, user).catch((err) => {

     
            return {error: err};
        });
    }
    //Delete
    async deleteById(id: any) {
        return await User.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }


    async findAll() {
        return await User.find();
    }

    async findByUserNameAndPassword(username: any, password: any) {
        return await User.findOne({ username: username, password: password });
    }

    async findByEmail(email: any){
        return await User.findOne({email: email});
    }
    async findByUserName(username: any){
         return await User.findOne({username: username});
    }
    async updateAvatar(id: any, fileName: any){
        //Update only the profilePicture field but keep the rest of the profile the same
        return await User.findByIdAndUpdate(id, {profile: {profilePicture: fileName}}).catch((err) => {
            return {error: err};
        });
    }

}
export default UserDAO;