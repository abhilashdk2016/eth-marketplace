'use client';
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Button from '../common/Button';

const CourseCard = ({ course, showPurchase, handleClick, hasConnectedToWallet, owned }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="flex flex-col h-full">
            <div className="flex h-full">
                <Image 
                className={`object-cover ${hasConnectedToWallet && "filter grayscale"}`} 
                src={course.coverImage}
                width={0}
                height={0}
                style={{ width: '100%', height: 'auto' }}
                sizes="100vw"
                alt={course.title} />
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.type}</div>
                <Link href={`/courses/${course.slug}`}
                className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
                    {course.title}
                </Link>
                <p className="mt-2 text-gray-500 text-sm sm:text-base">{course.description.substring(0, 70)}...</p>
                {
                    owned && <div className="mt-4 flex">
                        <Button className='p-2' variant="green" disabled={true}>Owned</Button>
                        {
                            owned.state === "deactivated" && <div className='ml-2'>
                                <Button className='p-2' variant="purple" disabled={false} onClick={() => handleClick(course, false)}>Fund to Activate</Button>
                            </div>
                        }
                    </div>
                }
                {
                    !owned && showPurchase && <div className="mt-4">
                        <Button className='p-2' variant="lightPurple" onClick={() => handleClick(course)} disabled={hasConnectedToWallet}>Purchase</Button>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default CourseCard