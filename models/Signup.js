//defining our schema
const mongoose =require('mongoose');
const passPortLocalMongoose=require('passport-local-mongoose');

const SignupSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
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
        trim: true,
        enum: ['Maganjo', 'Matugga', 'Head Office'], // KGL branches
        required: function() {
            // Branch is required for managers and sales agents, not for director
            return this.role === 'manager' || this.role === 'salesagent';
        }
    }
});
 
SignupSchema.plugin(passPortLocalMongoose,{
    usernameField:'email',

});

module.exports=mongoose.model('Signup', SignupSchema);