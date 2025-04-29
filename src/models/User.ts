import mongoose from "mongoose";
import {Schema, Document } from "mongoose";



export interface User extends Document {
    username: string,
    email: string,
    password: string,
    role:string,
    enrolledCourses: mongoose.Schema.Types.ObjectId[],
    image: string,
    _id:string,
}

const userSchema:Schema<User>= new mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true,
   },
    email: {
     type: String,
     required: true,
     unique: true,
    },
    password: {
     type: String,
    },
    role: {
     type: String,
     enum: ['instructor', 'student'],
     default: 'student',
    },
    enrolledCourses:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:'Course',}
       ],
    image: {
        type: String,
        default:""
    },
}, {
  timestamps: true,
})

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;