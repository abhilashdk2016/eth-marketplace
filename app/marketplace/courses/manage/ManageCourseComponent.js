'use client';
import { useAdmin } from '@/components/hooks/web3/useAccount';
import { useManagedCourses } from '@/components/hooks/web3/useManagedCourses';
import { useWeb3 } from '@/components/providers/web3';
import Button from '@/components/ui/common/Button';
import Message from '@/components/ui/common/Message';
import CourseFilter from '@/components/ui/course/Filter'
import ManagedCourseCard from '@/components/ui/course/ManagedCourseCard';
import MarketHeader from '@/components/ui/marketplace/MarketHeader'
import { normalizeOwnedCourse } from '@/utils/normalize';
import React, { useState } from 'react';

const VerificationInput = ({onVerify}) => {
  const [ email, setEmail ] = useState("")

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({target: {value}}) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md mr-2"
        placeholder="0x2341ab..." />
        <Button className='px-2 py-2'
          onClick={() => {
            onVerify(email)
          }}
        >
          Verify
        </Button>
    </div>
  )
}

const ManageCourseComponent = () => {
  const [ searchedCourse, setSearchedCourse ] = useState(null)
  const [ filters, setFilters ] = useState({state: "all"});
  const [ proofedOwnership, setProofedOwnership ] = useState({})
  const { web3, contract } = useWeb3()
  const { account } = useAdmin({redirectTo: "/marketplace"});
  const { managedCourses } = useManagedCourses(account);
  const verifyCourse = (email, {hash, proof}) => {
    if(!email) return;
    const emailHash = web3.utils.sha3(email)
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    )

    proofToCheck === proof ?
      setProofedOwnership({
        ...proofedOwnership,
        [hash]: true
      }) :
      setProofedOwnership({
        ...proofedOwnership,
        [hash]: false
      })
  }

  const changeCourseState = async (courseHash, method) => {
    try {
      await contract.methods
        .activateCourse(courseHash)
      await contract.methods[method](courseHash)
        .send({
          from: account.data
        })
    } catch(e) {
      console.error(e.message)
    }
  }

  const activateCourse = async courseHash => {
    changeCourseState(courseHash, "activateCourse")
  }

  const deactivateCourse = async courseHash => {
    changeCourseState(courseHash, "deactivateCourse")
  }

  const searchCourse = async hash => {
    const re = /[0-9A-Fa-f]{6}/g;

    if(hash && hash.length === 66 && re.test(hash)) {
      const course = await contract.methods.getCourseByHash(hash).call()

      if (course.owner !== "0x0000000000000000000000000000000000000000") {
        const normalized = normalizeOwnedCourse(web3)({hash}, course)
        setSearchedCourse(normalized)
        return
      }
    }

    setSearchedCourse(null)
  }


  const renderCourse = (course, isSearched = false) => { 
    return <ManagedCourseCard key={course.ownedCourseId} course={course} index={course.ownedCourseId} isSearched={isSearched}>
            <VerificationInput
              onVerify={email => {
                verifyCourse(email, {
                  hash: course.hash,
                  proof: course.proof
                })
              }}
            />
            { proofedOwnership[course.hash] &&
              <div className="mt-2">
                <Message>
                  Verified!
                </Message>
              </div>
            }
            { proofedOwnership[course.hash] === false &&
              <div className="mt-2">
                <Message type="danger">
                  Wrong Proof!
                </Message>
              </div>
            }
            { course.state === "purchased" &&
              <div className="mt-2">
                <Button className='px-2 py-1'
                  onClick={() => activateCourse(course.hash)}
                  variant="green">
                  Activate
                </Button>
                <Button className='px-2 py-1' variant="red" onClick={() => deactivateCourse(course.hash)}>
                  Deactivate
                </Button>
              </div>
            }
      </ManagedCourseCard>
    }

  const filteredCourses = managedCourses.data
  ?.filter((course) => {
    if (filters.state === "all") {
      return true
    }

    return course.state === filters.state
  })
  .map(course => renderCourse(course))

  if (!account.isAdmin) {
    return null
  }
  return (
    <>
        <MarketHeader />
        <CourseFilter 
          onFilterSelect={(value) => setFilters({state: value})}
          onSearchSubmit={searchCourse}
        />
        <section className='grid grid-cols-1'>
          { searchedCourse &&
            <div>
              <h1 className="text-2xl font-bold p-5">Search</h1>
              { renderCourse(searchedCourse, true) }
            </div>
          }
          <h1 className="text-2xl font-bold p-5">All Courses</h1>
          { filteredCourses }
          { filteredCourses?.length === 0 &&
            <Message type="warning">
              No courses to display
            </Message>
          }
        </section>

    </>
  )
}

export default ManageCourseComponent;