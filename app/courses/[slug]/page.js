import { GetAllCourses } from "@/actions/api";
import CoursesComponent from "./coursesComponent";

export default async function Course({ params}) {
    const { slug } = await params;
    const { data } = await GetAllCourses();
    const course = data.find((course) => course.slug === slug);
    if (!course) {
      return <div>Course not found</div>
    }
    return (
      <>
        <CoursesComponent course={course} />
      </>
    )
  }