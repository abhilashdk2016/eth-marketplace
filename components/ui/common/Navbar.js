'use client';
import { useWeb3 } from "@/components/providers/web3";
import Link from "next/link";
import Button from "./Button";
import { useAccount } from "@/components/hooks/web3/useAccount";
import ActiveLink from "./ActiveLink";

export default function Navbar() {
    const { connect, requireInstall, isLoading } = useWeb3();
    const { account } = useAccount();
    return (
        <section>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative" aria-label="Global">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <ActiveLink href="/" classname="font-medium mr-8 text-gray-500 hover:text-gray-900" label="Home" />
                    <ActiveLink href="/marketplace" classname="font-medium mr-8 text-gray-500 hover:text-gray-900" label="Marketplace" />
                    <ActiveLink href="/blogs" classname="font-medium mr-8 text-gray-500 hover:text-gray-900" label="Blogs" />
                  </div>
                  <div className="flex justify-between items-center text-center">
                    <ActiveLink href="/wishlist" classname="font-medium sm:mr-8 mr-2 text-gray-500 hover:text-gray-900" label="Wishlist" />
                    { isLoading ? <Button className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={isLoading}>
                        Loading...
                      </Button> :
                      account.data ?  <Button className="bg-indigo-600 text-white hover:bg-indigo-700 p-2" onClick={connect}>
                      {account.data.slice(0, 5) + '...' + account.data.slice(-4)}
                    </Button> :
                    requireInstall ? <Button className="bg-orange-600 text-white hover:bg-orange-700 p-2" disabled={isLoading} onClick={() => {
                      window.open('https://metamask.io/download', "_blank");
                    }}>
                      Install Metamask
                    </Button> : <Button className="bg-indigo-600 text-white hover:bg-indigo-700 p-2" onClick={connect}>
                      Connect Wallet
                    </Button>
                    }
                  </div>
                </div>
              </nav>
            </div>
          </section>
    )
}