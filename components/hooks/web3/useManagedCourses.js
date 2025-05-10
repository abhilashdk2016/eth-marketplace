'use client';
import { useHooks } from "@/components/providers/web3";

export const useManagedCourses = (...args) => {
    const res =  useHooks(h => h.useManagedCourses())(...args);
    return {
        managedCourses: {
            data: res
        }
    }
}