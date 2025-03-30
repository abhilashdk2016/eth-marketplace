'use client';
import { useWeb3 } from "@/components/providers/web3";
import Link from "next/link";
import Button from "./Button";
import { useAccount } from "@/components/web3Hooks/useAccount";

export default function Navbar() {
    const { connect, isWeb3Loaded, isLoading } = useWeb3();
    const { account, isLoading: isAccountLoading } = useAccount();
    return (
        <section>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative" aria-label="Global">
                <div className="flex justify-between items-center">
                  <div>
                    <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</Link>
                    <Link href="/marketplace" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</Link>
                    <Link href="/blogs" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</Link>
                  </div>
                  <div>
                    <Link href="/wishlist" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlist</Link>
                    { isLoading ? <Button className="bg-indigo-600 text-white hover:bg-indigo-700" disabled={isLoading}>
                        Loading...
                      </Button> :
                      isWeb3Loaded ?  <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={connect}>
                      Connect Wallet
                    </Button> : <Button className="bg-orange-600 text-white hover:bg-orange-700" disabled={isLoading} onClick={() => {
                      window.open('https://metamask.io/download', "_blank");
                    }}>
                      Install Metamask
                    </Button>
                    }
                  </div>
                </div>
              </nav>
            </div>
          </section>
    )
}