import React from "react"
import { Theme } from "@radix-ui/themes"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Theme>{children}</Theme>
}

export default Providers
