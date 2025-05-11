

import CourseDetailss from './courseDetails';

const CourseDetails = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <CourseDetailss id={id} />
    </>
  );
};

export default CourseDetails;

