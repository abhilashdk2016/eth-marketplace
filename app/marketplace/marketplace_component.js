'use client';
import CourseList from "@/components/ui/course/CourseList";
import OrderModal from "@/components/ui/order/OrderModal";
import { useAccount } from "@/components/hooks/web3/useAccount";
import { useNetwork } from "@/components/hooks/web3/useNetwork";
import { useState } from "react";
import MarketHeader from "@/components/ui/marketplace/MarketHeader";
import { useWeb3 } from "@/components/providers/web3";

const MarketplaceComponent = ({ data }) => {
  const { web3, contract } = useWeb3();
  const { network } = useNetwork();
  const { account } = useAccount();
  const [ selectedCourse, setSelectedCourse ] = useState(null);
  const handleSelectedCourse = (course) => {
    setSelectedCourse(course)
  }
  const handlePurchaseCourse = async (order) => {
    if(!order) {
      return;
    }
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      { t: 'bytes16', v: hexCourseId },
      { t: 'address', v: account.data }
    );
    const emailHash = web3.utils.sha3(order.email);
    const proof = web3.utils.soliditySha3(
      { t: 'bytes32', v: emailHash },
      { t: 'bytes32', v: orderHash }
    );
    try {
      const tx = await contract.methods.purchaseCourse(hexCourseId, proof).send({
        from: account.data,
        value: web3.utils.toWei(order.price.toString(), 'ether')
      });
      console.log("Transaction successful:", tx);
    }
    catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setSelectedCourse(null);
    }
    
  }
  const canPurchaseCourse = !!(account.data && network.isSupported);

  return (
    <>
      <MarketHeader />
      <CourseList courses={data} showPurchase={true} onClick={handleSelectedCourse} canPurchaseCourse={!canPurchaseCourse} />
      {selectedCourse && <OrderModal course={selectedCourse} onClose={() => handleSelectedCourse(null)} onSubmit={handlePurchaseCourse} /> }
    </>
  )
}

export default MarketplaceComponent;