'use client';
import { useHooks } from "@/components/providers/web3";

export const useOwnedCourses = (...args) => {
    const res =  useHooks(h => h.useOwnedCourses())(...args);
    return {
        ownedCourses: {
            data: res
        }
    }
}