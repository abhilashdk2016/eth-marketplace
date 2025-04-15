'use client';
import { useHooks } from "@/components/providers/web3";
import { enhanceHook } from "@/utils/enhanceHook";

export const useNetwork = () => {
    return enhanceHook(useHooks(h => h.useNetwork())());
}