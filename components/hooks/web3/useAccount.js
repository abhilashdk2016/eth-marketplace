import { useHooks, useWeb3 } from "@/components/providers/web3";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAccount = () => {
    return useHooks(h => h.useAccount())();
}

export const useAdmin = ({redirectTo}) => {
    const { account } = useAccount()
    const { requireInstall } = useWeb3()
    const router = useRouter()
  
    useEffect(() => {
      if ((
        requireInstall || !account.isAdmin) ||
        account.isEmpty) {
  
        router.push(redirectTo)
      }
    }, [account])
  
    return { account }
  }
  