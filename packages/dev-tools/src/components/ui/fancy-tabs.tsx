"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { cn } from "../../libs/utils"

interface Tab {
  value: string
  icon: React.ReactNode
  label: string
}

interface FancyTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (value: string) => void
}

export function FancyTabs({ tabs, activeTab, onChange }: FancyTabsProps) {
  return (
    <div className="relative flex space-x-1 bg-muted p-1 rounded-md">
      {tabs.map((tab) => (
        <TooltipProvider key={tab.value}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onChange(tab.value)}
                className={cn(
                  "relative rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out outline-none",
                  activeTab === tab.value
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-background"
                    style={{ borderRadius: 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tab.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

