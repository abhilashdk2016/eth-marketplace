import Button from '@/components/ui/common/Button';
import OwnedCourseCard from '@/components/ui/course/OwnedCourseCard';
import MarketHeader from '@/components/ui/marketplace/MarketHeader';
import React from 'react'

const OwnedCourses = () => {
  return (
    <>
        <MarketHeader />
        <section className='grid grid-cols-1'>
            <OwnedCourseCard>
              <Button>Watch the course</Button>
            </OwnedCourseCard>
        </section>
        
    </>
  )
}

export default OwnedCourses