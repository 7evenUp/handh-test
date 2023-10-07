import React from "react"
import { Theme } from "@radix-ui/themes"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      accentColor="amber"
      scaling="100%"
      radius="medium"
    >
      {children}
    </Theme>
  )
}

export default Providers
