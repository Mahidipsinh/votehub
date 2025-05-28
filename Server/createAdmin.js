const mongoose = require('mongoose');
const Admin = require('./Model/Admin');

const DB = "mongodb+srv://zalamahidipsinh007:Mahidipsinh007@cluster0.bc01nef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Database connected');
    
    // Create admin user
    const admin = new Admin({
        username: 'admin',
        password: 'admin@123'
    });

    try {
        await admin.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
    
    mongoose.connection.close();
}).catch((err) => {
    console.log('Database connection error:', err);
}); 