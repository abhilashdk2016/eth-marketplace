'use client';
import CourseFilter from '@/components/ui/course/Filter'
import OwnedCourseCard from '@/components/ui/course/OwnedCourseCard'
import MarketHeader from '@/components/ui/marketplace/MarketHeader'
import React, { useState } from 'react'

const ManageCourseComponent = () => {
  const [ searchedCourse, setSearchedCourse ] = useState(null)
  const [ filters, setFilters ] = useState({state: "all"})
  return (
    <>
        <MarketHeader />
        <CourseFilter 
        onFilterSelect={(value) => setFilters({state: value})}
        onSearchSubmit={() => {}}
        />
        <section className='grid grid-cols-1'>
            {/* <OwnedCourseCard /> */}
        </section>

    </>
  )
}

export default ManageCourseComponent;