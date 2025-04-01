'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
const adminAddresses = {
  "0xe42497faae35f4f0333de3196899d91222465da98313a8139961a5c9a331f2a6": true,
}
export const  handler = web3 => () => {
  const { data, mutate, ...swrResponse } = useSWR( () => 
    web3 ? "web3/account" : null, 
  async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  });

  useEffect(() => {
    window.ethereum && window.ethereum.on('accountsChanged', (accounts) => {
      mutate(accounts[0] ?? null);
    });
  }
  , []);

  return { 
    account: {
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate, 
      ...swrResponse
    } 
  };

}