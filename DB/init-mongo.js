load('/docker-entrypoint-initdb.d/USERS_DATA.js');
load('/docker-entrypoint-initdb.d/CATEGORIES_DATA.js');
load('/docker-entrypoint-initdb.d/SERVICES_DATA.js');

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



db.users.insertMany(USERS_DATA);

db.categories.insertMany(CATEGORIES_DATA);

db.services.insertMany(SERVICES_DATA);
print("Done.");
