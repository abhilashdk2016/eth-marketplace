"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const NETWORK = {
    1: "Ethereum Main Network",
    1337: "Ganache",
    11155111: "Sepolia",
    56: "Binance Smart Chain"
};
const targetNetwork = NETWORK[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID] || "Ethereum Main Network";

export const  handler = (web3, provider) => () => {
    const [chainId, setChainId] = useState(null);
    const swrResponse = useSWR(() => {
        () => web3 ? "web3/network": null,
        async () => {
            const chainId = await web3.eth.getChainId();
            console.log(chainId);
            setChainId(chainId);
            return chainId;
        }
    });

    useEffect(() => {
        async function getChainId() {
            const chainId = await web3.eth.getChainId();
            setChainId(NETWORK[chainId] ?? "Unknown");
        }

        web3 && getChainId();
    }, [web3]);

    useEffect(() => {
        const mutator = chainId => {
            //swrResponse.mutate(NETWORK[parseInt(chainId, 16)] ?? "Unknown");
            window.location.reload();
            setChainId(NETWORK[parseInt(chainId, 16)] ?? "Unknown");
        }
        provider?.on("chainChanged", mutator);

        return () => {
            provider?.removeListener("chainChanged", mutator);
        }
    }, [provider]);
    return {
        network: {
            data: chainId,
            targetNetwork,
            isSupported: chainId === targetNetwork,
        }
    }
}