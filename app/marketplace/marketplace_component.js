'use client';
import CourseList from "@/components/ui/course/CourseList";
import OrderModal from "@/components/ui/order/OrderModal";
import { useAccount } from "@/components/hooks/web3/useAccount";
import { useNetwork } from "@/components/hooks/web3/useNetwork";
import { useState } from "react";
import MarketHeader from "@/components/ui/marketplace/MarketHeader";
import { useWeb3 } from "@/components/providers/web3";

const MarketplaceComponent = ({ courses }) => {
  const { web3, contract } = useWeb3();
  const { network } = useNetwork();
  const { account } = useAccount();
  const [ selectedCourse, setSelectedCourse ] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const handleSelectedCourse = (course, isNew) => {
    setSelectedCourse(course);
    if(isNew === false) {
      setIsNewPurchase(false);
    }
  }
  const handlePurchaseCourse = async (order) => {
    if(!order) {
      return;
    }
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    )

    const value = web3.utils.toWei(order.price.toString(), 'ether')

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email)
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      )

      _purchaseCourse(hexCourseId, proof, value)
    } else {
      _repurchaseCourse(orderHash, value)
    }
  }

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      const tx = await contract.methods.purchaseCourse(hexCourseId, proof).send({
        from: account.data,
        value
      });
      console.log("Transaction successful:", tx);
    }
    catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setSelectedCourse(null);
    }
  }

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      const result = await contract.methods.repurchaseCourse(
        courseHash
      ).send({from: account.data, value})
      console.log(result)
    } catch {
      console.error("Purchase course: Operation has failed.")
    }
  }

  const hasConnectedToWallet = !!(account.data && network.isSupported);

  return (
    <>
      <MarketHeader />
      <CourseList courses={courses} showPurchase={true} handleClick={handleSelectedCourse} hasConnectedToWallet={!hasConnectedToWallet} />
      {selectedCourse && <OrderModal 
        course={selectedCourse} 
        onClose={() => { 
          handleSelectedCourse(null); 
          setIsNewPurchase(true); 
        }} 
        onSubmit={handlePurchaseCourse}
        isNewPurchase={isNewPurchase}
      /> }
    </>
  )
}

export default MarketplaceComponent;