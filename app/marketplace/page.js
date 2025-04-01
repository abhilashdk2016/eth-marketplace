import { GetAllCourses } from "@/actions/api";
import MarketplaceComponent from "@/app/marketplace/marketplace_component";

export default async function Marketplace() {
  const { data } = await GetAllCourses();
  return (
    <>
      <MarketplaceComponent data={data} />
    </>
  )
}