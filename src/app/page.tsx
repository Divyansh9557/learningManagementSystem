
import LogoutButton from "@/components/logoutButton";
import auth from "@/lib/checkAuth";
import { redirect } from "next/navigation";


export default async function Home() {

     const user = await auth()
     if(!user?.id){ 
      redirect("/login")
     }
     return (
   <>
   <LogoutButton/>
   </>
  );
}
