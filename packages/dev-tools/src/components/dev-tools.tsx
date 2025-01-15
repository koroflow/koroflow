"use client"

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Shield, X, RefreshCw, FileText, Cookie, ToggleLeft, GanttChartSquare, Code, Layout } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrivacyConsent } from '../hooks/use-privacy-consent'
import { cn } from '../libs/utils'
import { allConsentNames } from '@better-events/react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { ExpandableTabs } from './ui/expandable-tabs'

type TabSection = "Consents" | "Compliance" | "Scripts" | "Conditional";

const tabs = [
  { title: "Consents" as const, icon: ToggleLeft },
  { title: "Compliance" as const, icon: GanttChartSquare },
  { title: "Scripts" as const, icon: Code },
  { title: "Conditional" as const, icon: Layout },
] as const;

interface ContentItem {
  title: string
  status: string
  details?: string
}

type ConditionalRenderingState = {
  componentName: string
  consentType: allConsentNames
  isRendered: boolean
}

export function PrivacyDevToolWidget() {
  const { 
    consents,
    complianceSettings,
    clearAllData,
    setIsPrivacyDialogOpen,
    setShowPopup,
    getEffectiveConsents
  } = usePrivacyConsent()

  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<TabSection>("Consents")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Memoize conditional rendering state
  const conditionalRenderingState = useMemo(() => {
    const effectiveConsents = getEffectiveConsents()
    return [
      { componentName: 'MarketingContent', consentType: 'marketing', isRendered: effectiveConsents.marketing },
      { componentName: 'AnalyticsContent', consentType: 'measurement', isRendered: effectiveConsents.measurement },
      { componentName: 'PersonalizationComponent', consentType: 'ad_personalization', isRendered: effectiveConsents.ad_personalization },
    ]
  }, [getEffectiveConsents])

  const contentItems = useMemo<ContentItem[]>(() => {
    switch (activeSection) {
      case 'Consents':
        return Object.entries(consents || {}).map(([name, value]) => ({
          title: name,
          status: value ? 'Enabled' : 'Disabled'
        }))
      case 'Compliance':
        return Object.entries(complianceSettings || {}).map(([region, settings]) => ({
          title: region,
          status: settings.enabled ? 'Active' : 'Inactive'
        }))
      case 'Conditional':
        return conditionalRenderingState.map(item => ({
          title: item.componentName,
          status: item.isRendered ? 'Rendered' : 'Not Rendered',
          details: `Requires: ${item.consentType}`
        }))
      case 'Scripts':
        return [] // Handle scripts section if needed
      default:
        return []
    }
  }, [activeSection, consents, complianceSettings, conditionalRenderingState])

  const handleTabChange = useCallback((index: number | null) => {
    if (index !== null) {
      setActiveSection(tabs[index].title)
    }
  }, [])

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), [])

  const handleResetConsent = useCallback(() => {
    clearAllData()
    if (typeof window !== 'undefined') {
      window.alert("Local storage consent has been reset. Please refresh the page.")
    }
  }, [clearAllData])

  const handleOpenPrivacyModal = useCallback(() => {
    setIsPrivacyDialogOpen(true)
    setIsOpen(false)
  }, [setIsPrivacyDialogOpen])

  const handleOpenCookiePopup = useCallback(() => {
    setShowPopup(true)
    setIsOpen(false)
  }, [setShowPopup])

  const Content = useMemo(() => (
    <ScrollArea className="h-[300px]">
      <motion.div 
        className="space-y-2 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {contentItems.map((item, index) => (
          <motion.div
            key={`${activeSection}-${index}`}
            className="flex items-center justify-between p-3 rounded-lg border bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.title}</span>
              {item.details && (
                <span className="text-xs text-muted-foreground">{item.details}</span>
              )}
            </div>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              item.status === 'Enabled' || item.status === 'Active' || item.status === 'active' || item.status === 'Rendered'
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            )}>
              {item.status}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  ), [contentItems, activeSection])

  const DevToolContent = useMemo(() => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="fixed inset-0 bg-background/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleOpen}
          />
          <motion.div
            className="fixed bottom-4 right-4 z-[9999]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-[350px] shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Better Events Dev Tool</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={toggleOpen}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 border-b">
                <ExpandableTabs
                //@ts-expect-error
                  tabs={tabs}
                  activeColor="text-primary"
                  className="border-muted"
                  onChange={handleTabChange}
                />
              </div>
              {Content}
              <div className="p-4 border-t">
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={handleResetConsent}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Local Storage Consent
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleOpenPrivacyModal}>
                    <FileText className="h-4 w-4 mr-2" />
                    Open Privacy Settings
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleOpenCookiePopup}>
                    <Cookie className="h-4 w-4 mr-2" />
                    Open Cookie Popup
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ), [isOpen, toggleOpen, handleResetConsent, handleOpenPrivacyModal, handleOpenCookiePopup, Content, handleTabChange])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed bottom-4 right-4 z-[9999]"
          >
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full shadow-lg"
              onClick={toggleOpen}
            >
              <Shield className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {isMounted && createPortal(DevToolContent, document.body)}
    </>
  )
}