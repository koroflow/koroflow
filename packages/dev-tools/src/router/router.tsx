"use client"

import { useState, useCallback, useEffect } from 'react'
import { Shield, X, RefreshCw, FileText, Cookie, ToggleLeft, GanttChartSquare, Code, Layout } from 'lucide-react'
import { motion } from 'framer-motion'

import { cn } from '../libs/utils'
import { Button } from '../components/ui/button'
import { ScrollArea } from '../components/ui/scroll-area'
import { ExpandableTabs } from '../components/ui/expandable-tabs'
import { PrivacyConsentState } from '@koroflow/core-js'
import { getStore } from '../dev-tool'


type TabSection = "Consents" | "Compliance" | "Scripts" | "Conditional";

const tabs = [
  { title: "Consents" as const, icon: ToggleLeft },
  { title: "Compliance" as const, icon: GanttChartSquare },
] as const;

interface ContentItem {
  title: string
  status: string
  details?: string
}

interface RouterProps {
  onClose: () => void
}

export function Router({  onClose }: RouterProps) {
  const privacyConsent = getStore() as PrivacyConsentState
  const { 
    clearAllData,
    setIsPrivacyDialogOpen,
    setShowPopup,
  } = privacyConsent

  const [activeSection, setActiveSection] = useState<TabSection>("Consents")

  // Handle tab change locally
  const handleTabChange = useCallback((index: number | null) => {
    if (index !== null) {
      setActiveSection(tabs[index].title)
    }
  }, [])

  // Compute rendering state without conditions
  const renderingState = [
    { componentName: 'MarketingContent', consentType: 'marketing' as const },
    { componentName: 'AnalyticsContent', consentType: 'measurement' as const },
    { componentName: 'PersonalizationComponent', consentType: 'ad_personalization' as const },
  ]

  // Compute content items based on active section
  const contentItems: ContentItem[] = activeSection === 'Consents'
    ? Object.entries(privacyConsent.consents).map(([name, value]) => ({
        title: name,
        status: value ? 'Enabled' : 'Disabled'
      }))
    : activeSection === 'Compliance'
    ? Object.entries(privacyConsent.complianceSettings).map(([region, settings]) => ({
        title: region,
        status: settings.enabled ? 'Active' : 'Inactive'
      }))
    : activeSection === 'Conditional'
    ? renderingState.map(item => ({
        title: item.componentName,
        status: 'Rendered',
        details: `Requires: ${item.consentType}`
      }))
    : []

  const handleResetConsent = useCallback(() => {
    clearAllData()
    onClose()
  }, [clearAllData, onClose])

  const handleOpenPrivacyModal = useCallback(() => {
    setIsPrivacyDialogOpen(true)
  }, [setIsPrivacyDialogOpen, onClose])

  const handleOpenCookiePopup = useCallback(() => {
    setShowPopup(true)
  }, [setShowPopup])

  return (
    <>
      <div className="p-4 border-b">
        <ExpandableTabs
          tabs={Array.from(tabs)}
          activeColor="text-primary"
          className="border-muted"
          onChange={handleTabChange}
        />
      </div>
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
    </>
  )

}