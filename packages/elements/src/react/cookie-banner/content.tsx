"use client"

import { Slot } from "@radix-ui/react-slot"
import { AnimatePresence, motion } from "motion/react"
import { type HTMLAttributes, type ReactNode, forwardRef } from "react"
import { cn } from "../libs/utils"
import { useCookieBannerContext } from "./context"
import { createPortal } from "react-dom"
import React from "react"

// Content Component
export const CookieBannerContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    asChild?: boolean
  }
>(({ asChild, children, className, ...props }, ref) => {
  const { showPopup } = useCookieBannerContext()
  const Comp = asChild ? Slot : "div"

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return showPopup
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Comp ref={ref} className={cn("fixed z-50 max-w-md", className)} {...props}>
              {children}
            </Comp>
          </motion.div>
        </AnimatePresence>,
        document.body,
      )
    : null
})

CookieBannerContent.displayName = "CookieBannerContent"

