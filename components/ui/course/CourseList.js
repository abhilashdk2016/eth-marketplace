'use client';
import React from 'react'
import CourseCard from './CourseCard';

const CourseList = ({ courses, children }) => {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        { courses.map(course => <CourseCard course={course} key={course.id} /> ) }
    </section>
  )
}

export default CourseList