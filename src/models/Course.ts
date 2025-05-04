import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    subtitle: string;
    isPublished: boolean;
    enrolledStudents: mongoose.Types.ObjectId[]; // Array of references to User model
    createdAt: Date;
    updatedAt: Date;
    creator:string;
    lecture:string[]
    category:string;
    price:number;
    thumbnail: string;
    courseLevel:string;
}

const CourseSchema: Schema<ICourse> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        courseLevel:{type:String,enum:['Beginner','Intermediate','Advanced']},
        subtitle: { type: String, required: true },
        enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isPublished: { type: Boolean, default: false },
        creator: { type: String, required: true },
        lecture: [{ type: mongoose.Schema.Types.ObjectId, ref:"Lecture" ,required: true }],
        category: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail:{type:String,required:true},

    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;