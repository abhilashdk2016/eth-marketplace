import { handler as createUseAccount } from "./useAccount";

export const setupHooks = (web3) => {
  const hooks = {
    useAccount: () => {
        return createUseAccount(web3);
    },
  };
  return hooks;
}