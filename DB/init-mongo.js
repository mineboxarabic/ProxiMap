cuurentTime = "2021-06-01T00:00:00.000Z";
db = new Mongo().getDB("ProxiMap");
/*{
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Admin', 'User', 'Partner', 'Manager', 'Staff'] , default: 'User'},
    profile: {
      bio: String,
      profilePicture: String,
    },
    createdAt: { type: Date, default: Date.now }
} */
// Here you can insert your default data
print("Inserting default data...");
db.services.insertMany([
  // Example document
  {
    name: "Service 1",
    description: "Description of Service 1",
    // Other fields...
  },
  // Add more documents as needed
]);


db.users.insertMany([
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c2"),
    username: "Yassin",
    email: "mineboxarabic@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Admin",
    profile: {
      bio: "I am the admin",
      profilePicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date()
  },

  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c1"),
    username: "user",
    email: "user@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "User",
    profile: {
      bio: "I am the User",
      profilePicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date()
  },  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c4"),
    username: "yassiddd",
    email: "user23@gmaildd.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "User",
    profile: {
      bio: "I am the User",
      profilePicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date()
  }
    ,
    {
      _id: ObjectId("60b5c5b4c7a3c0b4f4f0f8c3"),
      username: "yassiddd",
      email: "userd223@gmaildd.com",
      password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
      role: "User",
      profile: {
        bio: "I am the User",
        profilePicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
      },
      createdAt: new Date()
  }
]);

print("Done.");
