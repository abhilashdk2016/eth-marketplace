import { GetAllCourses } from "@/actions/api";
import { useWeb3 } from "@/components/providers/web3";
import Hero from "@/components/ui/common/Hero";
import CourseList from "@/components/ui/course/CourseList";

export default async function Home() {
  const { data } = await GetAllCourses();
  return (
    <>
      <Hero />
      <CourseList courses={data} />
    </>
  )
}