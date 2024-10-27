"use client"

import * as React from "react"
import { Box } from "lucide-react"
import { useBitteWallet } from "@mintbase-js/react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function DashboardHeader() {
  const { state, isMobile } = useSidebar()
  const { isConnected, activeAccountId } = useBitteWallet()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="bg-secondary hover:bg-secondary/80"
        >
          <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
            <Box className="h-5 w-5 text-primary-foreground" />
          </div>
          {state === "expanded" && !isMobile && (
            <div className="flex flex-col overflow-hidden ml-2 min-w-0">
              <span className="text-sm font-semibold whitespace-nowrap overflow-x-auto scrollbar-hide text-primary dark:text-primary">
                {isConnected && activeAccountId ? activeAccountId : "Cubed"}
              </span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
