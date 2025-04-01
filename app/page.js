import { GetAllCourses } from "@/actions/api";
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