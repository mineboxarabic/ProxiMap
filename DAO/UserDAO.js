import User from "../Models/User.js";
//Allowed characters are letters and numbers and @ and _ and - 

class UserDAO {
    async create(user) {
        const newUser = new User(user);
        
        const isUserValid = isUserValid(newUser);
        if(isUserValid.error){
            return isUserValid;
        }
        
        
        const result = await newUser.save().catch((err) => {
            if(err.code === 11000){
                return {error: 'User already exists'};
            }
            else{
                return {error: err};
            }
        });

        return result;
    }
    //Read
    async findById(id) {
        return await User.findById(id);
    }
    //Update
    async updateById(id, user) {
        return await User.findByIdAndUpdate(id, user);
    }
    //Delete
    async deleteById(id) {
        return await User.findByIdAndDelete(id);
    }


    async findAll() {
        return await User.find();
    }

}
export default UserDAO;