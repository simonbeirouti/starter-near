"use client"

import { useBitteWallet } from "@mintbase-js/react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function NavUser() {
  const { isConnected, selector, connect } = useBitteWallet()
  const { state } = useSidebar()

  const handleSignout = async () => {
    const wallet = await selector.wallet()
    return wallet.signOut()
  }

  const handleSignIn = async () => {
    return connect()
  }

  const handleClick = () => {
    if (isConnected) {
      handleSignout()
    } else {
      handleSignIn()
    }
  }

  return (
    <Button onClick={handleClick} className="flex flex-1 items-center justify-center">
      {isConnected ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
      {state === "expanded" && (
        <span>{isConnected ? "Sign Out" : "Connect To NEAR"}</span>
      )}
    </Button>
  )
}
