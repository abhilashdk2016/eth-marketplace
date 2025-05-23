import { normalizeOwnedCourse } from "@/utils/normalize";
import useSWR from "swr"

export const handler  = (web3, contract) => account => {
    const swrResponse = useSWR(
        (web3 && contract && account.data && account.isAdmin) ? `web3/managedCourses/${account}` : null, async () => {
            const courses = [];
            const courseCount = await contract.methods.getCourseCount().call()
        
            for (let i = Number(courseCount) - 1; i >= 0; i--) {
                const courseHash = await contract.methods.getCourseHashAtIndex(i).call()
                const course = await contract.methods.getCourseByHash(courseHash).call()
                console.log(course)
                if (course) {
                    const normalized = normalizeOwnedCourse(web3)({ hash: courseHash }, course)
                    courses.push(normalized)
                }
            }

            return courses;
        }
);
    return swrResponse.data;
} 