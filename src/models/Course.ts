import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    subtitle: string;
    isPublished: boolean;
    enrolledStudents: string[];
    createdAt: Date;
    updatedAt: Date;
    creator:string;
    lecture:string[]
    category:string;
    price:number;
    thumbnail: string;
    courseLevel:string;
    publicId: string;
    resourceType: string;
}

const CourseSchema: Schema<ICourse> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        courseLevel:{type:String,enum:['Beginner','Intermediate','Advanced']},
        subtitle: { type: String},
        enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isPublished: { type: Boolean, default: false },
        creator: { type: String, required: true },
        lecture: [{ type: mongoose.Schema.Types.ObjectId, ref:"Lecture"  }],
        category: { type: String, required: true },
        price: { type: Number, },
        thumbnail:{type:String},
        publicId: { type: String },
        resourceType:{type:String}

    },
    {
        timestamps: true,
    }
);

const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;