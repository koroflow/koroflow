"use client"

import * as React from "react"
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PrivacyConsentWidget from "./privacy-consent-widget"
import { usePrivacyConsent } from "@better-events/react"
import { Overlay } from "./overlay"
import { Button } from "./button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card"


interface PrivacySettingsModalProps {
  children?: React.ReactNode
  triggerClassName?: string
  showCloseButton?: boolean
}

const PrivacySettingsModal = React.forwardRef<
  HTMLDivElement,
  PrivacySettingsModalProps
>(({ children, triggerClassName, showCloseButton = false }, ref) => {
  const { isPrivacyDialogOpen, setIsPrivacyDialogOpen, setShowPopup, saveConsents } = usePrivacyConsent()

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setIsPrivacyDialogOpen(newOpen)
    if (newOpen) {
      setShowPopup(false) // Close the cookie popup when opening the privacy popup
    }
  }, [setIsPrivacyDialogOpen, setShowPopup])

  const handleSave = React.useCallback(() => {
    saveConsents('custom')
    setIsPrivacyDialogOpen(false)
  }, [setIsPrivacyDialogOpen, saveConsents])

  const handleClose = React.useCallback(() => {
    setIsPrivacyDialogOpen(false)
  }, [setIsPrivacyDialogOpen])

  const popupContent = createPortal(
    <AnimatePresence>
      {isPrivacyDialogOpen && (
        <>
          <Overlay show={isPrivacyDialogOpen} />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-settings-title"
          >
            <motion.div
              className="z-50 w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              ref={ref}
            >
              <Card>
                <CardHeader className="relative">
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={handleClose}
                      aria-label="Close privacy settings"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <CardTitle id="privacy-settings-title">Privacy Settings</CardTitle>
                  <CardDescription>
                    Customize your privacy settings here. You can choose which types of cookies and tracking technologies you allow.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PrivacyConsentWidget onSave={handleSave} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )

  return (
    <>
      <div onClick={() => handleOpenChange(true)}>
        {children || (
          <Button
            variant="outline"
            size="sm"
            className={triggerClassName}
          >
            Customise Consent
          </Button>
        )}
      </div>
      {popupContent}
    </>
  )
})

PrivacySettingsModal.displayName = "PrivacySettingsModal"

export default PrivacySettingsModal

