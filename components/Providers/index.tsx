"use client"

import React from "react"
import { wagmiConfig } from "@/config/wagmi"
import { WagmiConfig } from "wagmi"
import { SWRConfig } from 'swr'

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <WagmiConfig config={wagmiConfig}>
      <SWRConfig>
        {children}
      </SWRConfig>
    </WagmiConfig>
  );
}
