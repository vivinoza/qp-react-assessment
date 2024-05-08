const mongoose = require('mongoose');

async function connectToMongo() {
     try {
         await mongoose.connect('mongodb+srv://vivinoza:zyDl1h2Qx2pS7ufv@cluster0.8fndxzr.mongodb.net/', {
         });
         console.log('Connected to MongoDB');
     } catch (error) {
     }
 }

module.exports = connectToMongo;