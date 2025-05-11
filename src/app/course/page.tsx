import React, { Suspense } from 'react'
import CourseFilterPageUI from './courseUiPage'

const FilterPage = () => {
  return (
     <Suspense fallback={<div>Loading courses...</div>}>
      <CourseFilterPageUI />
    </Suspense>
  )
}

export default FilterPage