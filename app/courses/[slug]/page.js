import { GetAllCourses } from "@/actions/api";
import Modal from "@/components/ui/common/Modal"
import Curriculum from "@/components/ui/course/Curriculum"
import Hero from "@/components/ui/course/Hero"
import KeyPoints from "@/components/ui/course/KeyPoints"

export default async function Course({ params}) {
    const { slug } = await params;
    const { data } = await GetAllCourses();
    const course = data.find((course) => course.slug === slug);
    if (!course) {
      return <div>Course not found</div>
    }
    const { title, description, wsl } = course;
    return (
      <>
        <div className="py-4">
          <Hero title={title} description={description} image={course.coverImage} />
        </div>
        <KeyPoints points={wsl} />
        <Curriculum locked={true} />
        <Modal />
      </>
    )
  }