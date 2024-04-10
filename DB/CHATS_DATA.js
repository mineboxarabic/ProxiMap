import { ObjectId } from "mongodb";

const yassin = new ObjectId("60b5c5b4c7a3c0b4e4f0f8c2");
const user = new ObjectId("60b5c5b4c7a3c0b4e4f0f8c1");
const admin = new ObjectId("60b5c5b4c7a3c0b4e4f0f8c4");
const CHATS_DATA =[
//Yassin : 60b5c5b4c7a3c0b4e4f0f8c2
//User : 60b5c5b4c7a3c0b4e4f0f8c1
//Admin : 60b5c5b4c7a3c0b4e4f0f8c4


/*  participants: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date; */

  
  {
    //Chat between Yassin and User
    _id: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    participants: [yassin,user],
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    //Chat between Yassin and Admin
    _id: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    participants: [yassin,admin],
    createdAt: new Date(),
    updatedAt: new Date()

}
];

export default CHATS_DATA;