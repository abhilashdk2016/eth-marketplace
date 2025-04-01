"use client";
import { handler as createUseAccount } from "./useAccount";
import { handler as createUseNetwork } from "./useNetwork";
export const setupHooks = (...dep) => {
  const hooks = {
    useAccount: () => {
        return createUseAccount(...dep);
    },
    useNetwork: () => {
        return createUseNetwork(...dep);
    },
  };
  return hooks;
}