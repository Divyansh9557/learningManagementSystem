

import CourseDetailss from './courseDetails';

const CourseDetails = async({params}:{params:Promise<{id:string}>}) => {
  const {id}= await params
return (<>
<CourseDetailss id={ id} />;

</>)
};

export default CourseDetails;
