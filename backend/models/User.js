const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        profileImageUrl:{type:String, default:null},
        role:{type:String, enum:['admin','member'], default:'member'}, // role-based access control
    },
    { timestamps:true } // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model("User", UserSchema);

