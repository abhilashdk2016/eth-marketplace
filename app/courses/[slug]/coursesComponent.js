'use client';
import React from 'react';
import Modal from "@/components/ui/common/Modal"
import Curriculum from "@/components/ui/course/Curriculum"
import Hero from "@/components/ui/course/Hero"
import KeyPoints from "@/components/ui/course/KeyPoints"
import { useOwnedCourse } from '@/components/hooks/web3/useOwnedCourse';
import { useAccount } from '@/components/hooks/web3/useAccount';
import Message from '@/components/ui/common/Message';
import { useWeb3 } from '@/components/providers/web3';

const CoursesComponent = ({ course }) => {
    const { title, description, wsl } = course;
    const { account } = useAccount();
    const { ownedCourse } = useOwnedCourse(course, account.data);
    const { isLoading } = useWeb3();
    const courseState = ownedCourse.data?.state;
    const isLocked = !courseState || courseState === 'purchased' || courseState === 'deactivated';
    return (
      <>
        <div className="py-4">
          <Hero title={title} description={description} image={course.coverImage} hasOwner={!!ownedCourse.data} />
        </div>
        <KeyPoints points={wsl} />
        {
          courseState && (
            <div className="max-w-5xl mx-auto">
              {
                courseState === 'purchased' && (
                    <Message type='warning'>
                      Course is purchased and waiting for activation.
                    </Message>
                )
              }
              {
                courseState === 'activated' && (
                    <Message type='success'>
                      Course is active and enjoy the course.
                    </Message>
                )
              }
              {
                courseState === 'deactivated' && (
                    <Message type='danger'>
                      Course is purchased but deacativated. Please activate to proceed.
                    </Message>
                )
              }
            </div>
          )
        }
        
        <Curriculum locked={isLocked} courseState={courseState} isLoading={isLoading} />
        <Modal />
      </>
    )
}

export default CoursesComponent