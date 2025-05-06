import mongoose, { Schema, Document } from 'mongoose';

export interface ILecture extends Document {
    lectureTitle: string;
    videoUrl?:string;
    publicId?:string;
    isPriviewFree?:string;
    resourceType?:string,
}

const LectureSchema: Schema = new Schema({
    lectureTitle: { type: String, required: true },
    videoUrl:{type:String,},
    publicId:{type:String,},
    resourceType:{type:String},
    isPriviewFree:{type:String,}
},{timestamps:true});

const Lecture = mongoose.models.Lecture || mongoose.model<ILecture>('Lecture', LectureSchema);

export default Lecture;