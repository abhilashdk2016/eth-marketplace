import { useEthPrice, COURSE_PRICE } from '@/components/hooks/useEthPrice';
import Image from 'next/image'
import React from 'react';
import Loader from '../common/Loader';


const EthRates = () => {
  const { eth } = useEthPrice();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mb-5 py-4 justify-items-center lg:justify-items-start">
        <div className="flex flex-1 items-stretch text-center mt-2">
          <div className="p-5 border drop-shadow rounded-md">
              <div className='flex items-center'>
                {
                  eth.data ?
                  <>
                    <Image width={35} height={35} src={"/small-eth.webp"} alt="ethereum logo" />
                    <span className="text-2xl font-bold">= {eth.data}$</span>
                  </>
                  : <Loader />
    }
              </div>
              <p className="text-xl text-gray-500">Current eth Price</p>
          </div>
        </div>
        <div className="flex flex-1 items-stretch text-center mt-2">
          <div className="p-5 border drop-shadow rounded-md">
              <div className='flex items-center'>
                <span className="text-2xl font-bold">{eth.perItem}</span>
                <Image width={35} height={35} src={"/small-eth.webp"} alt="ethereum logo" />
                <span className="text-2xl font-bold"> = {COURSE_PRICE}$</span>
              </div>
              <p className="text-xl text-gray-500">Price per course</p>
          </div>
        </div>
    </div>
  )
}

export default EthRates