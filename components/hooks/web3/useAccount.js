import { useHooks } from "@/components/providers/web3";

export const useAccount = () => {
    return useHooks(h => h.useAccount())();
}