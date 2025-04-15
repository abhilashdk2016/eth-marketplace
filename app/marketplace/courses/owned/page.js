import React from 'react'
import OwnedCoursesComponent from './OwnedCoursesComponent'
import { GetAllCourses } from '@/actions/api';

const OwnedCourses = async () => {
  const { data } = await GetAllCourses();
  return (
    <>
        <OwnedCoursesComponent courses={data} />
    </>
  )
}

export default OwnedCourses