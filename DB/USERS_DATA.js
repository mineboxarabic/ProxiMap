const USERS_DATA = [
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c2"),
    username: "Yassin",
    email: "mineboxarabic@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Admin",
    profile: {
      address: 
        {
          street: 'no street',
          city:  'no city',
          state:  'no state',
          zip:  'no zip'
        },
      bio: "I am the admin",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c1"),
    username: "user",
    email: "user@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "User",
    profile: {
      address: 
      {
        street: 'no street',
        city:  'no city',
        state:  'no state',
        zip:  'no zip'
      },
      bio: "I am the User",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c4"),
    username: "admin",
    email: "Admin@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Admin",
    profile: {
      address: 
      {
        street: 'no street',
        city:  'no city',
        state:  'no state',
        zip:  'no zip'
      },
      bio: "I am the Admin",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c3"),
    username: "partner",
    email: "Partner@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Partner",
    profile: {
      address: 
      {
        street: 'no street',
        city:  'no city',
        state:  'no state',
        zip:  'no zip'
      },
      bio: "I am the Partner",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c6"),
    username: "partner",
    email: "Partner@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Partner",
    profile: {
      address: 
      {
        street: 'no street',
        city:  'no city',
        state:  'no state',
        zip:  'no zip'
      },
      bio: "I am the Partner",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f824"),
    username: "manager",
    email: "Manager@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Manager",
    profile: {
      address: 
      {
        street: 'no street',
        city:  'no city',
        state:  'no state',
        zip:  'no zip'
      },
      bio: "I am the Manager",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
  {
    _id: ObjectId("60b5c5b4c7a3c0b4e4f0f8c5"),
    username: "Staff",
    email: "Staff@gmail.com",
    password: "$2b$10$eUxzAIF5hnapD56diZgioONFsYZt9tDy7N28oqRoD.ah/i56ye25S",
    role: "Staff",
    profile: {
      address: 
      {
        street: 'no street',
        city:  'no city',
        state:  'no state',
        zip:  'no zip'
      },
      bio: "I am the Staff",
      profilePicture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F708613941184400862%2F&psig=AOvVaw2z9W4lq7QKQ6b8uN0jYh2a&ust=1622545559155000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjBh7qj9_ACFQAAAAAdAAAAABAD",
    },
    createdAt: new Date(),
  },
];

