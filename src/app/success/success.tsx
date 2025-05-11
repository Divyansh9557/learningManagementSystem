/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { verifyPaymentStatus } from "@/actions/coursePurchase";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id') ?? '';
  const userId = searchParams.get('userId') ?? '';
  const courseId = searchParams.get('courseId') ?? '';
  const router = useRouter();

  if(!session_id || !userId || !courseId) {
   router.back()
  }
  
  const { mutate } = useMutation({
      mutationFn: async () => {
          const res = await verifyPaymentStatus({ session_id, userId, courseId });
      if (res?.success) {
          return res;
      }
      if (res?.error) {
        throw new Error(res?.message || "Payment failed");
      }
    },
    onSuccess: () => {
      toast.success("Payment successful");
      setTimeout(() => {
        router.push(`/course-progress/${courseId}`);
    }, 2000); // Add slight delay for visual feedback
},
onError: (error) => {
    toast.error(error.message);
    router.push(`/course-progress/${courseId}`);
    },
});

useEffect(() => {
    mutate();
}, []);

if(!session_id || !userId || !courseId) {
   return  <div className="w-full h-screen" >not found</div>
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md text-center bg-white shadow-md rounded-2xl p-8">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">You&apos;re being redirected to your course. Hang tight!</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
