

import CourseDetailss from './courseDetails';

const CourseDetails = async ({ params }) => {
  const id = params?.id;

  return (
    <>
      <CourseDetailss id={id} />
    </>
  );
};

export default CourseDetails;

