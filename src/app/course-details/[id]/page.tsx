

import CourseDetailss from './courseDetails';

const CourseDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <>
      <CourseDetailss id={id} />
    </>
  );
};

export default CourseDetails;

