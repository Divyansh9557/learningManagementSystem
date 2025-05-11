

import AboutPage from "@/components/home/AboutPage";
import Courses from "@/components/home/Courses";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/Hero";




export default async function Home() {

  
     return (
   <>

   <Hero/>
   <Courses/>
   <AboutPage/>
   <Footer/>
   </>
  );
}
