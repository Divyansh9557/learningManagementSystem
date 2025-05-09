import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchaseCourse extends Document {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    purchaseDate: Date;
    price: number;
    status: 'Successful' | 'expired' | 'cancelled';
}

const PurchaseCourseSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        courseId: { type: mongoose.Types.ObjectId, required: true, ref: 'Course' },
        price: { type: Number, required: true },
        status: { type: String, enum: ['Successful', 'pending', 'failed'], default: 'pending' },
        purchaseId:{type:String,required:true}
    },
    {
        timestamps: true,
    }
);

const PurchaseCourse= mongoose.models.PurchaseCourse || mongoose.model<IPurchaseCourse>('PurchaseCourse', PurchaseCourseSchema);

export default PurchaseCourse