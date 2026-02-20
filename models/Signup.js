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
    // Note: password fields removed - passport-local-mongoose handles passwords automatically
    // It creates 'hash' and 'salt' fields internally
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