'use client';
import React from 'react'
import CourseCard from './CourseCard';
import { useOwnedCourses } from '@/components/hooks/web3/useOwnedCourses';
import { useAccount } from '@/components/hooks/web3/useAccount';

const CourseList = ({ courses, showPurchase = false, handleClick = null, hasConnectedToWallet = false }) => {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const ownedCoursesLookup = ownedCourses?.data?.lookup || {};
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        { courses.map(course => {
          const owned = ownedCoursesLookup[course.id] || false;
          return <CourseCard course={course} key={course.id} showPurchase={showPurchase} handleClick={handleClick} hasConnectedToWallet={hasConnectedToWallet} owned={owned} /> 
        }) }
    </section>
  )
}

export default CourseList