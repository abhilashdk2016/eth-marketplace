'use client';
import { useAccount } from '@/components/hooks/web3/useAccount';
import { useOwnedCourses } from '@/components/hooks/web3/useOwnedCourses';
import { useWeb3 } from '@/components/providers/web3';
import Button from '@/components/ui/common/Button';
import Message from '@/components/ui/common/Message';
import OwnedCourseCard from '@/components/ui/course/OwnedCourseCard';
import MarketHeader from '@/components/ui/marketplace/MarketHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const OwnedCoursesComponent = ({ courses }) => {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const router = useRouter();
  const { requireInstall } = useWeb3();
  return (
    <>
        <MarketHeader />
        <section className='grid grid-cols-1'>
            {
                ownedCourses.isLoading && <div className='text-center'>Loading...</div>
            }
            {
                ownedCourses.error && <div className='text-center'>Error: {ownedCourses.error}</div>
            }
            {
                ownedCourses?.data?.ownedCourses?.length === 0 && <div className='text-center'>
                    You don't own any courses <br />
                    <Link href="/marketplace" className='text-blue-500 hover:text-blue-700'>
                        Go to Marketplace
                    </Link>
                </div>
            }
            { requireInstall &&
                <div className="w-1/2">
                    <Message type="warning">
                        <div>Please install Metamask</div>
                    </Message>
                </div>
            }
            {
                ownedCourses?.data?.ownedCourses && ownedCourses.data.ownedCourses.map((course, index) => (
                    <OwnedCourseCard key={index} course={course}>
                        <Button className='p-2' onClick={() => router.push(`/courses/${course.slug}`)}>
                            Watch Course
                        </Button>
                    </OwnedCourseCard>
                ))
            }
            
        </section>
        
    </>
  )
}

export default OwnedCoursesComponent