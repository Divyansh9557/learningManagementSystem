import { BuyedCourse } from "./BuyedCourse";

const MyLearning = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mt-10 mb-6 text-center text-gray-800">
          My Courses
        </h1>

        <div className="grid grid-cols-1 ml-5 md:ml-0 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BuyedCourse />
         
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
