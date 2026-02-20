// Script to check and fix existing users in the database
// Run with: node fixUsers.js

require('dotenv').config();
const mongoose = require('mongoose');
const Signup = require('./models/Signup');

async function fixUsers() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected to MongoDB');
    
    // Find all users
    const users = await Signup.find({});
    console.log('\n=== All Users in Database ===');
    
    for (const user of users) {
      console.log({
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role || 'NO ROLE SET',
        branch: user.branch || 'NO BRANCH SET'
      });
      
      // If user has no role, we need to fix it
      if (!user.role) {
        console.log(`⚠️  User ${user.email} has no role! This user cannot access any dashboard.`);
      }
    }
    
    console.log('\n=== Summary ===');
    console.log(`Total users: ${users.length}`);
    console.log(`Users without role: ${users.filter(u => !u.role).length}`);
    
    // If there are users without roles, prompt to fix
    const usersWithoutRole = users.filter(u => !u.role);
    if (usersWithoutRole.length > 0) {
      console.log('\n⚠️  Some users have no role set. You need to update them manually in MongoDB Compass or create new accounts.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixUsers();
