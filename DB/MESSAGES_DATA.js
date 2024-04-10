import { ObjectId } from "mongodb";

const MESSAGES_DATA = [
/*  chatId: ObjectId;
  sender: ObjectId;
  text: string;
  createdAt: Date; */

//Yassin : 60b5c5b4c7a3c0b4e4f0f8c2
//User : 60b5c5b4c7a3c0b4e4f0f8c1
//Admin : 60b5c5b4c7a3c0b4e4f0f8c4

// Chat between Yassin and User _id: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
//Chat between Yassin and Admin _id: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),


{
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c2"),
    text: "Hello User",
    createdAt: new Date()
    },
    {
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c1"),
    text: "Hello Yassin",
    createdAt: new Date()
    },
    {
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c2"),
    text: "How are you User?",
    createdAt: new Date()
    },
    {
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c1"),
    text: "I am fine Yassin",
    createdAt: new Date()
    },
    {
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c2"),
    text: "Hello Admin",
    createdAt: new Date()
    },
    {
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c4"),
    text: "Hello Yassin",
    createdAt: new Date()
    },
    {
    chatId: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    sender: new ObjectId("60b5c5b4c7a3c0b4e4f0f8c2"),
    text: "How are you Admin?",
    createdAt: new Date()
    },
];

export default MESSAGES_DATA;