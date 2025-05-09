'use client'
import { Button } from "./ui/button";
import { redirect, useParams, useRouter } from "next/navigation";
import { createCheckoutSession } from "@/actions/coursePurchase";
import toast from "react-hot-toast";




const ProductBuy = () => {
  const {id:courseId} = useParams() 
  const router = useRouter()
  const handleBuy= async()=>{
    const res= await createCheckoutSession(courseId as string )
    if(res?.success){
    router.push(res?.url as string);
    }
    if(res?.error){
       toast.error(res.message)
       if(res.message==="Login in First"){
           redirect("/login");
       }
    }
  }
  return (
  
            <Button className="px-[51%] " onClick={handleBuy}>buy</Button>
           
  );
}

export default ProductBuy