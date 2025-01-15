"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Shield, X, RefreshCw, FileText, Cookie, Eye, ToggleLeft, GanttChartSquare, Code, Layout } from 'lucide-react'
import Draggable from 'react-draggable'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrivacyConsent } from '../hooks/use-privacy-consent'
import { cn } from '../libs/utils'
import { allConsentNames } from '@better-events/react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { ExpandableTabs } from './ui/expandable-tabs'

type ConditionalRenderingState = {
  componentName: string
  consentType: allConsentNames
  isRendered: boolean
}

const tabs = [
  { title: "Consents", icon: ToggleLeft },
  { title: "Compliance", icon: GanttChartSquare },
  { title: "Scripts", icon: Code },
  { title: "Conditional", icon: Layout },
]

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
  const [activeSection, setActiveSection] = useState<string>("Consents")
  const nodeRef = useRef(null)
  const [conditionalRenderingState, setConditionalRenderingState] = useState<ConditionalRenderingState[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const updateConditionalRendering = () => {
      const effectiveConsents = getEffectiveConsents()
      const newState: ConditionalRenderingState[] = [
        { componentName: 'MarketingContent', consentType: 'marketing', isRendered: effectiveConsents.marketing },
        { componentName: 'AnalyticsContent', consentType: 'measurement', isRendered: effectiveConsents.measurement },
        { componentName: 'PersonalizationComponent', consentType: 'ad_personalization', isRendered: effectiveConsents.ad_personalization },
      ]
      setConditionalRenderingState(newState)
    }

    updateConditionalRendering()
    const intervalId = setInterval(updateConditionalRendering, 1000)
    return () => clearInterval(intervalId)
  }, [getEffectiveConsents, isMounted])

  const renderContent = useCallback(() => {
    let items: any[] = []

    switch (activeSection) {
      case 'Consents':
        items = Object.entries(consents || {}).map(([name, value]) => ({
          title: name,
          status: value ? 'Enabled' : 'Disabled'
        }))
        break
      case 'Compliance':
        items = Object.entries(complianceSettings || {}).map(([region, settings]) => ({
          title: region,
          status: settings.enabled ? 'Active' : 'Inactive'
        }))
        break
      case 'Conditional':
        items = conditionalRenderingState.map(item => ({
          title: item.componentName,
          status: item.isRendered ? 'Rendered' : 'Not Rendered',
          details: `Requires: ${item.consentType}`
        }))
        break
    }

    return (
      <ScrollArea className="h-[300px]">
        <motion.div 
          className="space-y-2 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
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
    )
  }, [activeSection, consents, complianceSettings, conditionalRenderingState])

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

  const DevToolContent = () => (
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
          <Draggable
          //@ts-expect-error
          nodeRef={nodeRef} handle=".handle" bounds="body">
            <motion.div
              ref={nodeRef}
              className="fixed bottom-4 right-4 z-[9999]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="w-[350px] shadow-lg">
                <div className="flex items-center justify-between p-4 border-b handle cursor-move">
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
                    tabs={tabs}
                    activeColor="text-primary"
                    className="border-muted"
                    onChange={(index) => index !== null && setActiveSection(tabs[index].title)}
                  />
                </div>
                {renderContent()}
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
          </Draggable>
        </motion.div>
      )}
    </AnimatePresence>
  )

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
      {isMounted && createPortal(<DevToolContent />, document.body)}
    </>
  )
}