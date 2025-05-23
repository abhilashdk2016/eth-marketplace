'use client';
import React from 'react';
import { useWeb3 } from "@/components/providers/web3";
import Button from '../common/Button';

const WalletBar = ({ network, account }) => {
  const { isWeb3Loaded, requireInstall } = useWeb3();
  return (
    <section className="text-white bg-indigo-600 rounded-lg">
        <div className="p-8">
          <h1 className="text-base xs:text-xl break-words">Hello, {account.data}</h1>
          <h2 className="subtitle mb-5 text-sm xs:text-xl">I hope you are having a great day!</h2>
          <div className="flex justify-between items-center">
            <div className="sm:flex sm:justify-center lg:justify-start">
              <Button className='mr-2 text-sm xs:text-lg p-2' variant='white'>
                Learn how to purchase
              </Button>
            </div>
            <div>
              { isWeb3Loaded && !network.isSupported && <div className='bg-red-400 p-4 rounded-lg'>
                  <div >
                    Connected to wrong network
                  </div>
                  <div>
                    Connect to: {` `}
                    {network.targetNetwork}
                  </div>
                </div>
              }
              {
                requireInstall && <div className='bg-yellow-500 p-4 rounded-lg text-black'>Please install Metamask</div>
              }
              {
                network.data && <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network?.data?.toString()}</strong></div>
              }
            </div>
          </div>
        </div>
    </section>
  )
}

export default WalletBar