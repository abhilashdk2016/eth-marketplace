'use client';
import React from 'react'
import WalletBar from '../web3/WalletBar';
import EthRates from '../web3/ethRates';
import BreadCrumb from '../common/BreadCrumb';
import { useNetwork } from '@/components/hooks/web3/useNetwork';
import { useAccount } from '@/components/hooks/web3/useAccount';

const MarketHeader = () => {
  const { network } = useNetwork();
  const { account } = useAccount();
  return (
    <div className="py-4">
        <WalletBar network={network} account={account} />
        <EthRates  />
        <div className="flex justify-center lg:flex-row-reverse lg:justify-start">
          <BreadCrumb />
        </div>
      </div>
  )
}

export default MarketHeader