'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
const adminAddresses = {
  "0xbb6c0df769b4b852c2d414b51e0bbdfce2e480a3a1aed813bff2d922b0d8a92a": true,
}
export const  handler = (web3, provider) => () => {
  const { data, mutate, ...swrResponse } = useSWR( () => 
    web3 ? "web3/account" : null, 
  async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  });

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null);
    provider?.on('accountsChanged', mutator);
    return () => {
      provider?.removeListener('accountsChanged', mutator);
    }
  }
  , [provider]);

  return { 
    account: {
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate, 
      ...swrResponse
    } 
  };

}