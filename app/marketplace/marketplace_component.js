'use client';
import CourseList from "@/components/ui/course/CourseList";
import WalletBar from "@/components/ui/web3/WalletBar";

const MarketplaceComponent = ({ data }) => {
  
  return (
    <>
      <div className="py-4">
        <WalletBar />
      </div>
      <CourseList courses={data} />
    </>
  )
}

export default MarketplaceComponent;