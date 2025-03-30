'use client';
import React from 'react';
export const  handler = web3 => () => {
  const [account, setAccount] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAccount() {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
      setIsLoading(false);
    }

    fetchAccount();
  }, [web3]);

  return { account, isLoading };

}