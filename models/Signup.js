//defining our schema
const mongoose =require('mongoose');
const passPortLocalMongoose=require('passport-local-mongoose');

const SignupSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    Confirmpassword: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        enum: ['director', 'manager', 'salesagent'], // Only these roles allowed
        required: true
    },
    branch: {
        type: String,
        trim: true
    }
});
 
SignupSchema.plugin(passPortLocalMongoose,{
    usernameField:'email',

});

module.exports=mongoose.model('Signup', SignupSchema);