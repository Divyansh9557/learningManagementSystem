'use server'
import auth from "@/lib/checkAuth";
import connectDB from "@/lib/connectDB"
import Course from "@/models/Course";
import PurchaseCourse from "@/models/purchaseCourse";
import UserModel from "@/models/User";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const  createCheckoutSession= async (courseId: string)=>{
  const authUser = await auth()
  const userId = authUser?.id as string;
  
  try {
    await connectDB()
    const user= await UserModel.findById(userId);
    if(!user) throw new Error("user not found")
  if(!authUser?.id) throw new Error("Login in First") 
    const course= await Course.findById(courseId);
    if(!course){
        throw new Error("course not found")
    }
     const purchaseCourse = new  PurchaseCourse({
              userId,
              courseId,
              price:course.price,
              status:'pending',
     })
     // stripe session
     const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.title,
                images: [course.thumbnail],
              },
              unit_amount: course.price * 100, // Amount in paise (lowest denomination)
            },
            quantity: 1,
          },
        ],
        customer_email: user.email,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&userId=${user?.id}&courseId=${courseId}`, // once payment successful redirect to course progress page
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/course-details/${courseId}`,
        metadata: {
          courseId: courseId,
          userId: userId,
        },
        
      })
       
      if(!session.url){
        throw new Error("failed to create session")
      }

      purchaseCourse.purchaseId= session.id

      purchaseCourse.save()
   return {success:true,url:session.url}
    }
    catch(error){
        if(error instanceof Error){
            return {error:true,message:error.message}
        }
    }
}
   
export const verifyPaymentStatus= async({session_id,userId,courseId}:{session_id:string,userId:string,courseId:string})=>{
   try {
    await connectDB()
    console.log(session_id," ",userId," ",courseId)
       const session = await stripe.checkout.sessions.retrieve(session_id)

   if(session. payment_status==="unpaid"){
      throw new Error("payment not successful")
   }
   if(session. payment_status==="paid"){
         const course = await Course.findById(courseId)
          const user = await UserModel.findById(userId)
          if(session.customer_email!==user.email){
              throw new Error("user email does not match payment ")
          }
          const paymentcard = await PurchaseCourse.findOne({ purchaseId: session_id });
          if (!paymentcard) {
              throw new Error("Invalid session");
          }
          if(paymentcard.status==='Successful'){
             throw new Error("payment already successful")
          }
          user.enrolledCourses=  [...user.enrolledCourses,courseId]
          paymentcard.status="Successful";
           course.enrolledStudents= [...course.enrolledStudents,user._id]
          await course.save()
          await user.save()
          await paymentcard.save()
          return {success:true,message:"payment successful"}
       }
  

   } catch (error) {
    console.log("error hai")
     if(error instanceof Error){

         return {error:true,message:error.message}
     }
   }
}
     