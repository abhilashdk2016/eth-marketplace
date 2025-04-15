"use client";
import { handler as createUseAccount } from "./useAccount";
import { handler as createUseNetwork } from "./useNetwork";
import { handler as createUseOwnedCourses } from "./useOwnedCourses";
import { handler as createUseOwnedCourse } from "./useOwnedCourse";
export const setupHooks = ({ web3, provider, contract }) => {
  const hooks = {
    useAccount: () => {
        return createUseAccount(web3, provider);
    },
    useNetwork: () => {
        return createUseNetwork(web3, provider);
    },
    useOwnedCourses: () => {
        return createUseOwnedCourses(web3, contract);
    },
    useOwnedCourse: () => {
      return createUseOwnedCourse(web3, contract);
    },
  };
  return hooks;
}