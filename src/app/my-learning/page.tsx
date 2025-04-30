

import { BuyedCourse } from "./BuyedCourse";


const MyLearing = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mt-10 mb-10 text-center">
          My Course
        </h1>
      </div>
      <div className="flex flex-wrap gap-20 justify-center items-center">
        {<BuyedCourse />}
      </div>
    </div>
  );
}

export default MyLearing