

import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getCourseById(params.id);

  return {
    title: product?.course?.title,
    description: product?.course?.description,
    openGraph: {
      title: product?.course.title,
      description: product?.course.description,
      images: [product?.course.thumbnail],
    },
  };
}


import { getCourseById } from "@/actions/course.action";
import CourseDetailss from './courseDetails';

const CourseDetails = async({params}:{params:Promise<{id:string}>}) => {
  const {id}= await params
return (<>
<CourseDetailss id={ id} />;

</>)
};

export default CourseDetails;
