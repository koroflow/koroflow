"use client"

import * as React from "react"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown } from 'lucide-react'
import { usePrivacyConsent } from "@better-events/core-react"

interface PrivacyConsentWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  onSave?: () => void
}

const PrivacyConsentWidget = React.forwardRef<
  HTMLDivElement,
  PrivacyConsentWidgetProps
>(({ onSave, ...props }, ref) => {
  const { consents, setConsent, saveConsents, getDisplayedConsents,resetConsents } = usePrivacyConsent()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleAccordion = React.useCallback((value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }, [])

  const handleSaveConsents = React.useCallback(() => {
    saveConsents('custom')
    if (onSave) {
      onSave()
    }
  }, [saveConsents, onSave])

  const handleConsentChange = React.useCallback((name: string, checked: boolean) => {
    setConsent(name as any, checked)
  }, [setConsent])

  return (
    <div className="space-y-6" ref={ref} {...props}>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
        {getDisplayedConsents().map((consent) => (
          <AccordionItem value={consent.name} key={consent.name}>
            <div className="flex items-center justify-between py-4">
              <div className="flex-grow" onClick={() => toggleAccordion(consent.name)}>
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium capitalize">
                    {consent.name.replace('_', ' ')}
                  </span>
                  <ChevronDown 
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      openItems.includes(consent.name) ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>
             <Switch
                checked={consents[consent.name]}
                onCheckedChange={(checked) => handleConsentChange(consent.name, checked)}
                disabled={consent.disabled}
                className="ml-4"
              />
            </div>
            <AccordionContent>
              <p className="text-sm text-muted-foreground pb-4">
                {consent.description}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-between">
        <Button onClick={resetConsents} variant="outline">Reset</Button>
        <Button onClick={handleSaveConsents}>Save Preferences</Button>
      </div>
    </div>
  )
})

PrivacyConsentWidget.displayName = "PrivacyConsentWidget"

export default PrivacyConsentWidget

