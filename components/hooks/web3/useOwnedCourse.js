'use client';
import { useHooks } from "@/components/providers/web3";

export const useOwnedCourse = (...args) => {
    const res =  useHooks(h => h.useOwnedCourse())(...args);
    return {
        ownedCourse: {
            data: res
        }
    }
}