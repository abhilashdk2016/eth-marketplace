'use client';
import CourseList from "@/components/ui/course/CourseList";
import OrderModal from "@/components/ui/order/OrderModal";
import WalletBar from "@/components/ui/web3/WalletBar";
import { useState } from "react";

const MarketplaceComponent = ({ data }) => {
  const [ selectedCourse, setSelectedCourse ] = useState(null);
  const handleSelectedCourse = (course) => {
    setSelectedCourse(course)
  }

  return (
    <>
      <div className="py-4">
        <WalletBar />
      </div>
      <CourseList courses={data} showPurchase={true} onClick={handleSelectedCourse} />
      {selectedCourse && <OrderModal course={selectedCourse} onClose={() => handleSelectedCourse(null)} /> }
    </>
  )
}

export default MarketplaceComponent;