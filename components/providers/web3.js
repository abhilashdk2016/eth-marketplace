"use client";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";

const { createContext, useEffect, useState, useContext, useMemo } = require("react");

const Web3Context = createContext(null);

function Web3Provider({ children }) {
  const [web3Api, setweb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true
  })
  useEffect(() => {
    async function loadProvider() {
        const provider = await detectEthereumProvider();
        if (provider) {
          // We recommend using MetaMask's provider
          console.log("Ethereum successfully detected!");
          // Access the decentralized web!
          // await provider.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(provider);
          setweb3Api({
            provider,
            web3,
            contract: null,
            isLoading: false
          })
        } else {
            setweb3Api(api => ({
                ...api,
                isLoading: false
            }));
          console.error("Please install MetaMask!");
        }
    }

    loadProvider();
  }
  , []);

  const _web3Api = useMemo(() => {
    return {
        ...web3Api,
        isWeb3Loaded: web3Api.web3 !== null,
        getHooks: () => setupHooks(web3Api.web3),
        connect: web3Api.provider 
        ? 
            async () => {
                try {
                    await web3Api.provider.request({ method: 'eth_requestAccounts' });
                } catch (error) {
                    console.error("Error connecting to Metamask", error);
                    location.reload();
                }
            }
        :
            () => console.error("Cannot connect to Metamask, try to reload your browser")
    }
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}

export function useHooks(cb) {
    const { getHooks } = useWeb3();
    const hooks = getHooks();
    return cb(hooks);
}
export { Web3Provider, Web3Context };