'use client';
import { useHooks } from "@/components/providers/web3";

export const useNetwork = () => {
    return useHooks(h => h.useNetwork())();
}